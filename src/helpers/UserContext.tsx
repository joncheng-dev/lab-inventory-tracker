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
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);

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
