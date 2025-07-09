import React, { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const JoinGroupItems = ({ data }) => {
  const db = getDatabase();
  const userInfo = useSelector((state) => state.userData.user);
  const [groupMemberList, setGroupMemberList] = useState([]);

  // ============== joining group
  const handleJoinGroup = () => {
    set(push(ref(db, "groupMember/" + data.id)), {
      groupId: data.id,
      memberId: userInfo.uid,
      memberName: userInfo.displayName,
      creatorId: data.creatorId,
    });
    };
    
  // ================ group member data
    useEffect(() => {
      onValue(ref(db, "groupMember/" + data.id), (snapshot) => {
        let arr = [];
        snapshot.forEach((item) => {
          arr.push(item.val().memberId);
        });
        setGroupMemberList(arr);
      });
    }, []);

  // ============ is already in group then hide 
  const isAlreadyMember = groupMemberList.includes(userInfo.uid);
  if (isAlreadyMember) return null;
    
  return (
    <>
      <div
        className={` flex justify-between items-center p-3 rounded-sm cursor-pointer hover:scale-101 hover:shadow-sm duration-300 mb-1 bg-[#262e35]`}
      >
        <div className="profile flex gap-4 items-center">
          <h2 className="w-13 h-13 bg-primary rounded-full text-brand text-2xl flex justify-center items-center capitalize font-bold">
            {data.groupName[0]}
          </h2>
          <div>
            <h4
              className={`font-semibold font-inter my-auto text-2xl text-brand`}
            >
              {data.groupName}
            </h4>
          </div>
        </div>
        <button
          onClick={handleJoinGroup}
          className="text-5xl text-primary cursor-pointer px-4 py-1 rounded-lg bg-brand hover:bg-primary hover:text-brand duration-300"
        >
          +
        </button>
      </div>
    </>
  );
};

export default JoinGroupItems;
