import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "./../index.css";

export default function VideoUpload({ onUploadSuccess }) {
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      uploadFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [".mp4"],
      "video/quicktime": [".mov"],
      "video/x-msvideo": [".avi"],
    },
  });

  const uploadFile = (file) => {
    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentCompleted = Math.round((event.loaded * 100) / event.total);
        setUploadProgress(percentCompleted);
      }
    };
    reader.onload = () => {
      // Simulate upload delay
      setTimeout(() => {
        setUploadProgress(100);
        toast.success("Video uploaded successfully");
        onUploadSuccess({
          id: Date.now(),
          title: file.name,
          url: URL.createObjectURL(file),
          thumbnail: "/placeholder.svg?height=150&width=250",
          size: file.size,
          uploadDate: new Date().toISOString(),
        });
        setUploadProgress(0);
      }, 1500);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="mt-8">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-50" : ""
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-lg text-blue-500">Drop the video here...</p>
        ) : (
          <p className="text-lg text-gray-500">
            Drag and drop a video here, or click to select a file
          </p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          Supported formats: .mp4, .mov, .avi
        </p>
      </div>
      {uploadProgress > 0 && (
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-500 text-center">
            {uploadProgress}% uploaded
          </p>
        </div>
      )}
    </div>
  );
}
