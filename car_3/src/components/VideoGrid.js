import React, { useState } from "react";
import { toast } from "react-toastify";
import "./../index.css";

export default function VideoGrid({ videos, onDeleteVideo }) {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 10;

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const playVideo = (videoUrl) => {
    window.open(videoUrl, "_blank");
  };

  const deleteVideo = (videoId) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      onDeleteVideo(videoId);
    }
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 truncate">
                {video.title}
              </h3>
              <div className="flex justify-between">
                <button
                  onClick={() => playVideo(video.url)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Play
                </button>
                <button
                  onClick={() => deleteVideo(video.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {videos.length > videosPerPage && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-l hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(videos.length / videosPerPage))
              )
            }
            disabled={currentPage === Math.ceil(videos.length / videosPerPage)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-r hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
