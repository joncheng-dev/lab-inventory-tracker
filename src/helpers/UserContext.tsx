// TSX VERSION
import React, { createContext, useContext, useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { UserCredential, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

interface UserInfo {
  email: string;
  isAdmin: boolean;
}

type SignInForm = {
  email: string;
  password: string;
};

interface AuthContextValue {
  signIn: (email: string, password: string) => void;
  signOutUser: () => void;
  currentUser: UserInfo | null;
}

const UserContext = createContext<AuthContextValue | null>(null);

export const sharedInfo = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  // console.log("UserProvider, user -> useAuthState(auth): ", user);

  // useEffect(() => {
  //   // console.log("here");
  //   setCurrentUser({
  //     email: "testing@123.com",
  //     isAdmin: true,
  //   });
  //   if (user) {
  //     const fetchUserInfo = async () => {
  //       const userRef = doc(db, "users", user.uid);
  //       const docSnap = await getDoc(userRef);
  //       if (docSnap.exists()) {
  //         console.log("3a. UserContext, user successfully retrieved, docSnap.data(): ", docSnap.data());
  //         const userInfo = docSnap.data() as UserInfo;
  //         console.log("userInfo: ", userInfo);
  //         setCurrentUser(userInfo);
  //         // console.log("3a. UserContext, user successfully retrieved, userInfo: ", userInfo);
  //       } else {
  //         console.log("No such user in database.");
  //       }
  //     };
  //     fetchUserInfo();
  //   } else {
  //     // console.log("3b. UserContext, user not successfully retrieved (User not authenticated.)");
  //     console.log("User not authenticated.");
  //   }
  // }, [user]);

  const signIn = async (email: string, password: string) => {
    // console.log("1a. SignIn, handleSignIn started, props: ", props);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential: UserCredential) => {
        console.log("User credential: ", userCredential);
        console.log("signInWithEmailAndPassword, userCredential.user.email: ", userCredential.user.email);
        const userRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          console.log("signIn, docSnap.data()", docSnap.data());
          const relevantUserInfo: UserInfo = {
            email: docSnap.data().email,
            isAdmin: docSnap.data().isAdmin,
          };
          setCurrentUser(relevantUserInfo);
        }
      })
      .catch((error: any) => {
        console.error("Sign-in error: ", error);
      });
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.log("Unable to log out current user.");
    }
  };

  const contextValue: AuthContextValue = {
    signIn,
    signOutUser,
    currentUser,
  };

  console.log("UserContext currentUser: ", currentUser);
  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

// TSX VERSION
// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebase.js";
// import { doc, getDoc } from "firebase/firestore";
// import { UserEntry } from "../types/index";
// import { useNavigate } from "react-router-dom";
// import useLocalStorage, { useLocalStorageProps } from "../hooks/useLocalStorage.js";

// // type ContextType = { currentUser: useLocalStorageProps | null };

// export const UserContext = React.createContext(undefined);

// export const UserProvider = ({ children }: any) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the user is authenticated. If logged in, to inventory. If not, to sign in
//     const checkAuth = async () => {
//       try {
//         if (auth.currentUser) {
//           const userRef = doc(db, "users", auth.currentUser.uid);
//           const docSnap = await getDoc(userRef);
//           if (docSnap.exists()) {
//             const userInfo = docSnap.data();
//             setCurrentUser(userInfo);
//             // setCurrentUser({ key: "currentUser", objectToStore: userInfo });
//             navigate("/inventory");
//           } else {
//             console.log("No such user in database. (User collections does not contain a user document with this id.)");
//           }
//         } else if (localStorage !== null) {
//           navigate("/inventory");
//         } else {
//           navigate("/signin");
//         }
//       } catch (error) {
//         console.error("Error retrieving user info:", error);
//       }
//     };
//     checkAuth();
//   }, []);

//   return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
// };

// useEffect(() => {
//   // Check if the user is authenticated. If logged in, to inventory. If not, to sign in
//   checkAuth();
// }, []);

// const checkAuth = async () => {
//   const auth = getAuth();
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       setCurrentUser(user);
//     } else {
//       console.log("What.");
//     }
//   });
//   // previous checkAuth function contents go here.
// };

// try {
//   if (auth.currentUser) {
//     const userRef = doc(db, "users", auth.currentUser.uid);
//     const docSnap = await getDoc(userRef);
//     if (docSnap.exists()) {
//       const userInfo = docSnap.data() as UserInfo;
//       setCurrentUser(userInfo);
//       // navigate("/inventory");
//     } else {
//       console.log("No such user in database. (User collections does not contain a user document with this id.)");
//     }
//   }
//   // else if (localStorage !== null) {
//   //   navigate("/inventory");
//   // } else {
//   //   navigate("/signin");
//   // }
// } catch (error) {
//   console.error("Error retrieving user info:", error);
// }
