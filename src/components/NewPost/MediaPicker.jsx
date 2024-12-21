import React, { useState } from "react";
import { isMobile } from "../../lib/utils";


const NewMediaPicker = ({setPostMedia,setMediaType}) => {

  const handleFileChange =async (e, type, maxFiles) => {
    const files = Array.from(e.target.files);
    if (type === "image" && files.length > maxFiles ) {
      alert(`You can post a maximum of 4 photos or 1 video.`);
      return;
    }
    //video length should be under 60 seconds
    if (type == "video" && files[0].size > 50000000) {  
      alert(`video should be under 50MB`);
      return;
    }
    setMediaType(type);
    setPostMedia(files);
  };



  return (
    <div className="flex flex-col space-y-4 py-4 font-semibold text-sm *:cursor-pointer w-2/3">
      {/* Hidden Input for Photo */}
      <input
        type="file"
        id="photo-input"
        accept="image/*"
        multiple
        max={4}
        className="hidden"
        onChange={(e) => handleFileChange(e, "image", 4)}
      />
      {isMobile && <label
        htmlFor="photo-input"
        className="flex items-center space-x-2"
      >
        <img src="./photo.svg" alt="Camera" className="w-7 h-7" />
        <div className="">Photos</div>
      </label>}

      {/* Hidden Input for Video */}
      <input
        type="file"
        id="video-input"
        accept="video/*"
        className="hidden"
        onChange={(e) => handleFileChange(e, "video", 1)}
      />
      <label
        htmlFor="video-input"
        className="flex items-center space-x-2"
      >
        <img src="./video.svg" alt="Video" className="w-7 h-7" />
        <div className="">Video</div>
      </label>

      {/* Hidden Input for Camera */}
      <input
        type="file"
        id="camera-input"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFileChange(e, "image", 1)}
      />
      {isMobile && <label
        htmlFor="camera-input"
        className="flex items-center space-x-2 pl-0.5"
      >
        <img src="./camera.svg" alt="Camera" className="w-6 h-6" />
        <div className="">Camera</div>
      </label>}

      {/* Hidden Input for Choose File */}
      <input
        type="file"
        id="file-input"
        accept="image/*"
        multiple
        max={4}
        className="hidden"
        onChange={(e) => handleFileChange(e, "image", 4)}
      />
      {!isMobile && <label
        htmlFor="file-input"
        className="flex items-center space-x-2 pl-0.5"
      >
        <img src="./folder.svg" alt="file" className="w-6 h-6" />
        <div className="">Choose the image file</div>
      </label>}

      {/* Debug Output */}
     
    </div>
  );
};

export default NewMediaPicker;
