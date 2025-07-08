import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import ChatBox from "../Chat/ChatBox";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const AddGroupItems = ({
  avater,
  name,
  id,
  styling = "bg-white",
  stylingName = "text-black22",
  groupData,
}) => {
  const reqRef = useRef(null);
  const [show, setShow] = useState(false);
  const [groupMemberList, setGroupMemberList] = useState([]);
  const db = getDatabase();
  const userInfo = useSelector((state) => state.userData.user);

    
  const handleAddUser = () => {
    set(push(ref(db, "groupMember/" + groupData.id)), {
      groupId: groupData.id,
      memberId: id,
      memberName: name,
      creatorId: groupData.creatorId,
    });
  };

  useEffect(() => {
      onValue(ref(db, "groupMember/" + groupData.id), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().creatorId + item.val().memberId);
      });
      setGroupMemberList(arr);
    });
  }, []);
    
    
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
        {groupMemberList.includes(id + userInfo.uid) ||
        groupMemberList.includes(userInfo.uid + id) ? (
          (reqRef.current.style = "display : none;")
        ) : (
          <button
            onClick={handleAddUser}
            className="add px-3 py-1.5 cursor-pointer !rounded-lg"
          >
            Add
          </button>
        )}
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

export default AddGroupItems;
