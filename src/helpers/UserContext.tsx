// TSX VERSION
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  name: string;
  email: string;
}

export const UserContext = React.createContext<UserInfo | null>(null);

export const UserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  // const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated. If logged in, to inventory. If not, to sign in
    const checkAuth = async () => {
      try {
        if (auth.currentUser) {
          const userRef = doc(db, "users", auth.currentUser.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const userInfo = docSnap.data() as UserInfo;
            setCurrentUser(userInfo);
            // navigate("/inventory");
          } else {
            console.log("No such user in database. (User collections does not contain a user document with this id.)");
          }
        }
        // else if (localStorage !== null) {
        //   navigate("/inventory");
        // } else {
        //   navigate("/signin");
        // }
      } catch (error) {
        console.error("Error retrieving user info:", error);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    console.log("UserProvider, currentUser: ", currentUser);
  }, [currentUser]);

  return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
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
