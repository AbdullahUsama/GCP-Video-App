import "./../index.css";

import { useState } from "react";

const SearchFilter = ({ videos, setVideos }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredVideos = videos.filter((video) =>
      video.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setVideos(filteredVideos);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    const sortedVideos = [...videos].sort((a, b) => {
      return e.target.value === "date"
        ? new Date(b.uploadDate) - new Date(a.uploadDate)
        : b.size - a.size;
    });
    setVideos(sortedVideos);
  };

  return (
    <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
      <input
        type="text"
        placeholder="Search videos..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full sm:w-64 px-4 py-2 border rounded-md mb-4 sm:mb-0"
      />
      <select
        value={sortBy}
        onChange={handleSort}
        className="w-full sm:w-auto px-4 py-2 border rounded-md"
      >
        <option value="date">Sort by Date</option>
        <option value="size">Sort by Size</option>
      </select>
    </div>
  );
};

export default SearchFilter;
