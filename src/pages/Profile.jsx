import React, { useEffect } from "react";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { MdOutlinePerson3 } from "react-icons/md";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";
import ChatBox from "../components/ChatBox";

const Profile = () => {
  const userInfo = useSelector((state) => state.userData.user);
  const db = getDatabase();
  const [userData, setUserData] = useState([]);
  const [time, setTime] = useState(new Date());

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

  return (
    <>
      <div className=" pt-5 h-screen min-w-96 w-96 bg-[#262e35] p-4">
        <h2 className="text-2xl text-primary font-semibold">My Profile</h2>
        <div className="img flex justify-center my-10">
          <img
            className="w-20 h-20 rounded-full"
            src={userInfo.photoURL}
            alt="profile_photo"
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
          <p className="text-lg font-semibold text-primary leading-8">
            {userInfo.displayName}
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
        <div className="location mt-5 ml-3">
          <p className="text-base font-medium text-secondary leading-8">
            Location
          </p>
          <p className="text-lg font-semibold text-primary leading-8">
            {userData.location}
          </p>
        </div>
          </div>
          <ChatBox/>
    </>
  );
};

export default Profile;
