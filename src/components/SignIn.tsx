import React, { useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

function SignIn() {
  // state variables with useState hooks
  const [createAccountSuccess, setCreateAccountSuccess] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);

  // functions
  function doCreateAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // user successfully creates account
        setCreateAccountSuccess(`Account creation successful: ${userCredential.user.email}.`);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          userEmail: email,
          userId: userCredential.user.uid,
          itemsCheckedOut: {},
        });
      })
      .catch((error) => {
        // error with creating account
        setCreateAccountSuccess(`Error creating account: ${error.message}`);
      });
  }

  function doSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
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
        <input type="text" name="signinEmail" placeholder="email" />
        <input type="password" name="signinPassword" placeholder="password" />
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
