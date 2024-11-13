import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/slices/userSlice";
import { Navbar } from "./Navbar";
import { RootState } from "../store/store";
import stylesLogin from "../css/Login.module.css";
import { toast } from "react-toastify";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?username=${username}`
      );
      if (!response.ok) {
        throw new Error("An error occurred while signing in");
      }
      const data = await response.json();

      if (data.length > 0 && data[0].username === username) {
        dispatch(setUser(data[0]));
        navigate("/");
        toast.success("Successfully signed in");
      } else {
        toast.error("User not found");
        setUsername("");
      }
    } catch (error) {
      toast.error("An error occurred while signing in");
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    dispatch(setUser(null));
  };

  return (
    <>
      <Navbar />
      <div className={stylesLogin.loginContainer}>
        <div className={stylesLogin.loginContent}>
          {user ? (
            <button className={stylesLogin.submitBtn} onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className={stylesLogin.title}>Sign In</h2>
              <div className={stylesLogin.inputContainer}>
                <input
                  className={stylesLogin.input}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                />
                <button className={stylesLogin.submitBtn} type="submit">
                  Sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
