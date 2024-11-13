import React, { useState } from "react";
import styles from "../css/Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { Modal } from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { clearUser } from "../store/slices/userSlice";

export const Navbar: React.FC = () => {
  const [isOpenModal, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <nav className={styles.container}>
      <h1 className={styles.h1} onClick={() => navigate("/")}>
        Digital Geeks
      </h1>
      {user ? (
        <button className={styles.signInBtn} onClick={handleLogoutClick}>
          Log out
        </button>
      ) : (
        <button className={styles.signInBtn} onClick={handleSignInClick}>
          Sign in
        </button>
      )}
      <Modal isOpen={isOpenModal} onClose={() => setIsModalOpen(false)}>
        <LoginForm />
      </Modal>
    </nav>
  );
};
