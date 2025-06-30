import React from "react";
import { useDispatch } from "react-redux";
import { selectConversation } from "../store/slices/conversationSlice";

const ChatItems = ({
  avater,
  name,
  id,
  styling = "bg-white",
  stylingName = "text-black22",
  time,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectConversation({ name, avater, id }));
  };

  return (
    <>
      <div
        onClick={handleClick}
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
