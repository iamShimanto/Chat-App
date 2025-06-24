import React from "react";

const ChatItems = ({
  avater,
  name,
  styling = "bg-white",
  stylingName = "text-black22",
  time,
}) => {
  return (
    <>
      <div
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
    </>
  );
};

export default ChatItems;
