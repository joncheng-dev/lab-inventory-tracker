import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.tsx";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { eTargetType } from "./Types/index.tsx";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function SignIn() {
  // state variables with useState hooks
  const [createAccountSuccess, setCreateAccountSuccess] = useState<string | null>(null);
  const [signInSuccess, setSignInSuccess] = useState<string | null>(null);
  const [signOutSuccess, setSignOutSuccess] = useState<string | null>(null);
  // redirects
  const navigate = useNavigate();
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
        navigate("/");
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
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={doCreateAccount}
      >
        <Grid container spacing={2}>
          <Grid>
            <TextField type="text" name="email" label="Email" variant="filled" required />
            <TextField type="password" name="password" label="Password" required />
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={2} direction="row">
              <Button variant="outlined" type="submit">
                Create Account
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <h1>Sign In</h1>
      {signInSuccess}
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={doSignIn}
      >
        <Grid container spacing={2}>
          <Grid>
            <TextField type="text" name="email" label="Email" variant="filled" required />
            <TextField type="password" name="password" label="Password" required />
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={2} direction="row">
              <Button variant="contained" type="submit">
                Sign In
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <h1>Sign Out</h1>
      {signOutSuccess}
      <br />
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={doSignOut}>
          Sign Out
        </Button>
      </Stack>
    </React.Fragment>
  );
}

export default SignIn;

// <form onSubmit={doCreateAccount}>
//   <input type="text" name="email" placeholder="email" />
//   <input type="password" name="password" placeholder="password" />
//   <button type="submit">Create Account</button>
// </form>;

// <form onSubmit={doSignIn}>
//   <input type="text" name="email" placeholder="email" />
//   <input type="password" name="password" placeholder="password" />
//   <button type="submit">Sign In</button>
// </form>;

// <Box
//   component="form"
//   sx={{
//     "& .MuiTextField-root": { m: 1, width: "25ch" },
//   }}
//   noValidate
//   autoComplete="off"
// >
//   <div>
//     <TextField required id="filled-required" label="Email" defaultValue="" variant="filled" />
//     <TextField required id="filled-required" label="Password" type="password" defaultValue="" />
//     <TextField id="filled-password-input" label="Password" type="password" />
//   </div>
// </Box>;
