import React, { useRef, useState } from "react";
import { BsChatRight } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";
import { GrContactInfo } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePerson3 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { loggedUser } from "../store/slices/authSlice";
import { Link, Navigate } from "react-router";
import ChatList from "../components/ChatList";
import ChatBox from "../components/ChatBox";
import Profile from "../components/Profile";
import Settings from "../components/Settings";

const Home = () => {
  const [editable, setEditable] = useState(false);
  const updateProfileRef = useRef(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userData.user);

  // =============== use ref ========
  const chatlistref = useRef(null);
  const chatbgref = useRef(null);
  const profileref = useRef(null);
  const profilebgref = useRef(null);
  const settingsref = useRef(null);
  const settingsbgref = useRef(null);
  // =============== use ref ========

  // ======= click event ====
  const handleProf = () => {
    chatlistref.current.style = "display : none;";
    profileref.current.style = "display : block;";
    settingsref.current.style = "display : none;";
    profilebgref.current.style = "background-color: #7269EF;";
    chatbgref.current.style = "background-color: transparent;";
    settingsbgref.current.style = "background-color: transparent;";
  };
  const hancleChat = () => {
    chatlistref.current.style = "display : block;";
    profileref.current.style = "display : none;";
    settingsref.current.style = "display : none;";
    profilebgref.current.style = "background-color: transparent;";
    chatbgref.current.style = "background-color: #7269EF;";
    settingsbgref.current.style = "background-color: transparent;";
  };
  const handleSett = () => {
    chatlistref.current.style = "display : none;";
    profileref.current.style = "display : none;";
    settingsref.current.style = "display : block;";
    profilebgref.current.style = "background-color: transparent;";
    chatbgref.current.style = "background-color: transparent;";
    settingsbgref.current.style = "background-color: #7269EF;";
  };

  // ======= click event ====

  const handleProfile = () => {
    if (editable) {
      setEditable(false);
    } else {
      setEditable(true);
    }
    window.addEventListener("mousedown", (e) => {
      if (
        updateProfileRef.current &&
        !updateProfileRef.current.contains(e.target)
      ) {
        setEditable(false);
      }
    });
  };

  // -============ user sign out
  const handleSignOut = () => {
    dispatch(loggedUser(null));
  };

  // =========== protection
  if (!userInfo) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="flex">
      <nav className="bg-nav_bg h-screen flex flex-col justify-between px-2 min-w-19 max-w-19 pt-3">
        <div className="flex justify-center">
          <img src="images/logo.png" alt="logo" />
        </div>
        <div>
          <div
            onClick={handleProf}
            ref={profilebgref}
            className="text-2xl w-full flex justify-center p-4 rounded-lg profile group relative focus:bg-[#3E4A56] text-icons cursor-pointer"
          >
            <MdOutlinePerson3 />
            <div className="px-4 py-2 bg-white !text-black text-sm hidden group-hover:block absolute bottom-8/10 rounded-md">
              Profile
            </div>
          </div>
          <div
            onClick={hancleChat}
            ref={chatbgref}
            className="text-2xl w-full flex justify-center p-4 rounded-lg profile group relative focus:bg-[#3E4A56] text-icons cursor-pointer bg-brand"
          >
            <BsChatRight />
            <div className="px-4 py-2 bg-white !text-black text-sm hidden group-hover:block absolute bottom-8/10 rounded-md">
              Chats
            </div>
          </div>
          <div className="text-2xl w-full flex justify-center p-4 rounded-lg profile group relative focus:bg-[#3E4A56] text-icons cursor-pointer">
            <FaUserGroup />
            <div className="px-4 py-2 bg-white !text-black text-sm hidden group-hover:block absolute bottom-8/10 rounded-md">
              Groups
            </div>
          </div>
          <div className="text-2xl w-full flex justify-center p-4 rounded-lg profile group relative focus:bg-[#3E4A56] text-icons cursor-pointer">
            <GrContactInfo />
            <div className="px-4 py-2 bg-white !text-black text-sm hidden group-hover:block absolute bottom-8/10 rounded-md">
              Contacts
            </div>
          </div>
          <div
            onClick={handleSett}
            ref={settingsbgref}
            className="text-2xl w-full flex justify-center p-4 rounded-lg profile group relative focus:bg-[#3E4A56] text-icons cursor-pointer"
          >
            <IoSettingsOutline />
            <div className="px-4 py-2 bg-white !text-black text-sm hidden group-hover:block absolute bottom-8/10 rounded-md">
              Settings
            </div>
          </div>
        </div>
        <div
          onClick={() => handleProfile()}
          className="photoUrl flex justify-center pb-3.5 cursor-pointer relative"
        >
          <img
            className="rounded-full w-9 h-9"
            src={userInfo.photoURL}
            alt="profile"
          />
          {editable && (
            <div
              ref={updateProfileRef}
              className="py-2 w-40 border border-[rgba(255,255,255,0.28)] bg-[#303841] text-sm absolute bottom-full left-0 rounded-md text-primary z-10"
            >
              <div
                onClick={handleProf}
                className="hover:bg-nav_bg px-4 py-2 block"
              >
                Profile
              </div>
              <Link
                onClick={handleSett}
                className="hover:bg-nav_bg px-4 py-2 mb-2 block"
              >
                Settings
              </Link>
              <div className="border-t border-[rgba(255,255,255,0.22)]"></div>
              <div
                onClick={handleSignOut}
                className="hover:bg-nav_bg px-4 py-2 mt-2"
              >
                Log out
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="" ref={chatlistref}>
        <ChatList />
      </div>
      <div ref={profileref} className="hidden">
        <Profile />
      </div>
      <div ref={settingsref} className="hidden">
        <Settings />
      </div>
      <div className="w-full">
        <ChatBox />
      </div>
    </div>
  );
};

export default Home;
