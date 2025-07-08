import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { useSelector } from "react-redux";
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from "firebase/database";
import EmojiPicker from "emoji-picker-react";

const GroupChatBox = () => {
  const activeGroup = useSelector((state) => state.activeFriend.group);
  const userInfo = useSelector((state) => state.userData.user);
  const db = getDatabase();
  const [messageContent, setMessageContent] = useState("");
  const [message, setMessage] = useState([]);
  const [emoji, setEmoji] = useState(false);
  const emojiRef = useRef(null);
  const chatboxRef = useRef(null);

  console.log(activeGroup);
  // ============ write message
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (messageContent) {
      set(push(ref(db, "groupMessages/")), {
        senderId: userInfo.uid,
        recieverId: activeGroup.id,
        message: messageContent,
        senderName: userInfo.displayName,
      });
    }

    update(ref(db, "friendList/" + activeGroup.messageId), {
      lastMessage: messageContent,
      time: new Date().toLocaleTimeString(),
    });

    setMessageContent("");
    setEmoji(false);
  };
  // ============ write message

  // ============ read message
  useEffect(() => {
    onValue(ref(db, "groupMessages"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          (item.val().senderId === activeGroup.creator ||
            item.val().recieverId === activeGroup.id) &
          (item.val().senderId === userInfo.uid ||
            item.val().recieverId === activeGroup.id)
        ) {
        arr.push({ ...item.val(), id: item.key });
        }
      });
      setMessage(arr);
    });
  }, [activeGroup]);
  // ============ read message

  // =================== emoji box click ====================
  window.addEventListener("mousedown", (e) => {
    if (emojiRef.current && !emojiRef.current.contains(e.target)) {
      setEmoji(false);
    }
  });
  // =================== emoji box click ====================

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [message]);

  return (
    <>
      <div className="h-screen w-full">
        <div className="heading flex justify-center items-center border-b border-[rgba(255,255,255,0.33)] pb-3 pt-12.5 pl-3 pr-6">
          <div className="flex items-center gap-4 cursor-pointer">
            <h2 className="w-13 h-13 bg-primary rounded-full text-brand text-2xl flex justify-center items-center capitalize font-bold">
              {activeGroup.groupName[0]}
            </h2>
            <h5 className="text-lg font-semibold font-inter text-white">
              {activeGroup.groupName}
            </h5>
          </div>
        </div>
        <div
          ref={chatboxRef}
          className="message overflow-y-auto h-[calc(100vh-180px)] px-2"
        >
          <div className="flex flex-col gap-5 pb-10 my-2">
            {message.map((item) =>
              item.senderId === userInfo.uid ? (
                <p
                  key={item.id}
                  className="px-4 py-2 bg-nav_bg w-fit text-primary rounded-xl rounded-br-none max-w-4/5 ml-auto flex flex-col"
                >
                  {item.message}
                  <span className="text-xs">{item.senderName}</span>
                </p>
              ) : (
                <p
                  key={item.id}
                  className="px-4 py-2 bg-brand w-fit text-primary rounded-xl rounded-bl-none max-w-4/5 flex flex-col"
                >
                  {item.message}
                  <span className="text-xs">{item.senderName}</span>
                </p>
              )
            )}
          </div>
        </div>
        <form
          onSubmit={handleSendMessage}
          className="mt-2 ml-4 mr-6 bg-nav_bg px-3 py-4 flex items-center rounded-lg relative"
        >
          {emoji && (
            <div ref={emojiRef} className="absolute bottom-15 right-10">
              <EmojiPicker
                emojiStyle="apple"
                onEmojiClick={(e) =>
                  setMessageContent((prev) => prev + e.emoji)
                }
              />
            </div>
          )}
          <input
            onChange={(e) => (
              setMessageContent(e.target.value), setEmoji(false)
            )}
            value={messageContent}
            className="w-full outline-none rounded-md pl-3 text-base font-normal font-inter text-white bg-transparent placeholder-[#99AAB5]"
            type="text"
            placeholder="Text Here"
          />
          <div className="emoji flex items-center gap-3 text-2xl text-[#99AAB5]">
            <div>
              <GrEmoji
                onClick={() => setEmoji(!emoji)}
                className="cursor-pointer hover:text-[#7289DA] duration-300 z-10"
              />
            </div>
            <button>
              <IoSend className="cursor-pointer hover:text-[#7289DA] duration-300" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default GroupChatBox;
