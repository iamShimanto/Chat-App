import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GroupItems = ({ data }) => {
  const db = getDatabase();
  const [add, setAdd] = useState(false);
  const [users, setUsers] = useState([]);
  const userInfo = useSelector((state) => state.userData.user);

  useEffect(() => {
    onValue(ref(db, "users"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userInfo.uid !== item.key) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUsers(arr);
    });
  }, []);
    
    const handleAdd = (item) => {
        console.log(item)
    }

  return (
    <>
      <div className="relative">
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
                # {data.groupName}
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
            <div className="overflow-y-auto h-90 w-full p-5">
              {users.map((item) => (
                <div
                  className="flex justify-between items-center text-xl font-bold text-white border border-primary my-1 px-3 py-2 rounded-lg"
                  key={item.id}
                >
                  {item.username}{" "}
                  <span onClick={()=> handleAdd(item)} className="px-4 py-2 bg-brand text-primary rounded-lg cursor-pointer hover:text-brand hover:bg-primary duration-300">
                    Add
                  </span>{" "}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GroupItems;
