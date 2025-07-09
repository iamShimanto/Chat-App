import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import ChatBox from "../Chat/ChatBox";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const AddGroupItems = ({
  avater,
  name,
  id,
  styling = "bg-white",
  stylingName = "text-black22",
  groupData,
}) => {
  const reqRef = useRef(null);
  const [groupMemberList, setGroupMemberList] = useState([]);
  const db = getDatabase();

// ============== add to group member
  const handleAddUser = () => {
    set(push(ref(db, "groupMember/" + groupData.id)), {
      groupId: groupData.id,
      memberId: id,
      memberName: name,
      creatorId: groupData.creatorId,
    });
  };

  // ============= group show
  useEffect(() => {
    onValue(ref(db, "groupMember/" + groupData.id), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().memberId);
      });
      setGroupMemberList(arr);
    });
  }, []);

  // ============ if already in group then hide
  const isAlreadyMember = groupMemberList.includes(id);
  if (isAlreadyMember) return null;

  return (
    <>
      <div
        ref={reqRef}
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
          </div>
        </div>
        <button
          onClick={handleAddUser}
          className="add px-3 py-1.5 cursor-pointer !rounded-lg"
        >
          Add
        </button>
      </div>
    </>
  );
};

export default AddGroupItems;
