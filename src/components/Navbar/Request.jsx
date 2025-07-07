import React, { useEffect, useState } from "react";
import CommonPerson from "../../utils/CommonPerson";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const Request = () => {
  const db = getDatabase();
  const userInfo = useSelector((state) => state.userData.user);
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);

  // ================= request data show ==============
  useEffect(() => {
    onValue(ref(db, "requestList/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setList(arr);
    });
  }, []);

  return (
    <div className=" pt-5 h-full lg:h-screen w-full lg:min-w-96 lg:w-96 bg-[#262e35] border-r border-[rgba(255,255,255,0.1)]">
      <h2 className="text-4xl text-white font-semibold ml-10 mt-10">
        {show ? "Sent Request" : "Friend Request"}
      </h2>
      <button
        onClick={() => (show ? setShow(false) : setShow(true))}
        className="text-base text-[rgba(255,255,255,0.40)] ml-10 mt-2 cursor-pointer hover:underline duration-300 hover:text-gray-300"
      >
        {show ? "See Friend Request" : "See Sent Request"}
      </button>

      {/* ========== friend request ================= */}
      {!show && (
        <div className="person overflow-y-auto h-[calc(100vh-246px)] lg:h-[calc(100vh-173px)] overflow-x-hidden bg-[#303841] mt-10">
          {list.map(
            (item) =>
              item.participantId == userInfo.uid && (
                <CommonPerson
                  reqData={item}
                  key={item.id}
                  name={item.creatorName}
                  avater={item.creatorAvater}
                  styling="bg-[#1A1D21]"
                  stylingName="text-white"
                  stylingMessage="text-[#99AAB5]"
                />
              )
          )}
        </div>
      )}

      {/*  ============== sent request =============== */}
      {show && (
        <div className="person overflow-y-auto h-[calc(100vh-246px)] lg:h-[calc(100vh-173px)] overflow-x-hidden bg-[#303841] mt-10">
          {list.map(
            (item) =>
              item.creatorId == userInfo.uid && (
                <CommonPerson
                  key={item.id}
                  sentData={item}
                  name={item.participantName}
                  avater={item.participantAvater}
                  styling="bg-[#1A1D21]"
                  stylingName="text-white"
                  stylingMessage="text-[#99AAB5]"
                />
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Request;
