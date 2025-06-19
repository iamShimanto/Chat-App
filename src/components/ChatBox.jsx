import React, { useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCallOutline, IoSend, IoVideocamOutline } from "react-icons/io5";
import MessageCard from "../utils/MessageCard";
import { RiGalleryLine } from "react-icons/ri";
import { GrEmoji } from "react-icons/gr";

const ChatBox = () => {
  const messagesEnd = useRef(null);

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <>
      <div className="h-screen w-full">
        <div className="heading flex justify-center items-center border-b border-[rgba(255,255,255,0.33)] pb-3 pt-12.5 pl-3 pr-6">
          <div className="flex items-center gap-4 cursor-pointer">
            <img
              className="h-12 w-12 rounded-full"
              src="images/default.png"
              alt="logo"
            />
            <h5 className="text-lg font-semibold font-inter text-white">
              Naruto Uzumaki
            </h5>
          </div>
        </div>
        <div className="message overflow-y-auto h-[calc(100vh-180px)]">
          <MessageCard message1="Hi" message2="Hlw" />
          <MessageCard message1="Hi" message2="Hlw" styling="mt-17" />
          <MessageCard message1="Hi" message2="Hlw" styling="mt-17" />
          <MessageCard message1="Hi" message2="Hlw" styling="mt-17" />
          <MessageCard message1="Hi" message2="Hlw" styling="mt-17" />
          <MessageCard message1="Hi" message2="Hlw" styling="mt-17" />
          <MessageCard message1="Hi" message2="Hlw" styling="mt-17" />
          <MessageCard message1="Hi" message2="Hlw" styling="mt-17" />
          <MessageCard message1="Hi" message2="Hlw" styling="mt-17" />
          <div ref={messagesEnd} />
        </div>
        <div className="mt-2 ml-4 mr-6 bg-nav_bg px-3 py-4 flex items-center rounded-lg">
          <input
            className="w-full outline-none rounded-md pl-3 text-base font-normal font-inter text-white bg-transparent placeholder-[#99AAB5]"
            type="text"
            placeholder="Text Here"
          />
          <div className="emoji flex items-center gap-3 text-2xl text-[#99AAB5]">
            <GrEmoji className="cursor-pointer hover:text-[#7289DA] duration-300" />
            <RiGalleryLine className="cursor-pointer hover:text-[#7289DA] duration-300" />
            <IoSend className="cursor-pointer hover:text-[#7289DA] duration-300" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
