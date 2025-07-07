import { getDatabase, onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import GroupItems from "./GroupItems";

const Group = () => {
  const db = getDatabase();
  const [createGroup, setCreateGroup] = useState(false);
  const createGroupRef = useRef(null);
  const [groupName, setGroupName] = useState("");
  const [groupList, setGroupList] = useState([]);
  const userInfo = useSelector((state) => state.userData.user);

  window.addEventListener("mousedown", (e) => {
    if (createGroupRef.current && !createGroupRef.current.contains(e.target)) {
      setCreateGroup(false);
    }
  });

  // =============== create group
  const handleCreateGroup = () => {
    if (groupName) {
      set(push(ref(db, "groupList/")), {
        groupName,
        creatorName: userInfo.displayName,
        creatorId: userInfo.uid,
      });
      toast.success("Group Created Successfully!");
      setCreateGroup(false);
      setGroupName("");
    } else {
      toast.error("Enter valid group Name!");
    }
  };
  // =============== create group

  // =============== group show
  useEffect(() => {
    onValue(ref(db, "groupList"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().creatorId === userInfo.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setGroupList(arr);
    });
  }, []);
  // =============== group show

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
        <button className="w-30 h-12 bg-black border border-white text-white cursor-pointer rounded-lg hover:bg-white hover:text-black duration-300 font-semibold text-lg">
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
      </div>
      <div className="mt-5 overflow-y-auto h-[calc(100vh-255px)] lg:h-[calc(100vh-188px)] overflow-x-hidden">
        {groupList.map((item) => (
          <GroupItems key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Group;
