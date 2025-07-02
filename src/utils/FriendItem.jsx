import { getDatabase, ref, remove } from "firebase/database";
import React, { useState } from "react";

const FriendItem = ({
  avater,
  name,
  email,
  id,
  styling = "bg-white",
  stylingName = "text-black22",
  time,
}) => {
  const [show, setShow] = useState(false);
  const db = getDatabase();

  const handleShow = () => {
    if (!show) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  // ============= remove friend
  const handleRemove = () => {
    remove(ref(db, "friendList/" + id));
  };

  return (
    <>
      <div
        onClick={handleShow}
        className={` flex justify-between items-center p-3 rounded-sm cursor-pointer hover:scale-105 hover:shadow-sm duration-300 mb-1 bg-[#262e35] ${styling}`}
      >
        <div className="profile flex gap-4">
          <img className="w-12 h-12 rounded-full" src={avater} alt="logo" />
          <h4
            className={`${stylingName} text-lg font-semibold font-inter my-auto`}
          >
            {name}
          </h4>
        </div>
        <p className="text-[rgba(255,255,255,0.47)]">{time}</p>
      </div>
      {show && (
        <div className="h-60 overflow-y-auto rounded-2xl bg-slate-50 py-5 my-2 mx-auto add">
          <img
            className="w-20 h-20  rounded-full mx-auto"
            src={avater}
            alt="profile"
          />
          <h4 className="text-center text-black text-2xl tracking-widest font-semibold my-2">
            {name}
          </h4>
          <p className="text-center text-[rgba(0,0,0,0.61)] font-semibold my-2 text-2xl">
            {email}
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleRemove}
              className="text-white px-4 py-2 bg-red-400 cursor-pointer rounded-lg hover:bg-red-500 ease-in-out duration-300"
            >
              Remove Friend
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FriendItem;
