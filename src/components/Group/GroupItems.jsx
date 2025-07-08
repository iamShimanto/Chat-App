import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddGroupItems from "./AddGroupItems";
import { selectGroup } from "../../store/slices/conversationSlice";

const GroupItems = ({ data }) => {
  const db = getDatabase();
  const [add, setAdd] = useState(false);
  const userInfo = useSelector((state) => state.userData.user);
  const [friendList, setFriendList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    onValue(ref(db, "friendList"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          item.val().creatorId === userInfo.uid ||
          item.val().participantId === userInfo.uid
        )
          arr.push({ ...item.val(), id: item.key });
      });
      setFriendList(arr);
    });
  }, []);

  const handleClick = () => {
    dispatch(selectGroup(data));
  };

  return (
    <>
      <div className="relative">
        <div
          onClick={handleClick}
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
            onClick={() => setAdd(!add)}
            className="text-5xl text-primary cursor-pointer px-4 py-1 rounded-lg bg-brand hover:bg-primary hover:text-brand duration-300"
          >
            +
          </button>
        </div>
        {add && (
          <div
            // ref={addFriendRef}
            className="bg-[#1a1d21] py-10 absolute top-full left-0 z-10 w-full h-120 rounded-2xl add"
          >
            <input
              className=" outline-none w-full bg-transparent text-[#fff] placeholder-[#3680b1] pb-3 border-b mb-3 tracking-widest px-10"
              type="text"
              placeholder="Search"
            />
            <div className="person overflow-y-auto h-[calc(100vh-255px)] lg:h-[calc(100vh-183px)] overflow-x-hidden bg-[#303841]">
              {friendList.map(
                (item) =>
                  (item.creatorId == userInfo.uid && (
                    <AddGroupItems
                      key={item.id}
                      messageId={item.id}
                      name={item.participantName}
                      avater={item.participantAvater}
                      email={item.participantEmail}
                      id={item.participantId}
                      time={item.time}
                      styling="bg-[#1A1D21]"
                      stylingName="text-white"
                      stylingMessage="text-[#99AAB5]"
                      groupData={data}
                    />
                  )) ||
                  (item.participantId == userInfo.uid && (
                    <AddGroupItems
                      key={item.id}
                      messageId={item.id}
                      name={item.creatorName}
                      avater={item.creatorAvater}
                      email={item.creatorEmail}
                      id={item.creatorId}
                      time={item.time}
                      styling="bg-[#1A1D21]"
                      stylingName="text-white"
                      groupData={data}
                    />
                  ))
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GroupItems;
