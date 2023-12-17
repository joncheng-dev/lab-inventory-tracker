import React, { useState } from "react";
import { auth, db } from "../firebase.tsx";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { eTargetType } from "./Types/index.tsx";

function SignIn() {
  // state variables with useState hooks
  const [createAccountSuccess, setCreateAccountSuccess] = useState<string | null>(null);
  const [signInSuccess, setSignInSuccess] = useState<string | null>(null);
  const [signOutSuccess, setSignOutSuccess] = useState<string | null>(null);

  // functions
  function doCreateAccount(e: React.SyntheticEvent) {
    e.preventDefault();

    // Typing form values
    const target = e.target as typeof e.target & eTargetType;
    const email = target.email.value;
    const password = target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // user successfully creates account
        setCreateAccountSuccess(`Account creation successful: ${userCredential.user.email}.`);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          userEmail: email,
          userId: userCredential.user.uid,
        });
      })
      .catch((error) => {
        // error with creating account
        setCreateAccountSuccess(`Error creating account: ${error.message}`);
      });
  }

  function doSignIn(e: React.SyntheticEvent) {
    e.preventDefault();

    // Typing form values
    const target = e.target as typeof e.target & eTargetType;
    const email = target.email.value;
    const password = target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`You've signed in as: ${userCredential.user.email}`);
        console.log(`Signed in.`);
        console.log(`Current user is: ${userCredential.user.email}`);
        console.log(`Current user Id is: ${userCredential.user.uid}`);
      })
      .catch((error) => {
        setSignInSuccess(`There was an error with sign-in: ${error.message}`);
      });
  }

  function doSignOut() {
    signOut(auth)
      .then(() => {
        setSignInSuccess("You've signed out.");
      })
      .catch((error) => {
        setSignOutSuccess(`There was an error with sign-out: ${error.message}`);
      });
  }

  // conditional rendering
  return (
    <React.Fragment>
      <h1>Create an Account</h1>
      {createAccountSuccess}
      <form onSubmit={doCreateAccount}>
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Create Account</button>
      </form>
      <h1>Sign In</h1>
      {signInSuccess}
      <form onSubmit={doSignIn}>
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Sign In</button>
      </form>
      <h1>Sign Out</h1>
      {signOutSuccess}
      <br />
      <button onClick={doSignOut}>Sign Out</button>
    </React.Fragment>
  );
}

export default SignIn;
