import React from "react";
import { Link } from "react-router-dom";

const AuthScreen = () => {
  return (
    <div className="hero-bg relative">
      {/* NavBar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img
          src="/netflix-logo.png"
          alt="Netflix Logo"
          className="w-32 md:w-52"
        />
        <Link to={"/login"} className="text-white bg-red-600 py-1 px-2 rounded">
          Sign In
        </Link>
      </header>
    </div>
  );
};

export default AuthScreen;
