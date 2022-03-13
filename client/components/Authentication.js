import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Modal from "react-modal";
import Login from "./Login";
import Register from "./Register";

export default function Authentication() {
  const [error, setError] = useState("");
  const {
    loggedUser,
    logout,
    modalIsOpen,
    isLoginModal,
    openModal,
    closeModal,
  } = useAuth();

  Modal.setAppElement(document.querySelector("#App"));

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
    } catch (err) {
      setError(err.message);
    }
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 20,
  };

  if (loggedUser) {
    return (
      <div className="flex w-full items-center justify-end md:justify-center">
        <button
          onClick={handleLogout}
          className="px-4 py-1 bg-rose-500 rounded-md font-bold text-xs text-indigo-50 hover:text-indigo-50/70 hover:bg-rose-500/70 transition-all"
        >
          Logout
        </button>
        {error && <div>{error}</div>}
      </div>
    );
  }
  return (
    <>
      <div className="flex w-full items-center justify-end md:justify-center">
        <button
          onClick={openModal}
          className="px-4 py-1 bg-indigo-500 rounded-md font-bold text-xs text-indigo-50 hover:text-indigo-50/70 hover:bg-indigo-500/70 transition-all"
        >
          Login
        </button>
      </div>

      {/* MODAL */}
      <Modal
        style={{ overlay: overlayStyle }}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="absolute bg-secondary top-[10%] bottom-[10%] left-[15%] right-[15%] rounded-lg"
      >
        <div className="h-full">{isLoginModal ? <Login /> : <Register />}</div>
      </Modal>
    </>
  );
}
