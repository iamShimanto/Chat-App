import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { selectConversation } from "../store/slices/conversationSlice";
import ChatBox from "../components/Chat/ChatBox";
import { IoMdArrowRoundBack } from "react-icons/io";

const ChatItems = ({
  avater,
  name,
  id,
  messageId,
  lastMessage,
  styling = "bg-white",
  stylingName = "text-black22",
  time,
}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  // ============== user data ==> redux
  const handleClick = () => {
    dispatch(selectConversation({ name, avater, id, messageId }));
    setShow(true);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={` flex justify-between items-center p-3 rounded-sm cursor-pointer hover:scale-105 hover:shadow-sm duration-300 mb-1 bg-[#262e35] ${styling}`}
      >
        <div className="profile flex gap-4">
          <img className="w-12 h-12 rounded-full" src={avater} alt="logo" />
          <div>
            <h4
              className={`${stylingName} text-lg font-semibold font-inter my-auto`}
            >
              {name}
            </h4>
            <p className="text-secondary">
              {lastMessage && lastMessage.length > 12
                ? lastMessage.substring(0, 10) + " ..."
                : lastMessage}
            </p>
          </div>
        </div>

        <p className="text-[rgba(255,255,255,0.47)]">{time}</p>
      </div>
      <div className="lg:hidden">
        {show && (
          <div className="w-full h-screen absolute top-0 left-0 z-10 bg-slate-500">
            <ChatBox />
            <button
              onClick={() => setShow(false)}
              className="text-3xl text-primary absolute top-2 left-2 px-6 py-2 bg-brand rounded-lg"
            >
              <IoMdArrowRoundBack />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatItems;
