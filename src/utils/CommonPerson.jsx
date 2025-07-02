import { getDatabase, push, ref, remove, set } from "firebase/database";
import React from "react";
import { BsSave2 } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

const CommonPerson = ({
  avater,
  name,
  styling = "bg-white",
  stylingName = "text-black22",
  // stylingMessage = "[#7A7A7A]",
  reqData,
  sentData,
}) => {
  const db = getDatabase();
  console.log();
  const handleRemove = (data) => {
    remove(ref(db, "requestList/" + data.id));
  };

  // ================= add to friendList and remove in requestlist
  const handleAdd = (item) => {
    set(push(ref(db, "friendList/")), {
      creatorName: item.creatorName,
      creatorAvater: item.creatorAvater,
      creatorId: item.creatorId,
      creatorEmail: item.creatorEmail,
      participantName: item.participantName,
      participantAvater: item.participantAvater,
      participantId: item.participantId,
      participantEmail: item.participantEmail,
    });
    setTimeout(() => {
      remove(ref(db, "requestList/" + item.id));
    }, 1000);
  };

  return (
    <>
      <div
        className={`${styling} flex justify-between p-3 rounded-sm cursor-pointer hover:scale-105 hover:shadow-sm duration-300 mb-1 bg-[#262e35]`}
      >
        <div className="profile flex gap-4">
          <img className="w-12 h-12 rounded-full" src={avater} alt="logo" />
          <h4
            className={`${stylingName} text-lg font-semibold font-inter my-auto`}
          >
            {name}
          </h4>
        </div>

        {reqData ? (
          <div className="flex items-center gap-2">
            <div
              onClick={() => handleAdd(reqData)}
              className="accept text-white px-4 py-2 bg-black rounded-lg hover:bg-green-600"
            >
              <BsSave2 />
            </div>
            <div
              onClick={() => handleRemove(reqData)}
              className="cencel text-white px-4 py-2 bg-black rounded-lg hover:bg-red-600"
            >
              <MdCancel />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div
              onClick={() => handleRemove(sentData)}
              className="cencel text-white px-4 py-2 bg-black rounded-lg hover:bg-red-600"
            >
              <MdCancel />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommonPerson;
