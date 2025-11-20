import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/mega-creator.svg";
import { Button } from "./ui/button";
import {
  BriefcaseBusiness,
  Folder,
  Globe,
  Heart,
  LogOut,
  PenBox,
  User,
  X,
} from "lucide-react";
import FormBox from "./FormBox";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { removeUser } from "@/utils/userSlice";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const user = useSelector((store) => store.user);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/auth/logout",
        {},
        { withCredentials: true },
      );

      dispatch(removeUser());
      navigate("/");

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenMenu(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  return (
    <>
      <nav className="flex justify-between px-2 sm:px-6 lg:px-10 py-4 items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-32 rounded-lg" />
        </Link>

        <div className="flex items-center gap-4">
          {/* If user is recruiter */}
          {/* Replace this condition later with your Node.js backend auth logic */}
          {/* <Button variant="destructive" className="rounded-full">
            <PenBox size={20} className="mr-2" />
            Post a Job
          </Button> */}

          {/* Example static dropdown or profile button (you can replace this later) */}
          {location.pathname !== "/onboarding" && user && (
            <div className="relative">
              {/* Profile Circle */}
              <div
                className="w-12 h-12 cursor-pointer border rounded-full flex justify-center items-center text-xl 
               border-blue-500 bg-blue-900 hover:bg-blue-800 transition-all"
                onClick={() => setOpenMenu(!openMenu)}
              >
                <span>{user.firstName[0] + user.lastName[0]}</span>
              </div>

              {/* Dropdown Menu */}
              {openMenu && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-3 z-50 w-56 
                    backdrop-blur-xl bg-[#0F172A]/70
                    border border-white/10 shadow-2xl 
                    rounded-2xl overflow-hidden animate-fade"
                >
                  {/* Header */}
                  <div className="px-5 py-4 border-b border-white/10">
                    <h4 className="text-sm font-semibold text-white/80">
                      Account
                    </h4>
                  </div>

                  {/* Options */}
                  <div className="flex flex-col py-2">
                    <Link
                      onClick={() => setOpenMenu(false)}
                      to="/my-jobs"
                      className="flex items-center gap-3 px-5 py-3 
                      text-white/80 hover:text-white
                      hover:bg-white/10 transition-all duration-200"
                    >
                      <BriefcaseBusiness size={18} /> My Jobs
                    </Link>
                    <Link
                      onClick={() => setOpenMenu(false)}
                      to="/jobs"
                      className="flex items-center gap-3 px-5 py-3 
                      text-white/80 hover:text-white
                      hover:bg-white/10 transition-all duration-200"
                    >
                      <Globe  size={18} /> Explore Jobs
                    </Link>

                    {user.role === "candidate" && <Link
                      onClick={() => setOpenMenu(false)}
                      to="/saved-jobs"
                      className="flex items-center gap-3 px-5 py-3
                      text-white/80 hover:text-white
                      hover:bg-white/10 transition-all duration-200"
                    >
                      <Heart size={18} /> Saved Jobs
                    </Link>}

                    {user.role === "recruiter" && <Link
                      onClick={() => setOpenMenu(false)}
                      to="/post-job"
                      className="flex items-center gap-3 px-5 py-3 
                      text-white/80 hover:text-white
                      hover:bg-white/10 transition-all duration-200"
                    >
                      <PenBox size={18} /> Post Job
                    </Link>}
                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-3
                    text-red-400 hover:text-red-300
                    hover:bg-red-500/10 transition-all duration-200"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Static Sign In button */}
          {!user && location.pathname !== "/onboarding" && (
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Sign In
            </Button>
          )}
        </div>
      </nav>

      {/* Simple modal structure */}
      {showSignIn && (
        <div
          className="fixed inset-0 z-40 bg-[#1d1d1d90] flex justify-center items-center"
          onClick={handleOverlay}
        >
          <FormBox closeSigninBox={() => setShowSignIn(false)} />
        </div>
      )}
    </>
  );
};

export default Header;
