import "./../index.css";

import React, { useState, useEffect } from "react";
import Header from "./Header";
import VideoUpload from "./VideoUpload";
import VideoGrid from "./VideoGrid";
import SearchFilter from "./SearchFilter";
import Settings from "./Settings";
import ErrorPage from "./ErrorPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
  });
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUploadSuccess = (newVideo) => {
    setVideos((prevVideos) => [newVideo, ...prevVideos]);
  };

  const handleDeleteVideo = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.filter((video) => video.id !== videoId)
    );
    toast.success("Video deleted successfully");
  };

  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);
    toast.success("Profile updated successfully");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error) return <ErrorPage message={error} />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        {activeTab === "dashboard" && (
          <>
            <SearchFilter videos={videos} setVideos={setVideos} />
            <VideoGrid videos={videos} onDeleteVideo={handleDeleteVideo} />
          </>
        )}
        {activeTab === "upload" && (
          <VideoUpload onUploadSuccess={handleUploadSuccess} />
        )}
        {activeTab === "settings" && (
          <Settings user={user} onUpdateSuccess={handleUpdateProfile} />
        )}
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
