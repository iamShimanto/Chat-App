import React, { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const UserList = ({ data }) => {
  const [show, setShow] = useState(false);
  const db = getDatabase();
  const userInfo = useSelector((state) => state.userData.user);
  const [friendList, setFriendList] = useState([])

  const handleUser = () => {
    if (!show) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleAdd = () => {
    set(
      push(ref(db, "friendList/"), {
        creatorName: userInfo.displayName,
        creatorId: userInfo.uid,
        creatorAvater: userInfo.photoURL,
        paricipantName: data.username,
        participantId: data.id,
        participantAvater: data.profile_picture,
      })
    );
  };

  useEffect(() => {
    onValue(ref(db, "friendList/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().creatorId + item.val().participantId);
      });
      setFriendList(arr)
    });
  }, []);

  return (
    <>
      <div
        className={` flex justify-between items-center p-3 rounded-sm bg-slate-100 hover:scale-105 hover:shadow-sm duration-300 mb-1 add`}
      >
        <div onClick={() => handleUser()} className="profile flex gap-4">
          <div className="flex items-center gap-1">
            <img
              className="w-10 h-10 rounded-full"
              src={data.profile_picture}
              alt="profile"
            />
            <h4 className={`text-lg font-semibold cursor-pointer`}>
              {data.username}
            </h4>
          </div>
        </div>
        {
          friendList.includes(data.id + userInfo.uid) || friendList.includes(userInfo.uid + data.id)
            ?
            <p className="text-green-500">Friend</p>
            :
        <button
          onClick={handleAdd}
          className="add px-3 py-1.5 cursor-pointer !rounded-lg"
        >
          Add
        </button>
        }
      </div>
      {show && (
        <div className="w-75 h-60 overflow-y-auto rounded-2xl bg-slate-50 py-5 my-2 mx-auto add">
          <img
            className="w-20 h-20  rounded-full mx-auto"
            src={data.profile_picture}
            alt="profile"
          />
          <h4 className="text-center text-black text-2xl tracking-widest font-semibold">
            {data.username}
          </h4>
          <p className="text-center text-[rgba(0,0,0,0.61)] font-medium my-2">
            {data.email}
          </p>
          <p className="text-center text-[rgba(0,0,0,0.91)] font-medium my-2">
            {data.location}
          </p>
        </div>
      )}
    </>
  );
};

export default UserList;
