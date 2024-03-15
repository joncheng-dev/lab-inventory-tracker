// authUtils.ts

import { db, auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export async function doCreateAccount(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCredential.user.uid), {
      userEmail: email,
      userId: userCredential.user.uid,
    });
    return userCredential;
  } catch (error: any) {
    console.error("Error creating account:", error.message);
    throw new Error(`Error creating account: ${error.message}`);
  }
}

export async function doSignOut() {
  try {
    await signOut(auth);
    console.log("Sign-out successful");
  } catch (error: any) {
    console.error("Sign-out error: ", error);
    throw new Error(`Error signing out: ${error.message}`);
  }
}
