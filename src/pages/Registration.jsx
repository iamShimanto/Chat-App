import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { getDatabase, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const Registration = () => {
  const [isOpen, setIsOpen] = useState(true);
  const userInfo = useSelector((state) => state.userData.user);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: userData.username,
          photoURL: "images/default.png",
        }).then(() => {
          sendEmailVerification(auth.currentUser).then(() => {
            toast.success("Registration Successful, Please verify Your Email!");
            setTimeout(() => {
              navigate("/signin");
            }, 2000);
            set(ref(db, "users/" + auth.currentUser.uid), {
              username: auth.currentUser.displayName,
              email: auth.currentUser.email,
              profile_picture: auth.currentUser.photoURL,
            });
          });
        });
      })
      .catch((error) => {
        const errorMessage = error.code;
        console.log(errorMessage);
        if (errorMessage === "auth/missing-email") {
          toast.error("Please Enter Your Email!");
        }
        if (errorMessage === "auth/invalid-email") {
          toast.error("Please Enter a valid Email!");
        }
        if (errorMessage === "auth/email-already-in-use") {
          toast.error("Email is already exist!");
        }
        if (errorMessage === "auth/missing-password") {
          toast.error("Please Enter Your Password!");
        }
        if (errorMessage === "auth/weak-password") {
          toast.error("Password need at least 6 characters!");
        }
      });
  };

  if (userInfo) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#0F1012] px-4">
        <ToastContainer position="top-right" autoClose={5000} />
        <div className="bg-[#16181C] p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-[#7289DA] mb-2">
              Create Account
            </h2>
            <p className="text-[#99AAB5]">Join our community today!</p>
          </div>
          <form className="space-y-6">
            <div className="relative group">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#99AAB5] group-hover:text-[#7289DA] transition-colors" />
              <input
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, username: e.target.value }))
                }
                type="text"
                name="username"
                placeholder="Username"
                className={`w-full pl-10 pr-4 py-4 bg-[#1E2124] border-2  "border-[#2C2F33]"
               rounded-lg text-white placeholder-[#99AAB5] focus:outline-none focus:border-[#7289DA] transition-all hover:border-[#7289DA]`}
              />
            </div>

            <div className="relative group">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#99AAB5] group-hover:text-[#7289DA] transition-colors" />
              <input
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
                type="email"
                name="email"
                placeholder="Email Address"
                className={`w-full pl-10 pr-4 py-4 bg-[#1E2124] border-2 border-[#2C2F33] rounded-lg text-white placeholder-[#99AAB5] focus:outline-none focus:border-[#7289DA] transition-all hover:border-[#7289DA]`}
              />
            </div>

            <div className="relative group">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#99AAB5] group-hover:text-[#7289DA] transition-colors" />
              <div>
                <input
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  type={isOpen ? "password" : "text"}
                  name="password"
                  placeholder="Password"
                  className={`w-full pl-10 pr-4 py-4 bg-[#1E2124] border-2  "border-[#2C2F33]" rounded-lg text-white placeholder-[#99AAB5] focus:outline-none focus:border-[#7289DA] transition-all hover:border-[#7289DA]`}
                />
                {isOpen ? (
                  <IoIosEyeOff
                    className="text-[#99AAB5] text-2xl absolute top-5 right-5 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  />
                ) : (
                  <IoIosEye
                    className="text-[#99AAB5] text-2xl absolute top-5 right-5 cursor-pointer"
                    onClick={() => setIsOpen(true)}
                  />
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full py-4 bg-[#7289DA] text-white rounded-lg font-semibold hover:bg-[#5869a6] transform transition-all hover:scale-[1.02] focus:scale-[0.98] active:scale-[0.98] cursor-pointer"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#99AAB5]">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-[#7289DA] hover:text-[#5869a6] font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
