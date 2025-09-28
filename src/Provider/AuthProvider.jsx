import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/Firebase.config";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const axiosPublic = UseAxiosPublic();

  // Create a new user
  const createUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in with email and password
  const signInUser = async (email, password) => {
    setLoader(true);
    const result = await signInWithEmailAndPassword(auth, email, password);

    // Immediately request JWT for this user
    const tokenRes = await axiosPublic.post("/jwt", { email: result.user.email });
    if (tokenRes.data?.token) {
      localStorage.setItem("access-token", tokenRes.data.token);
    }

    setUser(result.user);
    setLoader(false);
    return result;
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoader(true);
    const result = await signInWithPopup(auth, provider);

    // Immediately request JWT for this user
    const tokenRes = await axiosPublic.post("/jwt", { email: result.user.email });
    if (tokenRes.data?.token) {
      localStorage.setItem("access-token", tokenRes.data.token);
    }

    setUser(result.user);
    setLoader(false);
    return result;
  };

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
      if (!currentUser) localStorage.removeItem("access-token");
    });
    return () => unsubscribe();
  }, []);

  // Logout
  const logOut = async () => {
    setLoader(true);
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("access-token");
    setLoader(false);
  };

  const authInfo = {
    createUser,
    signInUser,
    signInWithGoogle,
    user,
    loader,
    logOut
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
