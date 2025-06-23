import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import CommonPerson from "./CommonPerson";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
import UserList from "./UserList";

const ChatList = () => {
  const db = getDatabase();
  const userInfo = useSelector((state) => state.userData.user);
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);
  const addFriendRef = useRef(null);
  const [friendList, setFriendList] = useState([]);

  // ============= add data
  const handleAdd = () => {
    const arr = [];
    onValue(ref(db, "users/"), (snapshot) => {
      snapshot.forEach((item) => {
        if (item.key !== userInfo.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setData(arr);
    });
    setAdd(true);
  };

  // ============= outside click event
  window.addEventListener("mousedown", (e) => {
    if (addFriendRef.current && !addFriendRef.current.contains(e.target)) {
      setAdd(false);
    }
  });

  useEffect(() => {
    onValue(ref(db, "friendList"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setFriendList(arr);
    });
  }, []);
  return (
    <>
      <div className=" pt-5 h-screen min-w-96 w-96 bg-[#262e35]">
        <div className="heading flex justify-between items-center px-4">
          <div className="text-2xl text-white font-medium">Chats</div>
          <button
            onClick={handleAdd}
            className="py-3 px-8 hover:bg-[#7289DA] hover:text-white ease-in-out duration-300 border border-[#7289DA] rounded-lg text-lg font-inter font-semibold text-[#7289DA] cursor-pointer"
          >
            Add
          </button>
        </div>
        <div className="search flex items-center gap-2.5 border-b-2 mt-6 mb-4.25 border-[#7289DA] text-xl font-semibold font-inter text-[#7289DA] relative px-4">
          <CiSearch className="text-2xl" />
          <input
            className="border-none outline-none w-full bg-transparent text-white placeholder-[#99AAB5]"
            type="text"
            placeholder="Search"
          />
          {add && (
            <div
              ref={addFriendRef}
              className="bg-[#1a1d21] py-10 absolute top-0 left-0 z-10 w-full h-120 rounded-2xl add "
            >
              <input
                className=" outline-none w-full bg-transparent text-[#fff] placeholder-[#3680b1] pb-3 border-b mb-3 tracking-widest px-10"
                type="text"
                placeholder="Search"
              />
              <div className="overflow-y-auto h-90 w-full p-5">
                {data.map((item) => (
                  <UserList key={item.id} data={item} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="text-xl text-primary font-semibold mb-2 ml-4">
          Recent
        </div>
        <div className="person overflow-y-auto h-[calc(100vh-183px)] overflow-x-hidden bg-[#303841]">
          {friendList.map(
            (item) =>
              (item.creatorId == userInfo.uid && (
                <CommonPerson
                  key={item.id}
                  name={item.paricipantName}
                  avater={item.participantAvater}
                  id={item.participantId}
                  time="12 : 30 am"
                  styling="bg-[#1A1D21]"
                  stylingName="text-white"
                  stylingMessage="text-[#99AAB5]"
                />
              )) ||
              (item.participantId == userInfo.uid && (
                <CommonPerson
                  key={item.id}
                  name={item.creatorName}
                  avater={item.creatorAvater}
                  id={item.creatorId}
                  time="12 : 30 am"
                  styling="bg-[#1A1D21]"
                  stylingName="text-white"
                  stylingMessage="text-[#99AAB5]"
                />
              ))
          )}
        </div>
      </div>
    </>
  );
};

export default ChatList;
