import React from "react";

const UserList = ({ data }) => {
  return (
    <>
      <div
        className={` flex justify-between items-center p-3 rounded-sm bg-slate-100 hover:scale-105 hover:shadow-sm duration-300 mb-1 add`}
      >
        <div className="profile flex gap-4">
          <div className="flex items-center gap-1">
            <img
              className="w-10 h-10 rounded-full"
              src={data.profile_picture}
              alt="profile"
            />
            <h4 className={`text-lg font-semibold cursor-pointer`}>
              {data.username}
            </h4>
          </div>
        </div>
        <button className="add px-3 py-1.5 cursor-pointer !rounded-lg">
          Add
        </button>
      </div>
    </>
  );
};

export default UserList;
