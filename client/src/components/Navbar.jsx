import React from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const { credit, loadCreditsData } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData();
    }
  }, [isSignedIn, loadCreditsData]);

  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-20">
      <Link to="/">
        <img className="w-32 sm:w-44" src={assets.logo} alt="logo" />
      </Link>

      {isSignedIn ? (
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/buy")}
            className="flex items-center gap-2 bg-blue-100 px-3 sm:px-4 py-1 rounded-full"
          >
            <img className="w-8 h-8" src={assets.credit_icon} alt="credits" />
            <p>Credits : {credit}</p>
          </button>
          {/* <p className="text-gray-600 max-sm:hidden">Hi,{user.fullName}</p> */}

          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => openSignIn({})}
          className="bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full"
        >
          Get Started
          <img className="w-3 sm:w-5" src={assets.arrow_icon} alt="arrow" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
