import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { MdOutlinePerson3 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";
import ChatBox from "../components/ChatBox";
import { FaEdit } from "react-icons/fa";
import { getAuth, updateProfile } from "firebase/auth";
import { loggedUser } from "../store/slices/authSlice";

const Settings = () => {
  const userInfo = useSelector((state) => state.userData.user);
  const db = getDatabase();
  const updateProfileRef = useRef(null);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [time, setTime] = useState(new Date());
  const [editable, setEditable] = useState(false);
  const [photoUpdate, setPhotoUpdate] = useState(false);
  const [usernameUpdate, setUsernameUpdate] = useState(false);
  const [updataData, setUpdataData] = useState({
    avater: "",
    username: "",
  });
  const auth = getAuth();

  window.addEventListener("mousedown", (e) => {
    if (
      updateProfileRef.current &&
      !updateProfileRef.current.contains(e.target)
    ) {
      setEditable(false);
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, "users/" + userInfo.uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
    });
  }, []);

  const handleUpdate = () => {
    updateProfile(auth.currentUser, {
      displayName: updataData.username || auth.currentUser.displayName,
      photoURL: updataData.avater || auth.currentUser.photoURL,
    })
      .then(() => {
        dispatch(loggedUser(auth.currentUser));
        setEditable(false);
        setPhotoUpdate(false);
        setUsernameUpdate(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className=" pt-5 h-screen min-w-96 w-96 bg-[#262e35] p-4 relative">
        <h2 className="text-2xl text-primary font-semibold">Settings</h2>
        <div className="img flex justify-center my-10">
          <img
            className="w-20 h-20 rounded-full"
            src={userInfo.photoURL}
            alt="profile_photo"
          />
          <FaEdit
            onClick={() => {
              setEditable(true), setPhotoUpdate(true), setUsernameUpdate(false);
            }}
            className="text-2xl text-primary cursor-pointer hover:text-brand duration-300 -translate-x-1"
          />
        </div>
        <div className="username text-center">
          <h4 className="text-primary text-xl font-semibold">
            {userInfo.displayName}
          </h4>
          <p className="text-secondary flex justify-center items-center text-base font-medium leading-8 pb-10 border-b border-[rgba(255,255,255,0.26)]">
            <GoDotFill className="text-green-500" />
            Active
          </p>
        </div>
        <div className="flex items-center mt-10 text-primary gap-3 text-xl font-semibold">
          <MdOutlinePerson3 />
          About
        </div>
        <div className="name mt-5 ml-3">
          <p className="text-base font-medium text-secondary leading-8">Name</p>
          <p className="text-lg font-semibold text-primary leading-8 flex gap-1">
            {userInfo.displayName}
            <FaEdit
              onClick={() => {
                setEditable(true),
                  setUsernameUpdate(true),
                  setPhotoUpdate(false);
              }}
              className="text-2xl text-primary cursor-pointer hover:text-brand"
            />
          </p>
        </div>
        <div className="email mt-5 ml-3">
          <p className="text-base font-medium text-secondary leading-8">
            Email
          </p>
          <p className="text-lg font-semibold text-primary leading-8">
            {userInfo.email}
          </p>
        </div>
        <div className="time mt-5 ml-3">
          <p className="text-base font-medium text-secondary leading-8">Time</p>
          <p className="text-lg font-semibold text-primary leading-8">
            {time.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: true,
            })}
          </p>
        </div>
        <div className="email mt-5 ml-3">
          <p className="text-base font-medium text-secondary leading-8">
            Location
          </p>
          <p className="text-lg font-semibold text-primary leading-8">
            {userData.location}
          </p>
        </div>
        {editable && (
          <div
            className="bg-[rgba(13,17,20,0.9)] absolute top-5/10 left-5/10 -translate-5/10 p-10 rounded-2xl"
            ref={updateProfileRef}
          >
            <div className=" flex flex-col items-center w-77 h-60 p-10 rounded">
              {photoUpdate && (
                <input
                  onChange={(e) =>
                    setUpdataData((prev) => ({
                      ...prev,
                      avater: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Edit Your PhotoURL"
                  className={`w-full pl-10 pr-4 py-4 bg-[#1E2124] border-2  "border-[#2C2F33]"
              rounded-lg text-white placeholder-[#99AAB5] focus:outline-none focus:border-[#7289DA] transition-all hover:border-[#7289DA] mb-2`}
                />
              )}
              {usernameUpdate && (
                <input
                  onChange={(e) =>
                    setUpdataData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Edit Your Name"
                  className={`w-full pl-10 pr-4 py-4 bg-[#1E2124] border-2  "border-[#2C2F33]"
              rounded-lg text-white placeholder-[#99AAB5] focus:outline-none focus:border-[#7289DA] transition-all hover:border-[#7289DA]`}
                />
              )}
              <div className="flex gap-5 justify-center mt-10">
                <button
                  onClick={handleUpdate}
                  className="py-2 px-3 bg-green-500 hover:bg-green-600 duration-300 rounded text-white cursor-pointer"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditable(false)}
                  className="py-2 px-3 bg-red-500 hover:bg-red-600 duration-300 rounded text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ChatBox />
    </>
  );
};

export default Settings;
