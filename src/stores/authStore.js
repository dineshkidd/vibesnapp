import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth } from "../services/firebase";
import { db } from "../services/firestore";
import { generateTag } from "../utils";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  verified: false,

  // Watch for auth state changes
  initAuth: () => {
    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
  },

  // Login with email and password
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Check if email is verified
      if (!user.emailVerified) {
        await signOut(auth); // Log out the user immediately
        // alert("Your email is not verified. Check your email for a verification link.");
        throw new Error(
          "Your email is not verified. Check your email for a verification link."
        );
      }

      // If verified, set the user in state
      set({ user });
    } catch (error) {
      console.error("Login Error:", error.message);
      throw new Error(error.message); // Pass the error back to the UI
    }
  },

  // Google login
  googleLogin: async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      // Get user info from Google
      const user = result.user;
      const email = user.email;
      const tag = generateTag(email);
      const userDocRef = doc(db, "users", tag);

      // Check if the user document already exists
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {

      // Extract the data
      const name = user.displayName || "Anonymous";
      
      const pp = user.photoURL;

      // Generate a custom user ID (e.g., Instagram-style)
      

      // Store the user in Firestore
      await setDoc(doc(db, "users", tag), {
        name,
        email,
        pp,
        banner: null,
        bio: null,
        userId: user.uid,
        tag: tag,
      });
    }
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  },

  register: async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      const tag = generateTag(email);

      // Add user to Firestore
      await setDoc(doc(db, "users", tag), {
        name,
        email,
        pp: null,
        banner: null,
        bio: null,
        userId: user.uid,
        tag: tag,
      });

      // Log the user out
      await signOut(auth);

      // Return success message
      return "Registration successful! Check your email to verify your account.";
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Logout
  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null });
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  },

  resetPassword: async (email) => {
    try {
      if (!email) throw new Error("Email is required.");
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent successfully.");
      return "Password reset email sent successfully.";
    } catch (error) {
      console.error("Reset Password Error:", error.message);
      throw new Error("Failed to send password reset email.");
    }
  },
}));
