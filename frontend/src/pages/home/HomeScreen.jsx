import React from "react";
import NavBar from "../../components/NavBar";

const HomeScreen = () => {
  return (
    <div className="relative h-screen text-white bg-black">
      <NavBar />
      <img
        src="/extraction.jpg"
        alt="Hero img"
        className="absolute top-0 left-0 h-full object-cover -z-50"
      />
      <div className="absolute top-0 left-0 h-full bg-black/50 -z-50" />
    </div>
  );
};

export default HomeScreen;
