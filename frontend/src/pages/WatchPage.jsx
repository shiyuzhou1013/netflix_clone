import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import NavBar from "../components/NavBar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";

function formatReleaseDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [similarContent, setSimilarContent] = useState([]);
  const [details, setDetails] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const { contentType } = useContentStore();
  const sliderRef = useRef(null);

  useEffect(() => {
    const getTrailers = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
      try {
        setTrailers(res.data.trailers || []);
      } catch (error) {
        if (error.message.includes("404")) {
          console.log("No trailers found");
          setTrailers([]);
        }
      }
    };

    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilars = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${id}/similars`);
      try {
        setSimilarContent(res.data.similars || []);
      } catch (error) {
        if (error.message.includes("404")) {
          console.log("No trailers found");
          setSimilarContent([]);
        }
      }
    };

    getSimilars();
  }, [contentType, id]);

  useEffect(() => {
    const getDetails = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
      try {
        setDetails(res.data.content || []);
      } catch (error) {
        if (error.message.includes("404")) {
          console.log("No trailers found");
          setDetails([]);
        }
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [contentType, id]);

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };

  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <NavBar />

        {trailers?.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`bg-gray-500/70 hover: bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === 0 ? "cursor-not-allowed opacity-50" : ""
              } `}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`bg-gray-500/70 hover: bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === trailers.length - 1
                  ? "cursor-not-allowed opacity-50"
                  : ""
              } `}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers?.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mz-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          )}

          {trailers?.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No trailers found for{" "}
              <span className="font-bold text-red-600">
                {details?.title || details?.name}
              </span>
            </h2>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {details?.title || details?.name}
            </h2>
            <p className="text-lg mt-2">
              {formatReleaseDate(
                details?.release_date || details?.first_air_date
              )}{" "}
              |{" "}
              {details?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}
            </p>
            <p className="mt-4 text-lg">{details?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + details.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>

        {similarContent?.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">Similar Movies/TV Shows</h3>
            <div
              className="flex overflow-x-hidden scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((content) => (
                <Link
                  key={content.id}
                  to={`/watch/${content.id}`}
                  className="w-52 flex-none"
                >
                  <img
                    src={SMALL_IMG_BASE_URL + content.poster_path}
                    alt="Poster path"
                    className="w-full h-auto rounded-md"
                  />
                  <h4 className="mt-2 text-lg font-semibold">
                    {content.title || content.name}
                  </h4>
                </Link>
              ))}
              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover: opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                onClick={scrollRight}
              />
              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover: opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                onClick={scrollLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
