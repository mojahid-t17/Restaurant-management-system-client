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
const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loader,setLoader]=useState(true);
  const axiosPublic=UseAxiosPublic();
  // create an user
  const createUser = (email, password) => {
    setLoader(true)
 
    return createUserWithEmailAndPassword(auth , email, password);
  };
  // signinwith email and password
  const signInUser = (email, password) => {
    setLoader(true)
    return signInWithEmailAndPassword(auth, email, password);
  };
 //  signIn with gogle
  const signInwithGogle=()=>{
    setLoader(true)
     return signInWithPopup(auth,provider)
  }

  // load the current logged in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
       if(currentUser){
        const userInfo={email: currentUser.email};
        // console.log(userInfo)
           axiosPublic.post('/jwt',userInfo)
           .then((res)=>{
            if(res.data.token){
                localStorage.setItem('access-token',res.data.token)
            }
            
              
           })
       }
       else{
             localStorage.removeItem('access-token')
       }
      setLoader(false)
      // console.log(currentUser);
    });
    return () => unsubscribe();
  }, [axiosPublic]);
  

  //   signout method
  const logOut = () => {
    setLoader(true)
    signOut(auth)
    .then(console.log("logged out successfully"));
  };

  const authInfo = {
    createUser,
    signInUser,
    user,
    logOut,
    loader,
    signInwithGogle,
    
  };
    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;