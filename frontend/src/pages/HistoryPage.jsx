import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatCreateDate } from "../utils/dateFunction";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

const HistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get("/api/v1/search/history");
        setSearchHistory(res.data.content);
      } catch (error) {
        console.log(error.message);
        setSearchHistory([]);
      }
    };
    getSearchHistory();
  }, []);

  const handleDelete = async (history) => {
    try {
      await axios.delete(`/api/v1/search/history/${history.id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== history.id));
    } catch (error) {
      toast.error("Failed to delete search history");
    }
  };

  if (searchHistory.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <NavBar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <NavBar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory.map((history) => (
            <div
              key={history.id}
              className="bg-gray-800 p-4 rounded flex items-start"
            >
              <img
                src={SMALL_IMG_BASE_URL + history.image}
                alt="History image"
                className="size-16 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                <span className="text-white text-lg">{history.title}</span>
                <span className="text-gray-400 text-sm">
                  {formatCreateDate(history.createdAt)}
                </span>
              </div>
              <span
                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                  history.searchType === "movie"
                    ? "bg-red-600"
                    : history.searchType === "tv"
                    ? "bg-blue-600"
                    : "bg-green-600"
                }`}
              >
                {history.searchType[0].toUpperCase() +
                  history.searchType.slice(1)}
              </span>
              <Trash
                className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
                onClick={() => {
                  handleDelete(history);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
