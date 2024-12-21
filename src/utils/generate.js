export function generateTag(email) {
    const emailPrefix = email.split("@")[0];
    const domainFirstLetter = email.split("@")[1][0];
    const tag = `${emailPrefix}${domainFirstLetter}`;
    return tag;
}

export function generatePostId() {
    return crypto.randomUUID();
}

export function generateAvatarFallback(name) {
    const nameArray = name.trim().split(" ");
    if (nameArray.length > 1) {
        return nameArray[0][0] + nameArray[1][0];
    } else {
        return nameArray[0][0]+nameArray[0][1];
    }
}

export function generateTimeAgo(epochTime) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - epochTime;
  
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (seconds < 60) {
      return `${seconds} second${days > 1 ? 's' : ''} ago`;
    } else if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (days < 7) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (weeks < 4) {
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (months < 12) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  }