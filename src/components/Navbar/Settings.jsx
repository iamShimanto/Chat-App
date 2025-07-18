import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { MdOutlinePerson3 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { FaEdit } from "react-icons/fa";
import {
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { loggedUser } from "../../store/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import { EmailAuthProvider } from "firebase/auth/web-extension";

const Settings = () => {
  const userInfo = useSelector((state) => state.userData.user);
  const db = getDatabase();
  const auth = getAuth();
  const updateProfileRef = useRef(null);
  const updatePassRef = useRef(null);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [time, setTime] = useState(new Date());
  const [editable, setEditable] = useState(false);
  const [editablePass, setEditablePass] = useState(false);
  const [usernameUpdate, setUsernameUpdate] = useState(false);
  const [updataData, setUpdataData] = useState({
    avater: "",
    username: "",
  });
  const [friendList, setFriendList] = useState([]);
  const [newPass, setNewPass] = useState("");
  const [oldPass, setOldPass] = useState("");

  // ============== friend list data
  useEffect(() => {
    onValue(ref(db, "friendList"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setFriendList(arr);
    });
  }, []);

  // ============== outside click event
  window.addEventListener("mousedown", (e) => {
    if (
      updateProfileRef.current &&
      !updateProfileRef.current.contains(e.target)
    ) {
      setEditable(false);
    }
  });
  window.addEventListener("mousedown", (e) => {
    if (updatePassRef.current && !updatePassRef.current.contains(e.target)) {
      setEditablePass(false);
    }
  });

  // ============== time
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ============== database write data
  useEffect(() => {
    const starCountRef = ref(db, "users/" + userInfo.uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
    });
  }, []);

  // ==================  update profile
  const handleUpdate = () => {
    updateProfile(auth.currentUser, {
      displayName: updataData.username || auth.currentUser.displayName,
      photoURL: updataData.avater || auth.currentUser.photoURL,
    })
      .then(() => {
        const updatedUsername =
          updataData.username || auth.currentUser.displayName;
        const updatedAvater = updataData.avater || auth.currentUser.photoURL;

        update(ref(db, "users/" + userInfo.uid), {
          username: updatedUsername,
          profile_picture: updatedAvater,
        });
        dispatch(loggedUser(auth.currentUser));

        friendList.forEach((item) => {
          const itemRef = ref(db, "friendList/" + item.id);
          if (item.creatorId === userInfo.uid) {
            update(itemRef, {
              creatorName: updatedUsername,
              creatorAvater: updatedAvater,
            });
          } else if (item.participantId === userInfo.uid) {
            update(itemRef, {
              participantName: updatedUsername,
              participantAvater: updatedAvater,
            });
          }
        });

        setEditable(false);
        setUsernameUpdate(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ============ change password

  const handleChangePass = () => {
    const user = auth.currentUser;

    if (!oldPass || !newPass) {
      toast.error("Please fill in both old and new password fields.");
      return;
    }

    if (oldPass.length < 6) {
      toast.error("Old password must be at least 6 characters long.");
      return;
    }
    if (newPass.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, oldPass);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        return updatePassword(user, newPass);
      })
      .then(() => {
        toast.success("✅ Password updated successfully!");
        setNewPass("");
        setOldPass("");
        setEditablePass(false);
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/invalid-credential") {
          toast.error("❌ Old password is incorrect.");
        } else if (errorCode === "auth/weak-password") {
          toast.error("❌ New password must be at least 6 characters.");
        } else if (errorCode === "auth/too-many-requests") {
          toast.error("⚠️ Too many failed attempts. Try again later.");
        } else if (errorCode === "auth/requires-recent-login") {
          toast.error("⚠️ Please log in again to change your password.");
        } else {
          toast.error("❌ " + error.message);
        }
      });
  };

  // ============ change password

  return (
    <>
      <div className=" pt-5 h-[calc(100vh-70px)] lg:h-screen w-full lg:min-w-96 lg:w-96 bg-[#262e35] p-4 relative">
        <ToastContainer position="top-right" autoClose={3000} />
        <h2 className="text-2xl text-primary font-semibold">Settings</h2>
        <div className="img flex justify-center my-10">
          <img
            className="w-20 h-20 rounded-full"
            src={userData.profile_picture}
            alt="profile_photo"
          />
        </div>
        <div className="username text-center">
          <h4 className="text-primary text-xl font-semibold">
            {userData.username}
          </h4>
          <p className="text-secondary flex justify-center items-center text-base font-medium leading-8 pb-10 border-b border-[rgba(255,255,255,0.26)]">
            <GoDotFill className="text-green-500" />
            Active
          </p>
        </div>
        <div className="flex items-center mt-10 text-primary gap-3 text-xl font-semibold">
          <MdOutlinePerson3 />
          Personal Info
        </div>
        <div className="name mt-5 ml-3">
          <p className="text-base font-medium text-secondary leading-8">Name</p>
          <p className="text-lg font-semibold text-primary leading-8 flex gap-1">
            {userData.username}
            <FaEdit
              onClick={() => {
                setEditable(true), setUsernameUpdate(true);
              }}
              className="text-2xl text-primary cursor-pointer hover:text-brand"
            />
          </p>
        </div>
        <div className="email mt-5 ml-3">
          <p className="text-base font-medium text-secondary leading-8">
            Email
          </p>
          <p className="text-lg font-semibold text-primary leading-8">
            {userData.email}
          </p>
        </div>
        <div className="time mt-5 ml-3">
          <p className="text-base font-medium text-secondary leading-8">Time</p>
          <p className="text-lg font-semibold text-primary leading-8">
            {time.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: true,
            })}
          </p>
        </div>
        <div className="location mt-5 ml-3 hidden lg:block">
          <p className="text-base font-medium text-secondary leading-8">
            Location
          </p>
          <p className="text-lg font-semibold text-primary leading-8">
            {userData.location}
          </p>
        </div>
        <div className="ChangePass mt-5 ml-3">
          <p className="text-base font-medium text-secondary leading-8">Name</p>
          <p className="text-lg font-semibold text-primary leading-8 flex gap-1">
            Change Password
            <FaEdit
              onClick={() => {
                setEditablePass(true);
              }}
              className="text-2xl text-primary cursor-pointer hover:text-brand"
            />
          </p>
        </div>
        {editable && (
          <div
            className="bg-[rgba(13,17,20,0.9)] absolute top-5/10 left-5/10 -translate-5/10 p-10 rounded-2xl"
            ref={updateProfileRef}
          >
            <div className=" flex flex-col items-center w-77 h-60 p-10 rounded">
              {usernameUpdate && (
                <input
                  onChange={(e) =>
                    setUpdataData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Edit Your Name"
                  className={`w-full pl-10 pr-4 py-4 bg-[#1E2124] border-2  "border-[#2C2F33]"
              rounded-lg text-white placeholder-[#99AAB5] focus:outline-none focus:border-[#7289DA] transition-all hover:border-[#7289DA]`}
                />
              )}
              <div className="flex gap-5 justify-center mt-10">
                <button
                  onClick={handleUpdate}
                  className="py-2 px-3 bg-green-500 hover:bg-green-600 duration-300 rounded text-white cursor-pointer"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditable(false)}
                  className="py-2 px-3 bg-red-500 hover:bg-red-600 duration-300 rounded text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {editablePass && (
          <div
            className="bg-[rgba(13,17,20,0.9)] absolute top-7/10 left-5/10 -translate-5/10 p-10 rounded-2xl"
            ref={updatePassRef}
          >
            <div className=" flex flex-col items-center w-77 h-60 p-10 rounded">
              <input
                onChange={(e) => setOldPass(e.target.value)}
                value={oldPass}
                type="password"
                placeholder="Edit Your Old Password"
                className={`w-full pl-5.5 pr-4 py-4 bg-[#1E2124] border-2  "border-[#2C2F33]"
              rounded-lg text-white placeholder-[#99AAB5] focus:outline-none focus:border-[#7289DA] transition-all hover:border-[#7289DA]`}
              />
              <br />
              <input
                onChange={(e) => setNewPass(e.target.value)}
                value={newPass}
                type="password"
                placeholder="Edit Your New Password"
                className={`w-full pl-5.5 pr-4 py-4 bg-[#1E2124] border-2  "border-[#2C2F33]"
              rounded-lg text-white placeholder-[#99AAB5] focus:outline-none focus:border-[#7289DA] transition-all hover:border-[#7289DA]`}
              />

              <div className="flex gap-5 justify-center mt-10">
                <button
                  onClick={handleChangePass}
                  className="py-2 px-3 bg-green-500 hover:bg-green-600 duration-300 rounded text-white cursor-pointer"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditablePass(false)}
                  className="py-2 px-3 bg-red-500 hover:bg-red-600 duration-300 rounded text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Settings;
