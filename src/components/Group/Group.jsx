import { getDatabase, onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import GroupItems from "./GroupItems";
import JoinGroupItems from "./JoinGroupItems";

const Group = () => {
  const db = getDatabase();
  const [createGroup, setCreateGroup] = useState(false);
  const [joinGroup, setJoinGroup] = useState(false);
  const createGroupRef = useRef(null);
  const joinGroupRef = useRef(null);
  const [groupName, setGroupName] = useState("");
  const userInfo = useSelector((state) => state.userData.user);
  const [groupList, setGroupList] = useState([]);
  const [groupMember, setGroupMember] = useState([]);
  const [joinGroupMember, setJoinGroupMember] = useState([]);

  // ============ outside click 
  window.addEventListener("mousedown", (e) => {
    if (createGroupRef.current && !createGroupRef.current.contains(e.target)) {
      setCreateGroup(false);
    }
  });
  window.addEventListener("mousedown", (e) => {
    if (joinGroupRef.current && !joinGroupRef.current.contains(e.target)) {
      setJoinGroup(false);
    }
  });
  // ============ outside click 

  // =============== create group

  const handleCreateGroup = () => {
    if (groupName) {
      set(push(ref(db, "groups/")), {
        groupName,
        creatorName: userInfo.displayName,
        creatorId: userInfo.uid,
      });
      toast.success("Group created successfully!");
      setCreateGroup(false);
      setGroupName("");
    } else {
      toast.error("Please enter valid group name");
    }
  };

  // =============== create group

  // =============== group show

  useEffect(() => {
    onValue(ref(db, "groups"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setGroupList(arr);
    });
  }, []);

  useEffect(() => {
    onValue(ref(db, "groupMember/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        item.forEach((data) => {
          if (data.val().memberId === userInfo.uid) {
            arr.push(item.key);
          }
        });
      });
      setGroupMember(arr);
    });
  }, []);

  // =============== group show

  // ============ join group
  const handleJoinGroup = () => {
    setJoinGroup(true);
    onValue(ref(db, "groups/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          !(item.val().creatorId === userInfo.uid) &
          !groupMember.includes(item.key)
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setJoinGroupMember(arr);
    });
  };
  // ============ join group

  return (
    <div className=" pt-5 h-[calc(100vh-70px)] lg:h-screen w-full lg:min-w-96 lg:w-96 bg-[#262e35]">
      <ToastContainer position="top-left" autoClose={3000} />
      <h2 className="text-4xl text-white font-semibold text-center mt-10">
        GroupList
      </h2>
      <div className="flex justify-center gap-4 mt-5 relative">
        <button
          onClick={() => setCreateGroup(true)}
          className="w-30 h-12 bg-black border border-white text-white cursor-pointer rounded-lg hover:bg-white hover:text-black duration-300 font-semibold text-lg"
        >
          Create
        </button>
        <button
          onClick={handleJoinGroup}
          className="w-30 h-12 bg-black border border-white text-white cursor-pointer rounded-lg hover:bg-white hover:text-black duration-300 font-semibold text-lg"
        >
          Join
        </button>
        {createGroup && (
          <div
            ref={createGroupRef}
            className="bg-[#1a1d21] py-10 absolute top-15 left-0 z-10 w-full h-50 rounded-2xl add"
          >
            <div className="flex justify-center items-center">
              <input
                onChange={(e) => setGroupName(e.target.value)}
                className=" outline-none w-7/10 bg-transparent text-[#fff] placeholder-[#3680b1] pb-3 border mb-3 tracking-widest text-center pt-2 rounded-lg text-xl"
                type="text"
                placeholder="Group Name"
              />
            </div>
            <button
              onClick={handleCreateGroup}
              className="py-3 px-8 bg-nav_bg hover:bg-[#7289DA] hover:text-white ease-in-out duration-300 border border-[#7289DA] rounded-lg text-lg font-inter font-semibold text-[#7289DA] cursor-pointer flex mx-auto mt-3"
            >
              Create Group
            </button>
          </div>
        )}

        {joinGroup && (
          <div
            ref={joinGroupRef}
            className="bg-[#1a1d21] py-10 absolute top-15 left-0 z-10 w-full h-100 rounded-2xl add"
          >
            <h2 className="text-3xl font-bold capitalize text-primary text-center">
              Join Group
            </h2>
            <div className="overflow-y-auto h-60 overflow-x-hidden">
              {joinGroupMember.map((item) => (
                <JoinGroupItems key={item.id} data={item} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-5 overflow-y-auto h-[calc(100vh-255px)] lg:h-[calc(100vh-188px)] overflow-x-hidden">
        {groupList.map(
          (item) =>
            (item.creatorId === userInfo.uid ||
              groupMember.includes(item.id)) && (
              <GroupItems key={item.id} data={item} />
            )
        )}
      </div>
    </div>
  );
};

export default Group;
