import React, { useRef, useState } from "react";
import { BsChatRight } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";
import { GrContactInfo } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePerson3 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { loggedUser } from "../store/slices/authSlice";
import { NavLink, Link } from "react-router";

const Navbar = () => {
  const [editable, setEditable] = useState(false);
  const updateProfileRef = useRef(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userData.user);

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

  const handleSignOut = () => {
    dispatch(loggedUser(null));
  };

  return (
    <>
      <nav className="bg-nav_bg h-screen flex flex-col justify-between px-2 min-w-19 max-w-19 pt-3">
        <NavLink to="/" className="flex justify-center">
          <img src="images/logo.png" alt="logo" />
        </NavLink>
        <div>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `text-2xl w-full flex justify-center p-4 rounded-lg profile group relative focus:bg-[#3E4A56] ${
                isActive ? "bg-[#3E4A56] text-brand" : "text-icons"
              }`
            }
          >
            <MdOutlinePerson3 />
            <div className="px-4 py-2 bg-white !text-black text-sm hidden group-hover:block absolute bottom-8/10 rounded-md">
              Profile
            </div>
          </NavLink>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-2xl w-full flex justify-center p-4 rounded-lg group relative focus:bg-[#3E4A56] ${
                isActive ? "bg-[#3E4A56] text-brand" : "text-icons"
              }`
            }
          >
            <BsChatRight />
            <div className="px-4 py-2 bg-white !text-black text-sm hidden group-hover:block absolute bottom-8/10 rounded-md">
              Chats
            </div>
          </NavLink>
          <NavLink
            to="/groups"
            className={({ isActive }) =>
              `text-2xl w-full flex justify-center p-4 rounded-lg group relative focus:bg-[#3E4A56] ${
                isActive ? "bg-[#3E4A56] text-brand" : "text-icons"
              }`
            }
          >
            <FaUserGroup />
            <div className="px-4 py-2 bg-white !text-black text-sm hidden group-hover:block absolute bottom-8/10 rounded-md">
              Groups
            </div>
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `text-2xl w-full flex justify-center p-4 rounded-lg group relative focus:bg-[#3E4A56] ${
                isActive ? "bg-[#3E4A56] text-brand" : "text-icons"
              }`
            }
          >
            <GrContactInfo />
            <div className="px-4 py-2 bg-white !text-black text-sm hidden group-hover:block absolute bottom-8/10 rounded-md">
              Contacts
            </div>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `text-2xl w-full flex justify-center p-4 rounded-lg group relative focus:bg-[#3E4A56] ${
                isActive ? "bg-[#3E4A56] text-brand" : "text-icons"
              }`
            }
          >
            <IoSettingsOutline />
            <div className="px-4 py-2 bg-white !text-black text-sm hidden group-hover:block absolute bottom-8/10 rounded-md">
              Settings
            </div>
          </NavLink>
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
              <Link to="/profile" className="hover:bg-nav_bg px-4 py-2 block">
                Profile
              </Link>
              <Link
                to="settings"
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
    </>
  );
};

export default Navbar;
