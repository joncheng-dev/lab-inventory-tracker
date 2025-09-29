import { createContext, useContext, useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserCredential, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

interface UserInfo {
  uid: string;
  email: string | null;
  isAdmin: boolean;
}

interface AuthContextValue {
  googleSignIn: () => void;
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
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // use this info to check in user collection. does user doc 'uid' exist?
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const relevantUserInfo: UserInfo = {
          uid: user.uid,
          email: user.email,
          isAdmin: docSnap.data().isAdmin,
        };
        setCurrentUser(relevantUserInfo);
      } else {
        await setDoc(userRef, {
          email: user.email,
          isAdmin: true,
        });
        const newUser: UserInfo = {
          uid: user.uid,
          email: user.email,
          isAdmin: true,
        };
        setCurrentUser(newUser);
      }
    } catch (error) {
      console.log("Google Sign-In error: ", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential: UserCredential) => {
        const userRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const relevantUserInfo: UserInfo = {
            uid: userCredential.user.uid,
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
    googleSignIn,
    signIn,
    signOutUser,
    currentUser,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
