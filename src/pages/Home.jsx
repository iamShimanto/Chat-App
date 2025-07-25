import React, { useRef, useState } from "react";
import { BsChatRight } from "react-icons/bs";
import { FaUserGroup, FaUserPlus } from "react-icons/fa6";
import { GrContactInfo } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePerson3 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { loggedUser } from "../store/slices/authSlice";
import { Link, Navigate } from "react-router";
import { FiMessageSquare } from "react-icons/fi";
import Group from "../components/Group/Group";
import GroupChatBox from "../components/Group/GroupChatBox";
import ChatList from "../components/Chat/ChatList";
import Profile from "../components/Navbar/Profile";
import Settings from "../components/Navbar/Settings";
import Request from "../components/Navbar/Request";
import Contact from "../components/Navbar/Contact";
import ChatBox from "../components/Chat/ChatBox";

const Home = () => {
  const [editable, setEditable] = useState(false);
  const updateProfileRef = useRef(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userData.user);
  const activeFriend = useSelector((state) => state.activeFriend.friend);
  const activeGroup = useSelector((state) => state.activeFriend.group);

  // =============== use ref ========
  const chatlistref = useRef(null);
  const chatbgref = useRef(null);
  const profileref = useRef(null);
  const requestRef = useRef(null);
  const ContactRef = useRef(null);
  const groupRef = useRef(null);
  const chatBoxRef = useRef(null);
  const GroupChatBoxRef = useRef(null);

  // ============ bg ref
  const profilebgref = useRef(null);
  const settingsref = useRef(null);
  const settingsbgref = useRef(null);
  const requestbgRef = useRef(null);
  const ContactBgRef = useRef(null);
  const groupBgRef = useRef(null);
  // =============== use ref ========

  // ======= click event ====
  const handleProf = () => {
    chatlistref.current.style = "display : none;";
    profileref.current.style = "display : block;";
    settingsref.current.style = "display : none;";
    requestRef.current.style = "display : none;";
    ContactRef.current.style = "display : none";
    groupRef.current.style = "display : none";
    profilebgref.current.style = "background-color: #7269EF;";
    chatbgref.current.style = "background-color: transparent;";
    settingsbgref.current.style = "background-color: transparent;";
    requestbgRef.current.style = "background-color: transparent;";
    ContactBgRef.current.style = "background-color: transparent;";
    groupBgRef.current.style = "background-color: transparent;";
  };
  const hancleChat = () => {
    GroupChatBoxRef.current.style = "display : none";
    chatBoxRef.current.style = "display : block";
    chatlistref.current.style = "display : block;";
    profileref.current.style = "display : none;";
    settingsref.current.style = "display : none;";
    requestRef.current.style = "display : none;";
    ContactRef.current.style = "display : none";
    groupRef.current.style = "display : none";
    profilebgref.current.style = "background-color: transparent;";
    chatbgref.current.style = "background-color: #7269EF;";
    settingsbgref.current.style = "background-color: transparent;";
    requestbgRef.current.style = "background-color: transparent;";
    ContactBgRef.current.style = "background-color: transparent;";
    groupBgRef.current.style = "background-color: transparent;";
  };
  const handleSett = () => {
    chatlistref.current.style = "display : none;";
    profileref.current.style = "display : none;";
    requestRef.current.style = "display : none;";
    settingsref.current.style = "display : block;";
    ContactRef.current.style = "display : none";
    groupRef.current.style = "display : none";
    profilebgref.current.style = "background-color: transparent;";
    chatbgref.current.style = "background-color: transparent;";
    requestbgRef.current.style = "background-color: transparent;";
    settingsbgref.current.style = "background-color: #7269EF;";
    ContactBgRef.current.style = "background-color: transparent;";
    groupBgRef.current.style = "background-color: transparent;";
  };
  const handleReq = () => {
    chatlistref.current.style = "display : none;";
    profileref.current.style = "display : none;";
    settingsref.current.style = "display : none;";
    requestRef.current.style = "display : block";
    ContactRef.current.style = "display : none";
    groupRef.current.style = "display : none";
    profilebgref.current.style = "background-color: transparent;";
    chatbgref.current.style = "background-color: transparent;";
    settingsbgref.current.style = "background-color: transparent;";
    requestbgRef.current.style = "background-color: #7269EF;";
    ContactBgRef.current.style = "background-color: transparent;";
    groupBgRef.current.style = "background-color: transparent;";
  };
  const handleContact = () => {
    chatlistref.current.style = "display : none;";
    profileref.current.style = "display : none;";
    settingsref.current.style = "display : none;";
    requestRef.current.style = "display : none";
    groupRef.current.style = "display : none";
    ContactRef.current.style = "display : block";
    profilebgref.current.style = "background-color: transparent;";
    chatbgref.current.style = "background-color: transparent;";
    settingsbgref.current.style = "background-color: transparent;";
    requestbgRef.current.style = "background-color: transparent;";
    groupBgRef.current.style = "background-color: transparent;";
    ContactBgRef.current.style = "background-color: #7269EF;";
  };
  const handleGroup = () => {
    GroupChatBoxRef.current.style = "display : block";
    chatBoxRef.current.style = "display : none";
    chatlistref.current.style = "display : none;";
    profileref.current.style = "display : none;";
    settingsref.current.style = "display : none;";
    requestRef.current.style = "display : none";
    ContactRef.current.style = "display : none";
    groupRef.current.style = "display : block";
    profilebgref.current.style = "background-color: transparent;";
    chatbgref.current.style = "background-color: transparent;";
    settingsbgref.current.style = "background-color: transparent;";
    requestbgRef.current.style = "background-color: transparent;";
    ContactBgRef.current.style = "background-color: transparent;";
    groupBgRef.current.style = "background-color: #7269EF;";
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
    <div className="flex flex-col-reverse lg:flex-row">
      {/* ================ navbar ==================== */}

      <nav className="bg-nav_bg lg:h-screen flex items-center lg:flex-col justify-between px-2 lg:min-w-19 lg:max-w-19 pt-3 h-20">
        <div className="flex justify-center">
          <img src="images/logo.png" alt="logo" />
        </div>
        <div className="flex lg:flex-col lg:mt-auto">
          <div
            onClick={handleProf}
            ref={profilebgref}
            className="text-lg sm:text-xl lg:text-2xl w-full flex justify-center p-3 sm:p-4 rounded-lg profile group relative focus:bg-[#3E4A56] text-icons cursor-pointer"
          >
            <MdOutlinePerson3 />
            <div className="px-4 py-2 bg-white !text-black text-sm hidden group-hover:block absolute bottom-8/10 rounded-md">
              Profile
            </div>
          </div>
          <div
            onClick={hancleChat}
            ref={chatbgref}
            className="text-lg sm:text-xl lg:text-2xl w-full flex justify-center p-3 sm:p-4 rounded-lg profile group relative focus:bg-[#3E4A56] text-icons cursor-pointer bg-brand"
          >
            <BsChatRight />
            <div className="px-4 py-2 bg-white !text-black text-sm hidden group-hover:block absolute bottom-8/10 rounded-md">
              Chats
            </div>
          </div>
          <div
            onClick={handleGroup}
            ref={groupBgRef}
            className="text-lg sm:text-xl lg:text-2xl w-full flex justify-center p-3 sm:p-4 rounded-lg profile group relative focus:bg-[#3E4A56] text-icons cursor-pointer"
          >
            <FaUserGroup />
            <div className="px-4 py-2 bg-white !text-black text-sm hidden group-hover:block absolute bottom-8/10 rounded-md">
              Groups
            </div>
          </div>
          <div
            onClick={handleContact}
            ref={ContactBgRef}
            className="text-lg sm:text-xl lg:text-2xl w-full flex justify-center p-3 sm:p-4 rounded-lg profile group relative focus:bg-[#3E4A56] text-icons cursor-pointer"
          >
            <GrContactInfo />
            <div className="px-4 py-2 bg-white !text-black text-sm hidden group-hover:block absolute bottom-8/10 rounded-md">
              Contacts
            </div>
          </div>
          <div
            onClick={handleReq}
            ref={requestbgRef}
            className="text-lg sm:text-xl lg:text-2xl w-full flex justify-center p-3 sm:p-4 rounded-lg profile group relative focus:bg-[#3E4A56] text-icons cursor-pointer"
          >
            <FaUserPlus />
            <div className="px-4 py-2 bg-white !text-black text-sm hidden group-hover:block absolute bottom-8/10 rounded-md">
              Requests
            </div>
          </div>
          <div
            onClick={handleSett}
            ref={settingsbgref}
            className="text-lg sm:text-xl lg:text-2xl w-full flex justify-center p-3 sm:p-4 rounded-lg profile group relative focus:bg-[#3E4A56] text-icons cursor-pointer"
          >
            <IoSettingsOutline />
            <div className="px-4 py-2 bg-white !text-black text-sm hidden group-hover:block absolute bottom-8/10 rounded-md">
              Settings
            </div>
          </div>
        </div>
        <div
          onClick={() => handleProfile()}
          className="photoUrl flex justify-center pb-3.5 cursor-pointer mt-auto relative"
        >
          <img
            className="rounded-full w-9 h-9"
            src={userInfo.photoURL}
            alt="profile"
          />
          {editable && (
            <div
              ref={updateProfileRef}
              className="py-2 w-40 border border-[rgba(255,255,255,0.28)] bg-[#303841] text-sm absolute bottom-full right-2/10 lg:left-0 rounded-md text-primary z-10"
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
      {/* ================ navbar ==================== */}

      {/* ================ navabr request components ================== */}
      <div className="border-r border-nav_bg" ref={chatlistref}>
        <ChatList />
      </div>
      <div ref={profileref} className="hidden">
        <Profile />
      </div>
      <div ref={settingsref} className="hidden">
        <Settings />
      </div>
      <div ref={requestRef} className="hidden">
        <Request />
      </div>
      <div ref={ContactRef} className="hidden">
        <Contact />
      </div>
      <div ref={groupRef} className="hidden">
        <Group />
      </div>
      {/* ================ navabr request components ================== */}

      {/* ============= chat box =============== */}
      <div ref={chatBoxRef} className="w-full hidden lg:block">
        {activeFriend ? (
          <ChatBox />
        ) : (
          <div className="flex justify-center items-center h-screen flex-col gap-3 sm:p-4">
            <div className="icons w-30 h-30 bg-icons rounded-full flex justify-center items-center text-5xl text-primary">
              <FiMessageSquare />
            </div>
            <p className="px-4 py-2 bg-icons rounded-full text-xl font-bold text-primary">
              Start Conversation
            </p>
          </div>
        )}
      </div>
  
      {/* ============= chat box =============== */}
      {/* ============= group chat box =============== */}
      <div ref={GroupChatBoxRef} className="w-full hidden">
        {activeGroup ? (
          <GroupChatBox />
        ) : (
          <div className="flex justify-center items-center h-screen flex-col gap-3 sm:p-4">
            <div className="icons w-30 h-30 bg-icons rounded-full flex justify-center items-center text-5xl text-primary">
              <FiMessageSquare />
            </div>
            <p className="px-4 py-2 bg-icons rounded-full text-xl font-bold text-primary">
              Start Conversation
            </p>
          </div>
        )}
      </div>
      {/* ============= group chat box =============== */}
    </div>
  );
};

export default Home;
