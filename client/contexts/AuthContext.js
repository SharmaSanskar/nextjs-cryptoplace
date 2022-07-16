import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebaseClient";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(true);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsLoginModal(true);
  };

  const register = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  // REDIS watchlist
  const getUserwatchlist = async () => {
    if (loggedUser) {
      try {
        const params = new URLSearchParams({ q: loggedUser.uid });
        const res = await axios.get("/api/userwatchlist?" + params);
        const { userwatchlist } = res.data;
        if (userwatchlist.watch) {
          setWatchlist(userwatchlist.watch);
        }
        return userwatchlist;
      } catch (err) {
        console.log(err);
      }
    }
  };

  const addtoWatchList = async (uuid) => {
    try {
      const data = { userId: loggedUser.uid, crypto: uuid };

      const res = await axios.post("/api/users", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Update watchlist data
      await getUserwatchlist();

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromWatchList = async (uuid) => {
    try {
      const data = { userId: loggedUser.uid, crypto: uuid };

      const res = await axios.post("/api/removewatch", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Update watchlist data
      await getUserwatchlist();

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoggedUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    loggedUser,
    register,
    login,
    logout,
    modalIsOpen,
    setModalIsOpen,
    isLoginModal,
    setIsLoginModal,
    openModal,
    closeModal,
    setWatchlist,
    watchlist,
    getUserwatchlist,
    addtoWatchList,
    removeFromWatchList,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
