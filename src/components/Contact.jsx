import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FriendItem from "../utils/FriendItem";

const Contact = () => {
  const db = getDatabase();
  const userInfo = useSelector((state) => state.userData.user);
  const [friendList, setFriendList] = useState([]);

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
    <div className=" pt-5 h-[calc(100vh-70px)] lg:h-screen w-full lg:min-w-96 lg:w-96 bg-[#262e35]">
      <h2 className="text-4xl text-white font-semibold ml-10 mt-10">
        FriendList
      </h2>
      <div className="person overflow-y-auto h-[calc(100vh-230px)] lg:h-[calc(100vh-140px)] overflow-x-hidden bg-[#303841] mt-10">
        {friendList.map(
          (item) =>
            (item.creatorId == userInfo.uid && (
              <FriendItem
                key={item.id}
                name={item.participantName}
                avater={item.participantAvater}
                email={item.participantEmail}
                id={item.id}
                time="12 : 30 am"
                styling="bg-[#1A1D21] add px-5"
                stylingName="text-white"
                stylingMessage="text-[#99AAB5]"
              />
            )) ||
            (item.participantId == userInfo.uid && (
              <FriendItem
                key={item.id}
                name={item.creatorName}
                avater={item.creatorAvater}
                email={item.creatorEmail}
                id={item.id}
                time="12 : 30 am"
                styling="bg-[#1A1D21] add px-5"
                stylingName="text-white"
              />
            ))
        )}
      </div>
    </div>
  );
};

export default Contact;
