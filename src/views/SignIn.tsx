import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { sharedInfo } from "../helpers/UserContext.tsx";
import { eTargetType } from "../types/index.tsx";
import { tokens } from "../themes.tsx";
import { useTheme } from "@mui/material";
import { Box, Button, Divider, Grid, Paper, TextField, Typography, useMediaQuery } from "@mui/material";
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { doCreateAccount } from "../hooks/authUtil.tsx";
import { flexbox } from "@mui/system";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase.tsx";

//#region style
const LoginPaper = styled(Paper)(({ theme }) => ({
  elevation: "3",
  padding: "3%",
}));
//#endregion style

type SignInForm = {
  email: string;
  password: string;
};

type TesterLoginButtonProps = {
  email: string;
  acctType: string;
  password: string;
};

// Have this only for the kkfs-lab deployment

// Signing in with Google Auth will..
// 1. if user does not have an account yet, it will create one by adding doc to collection user.
//  email: (string)
//  isAdmin: (bool)
//  userEmail: (string)
//  userId: (string)
// 2. if user already has a doc in collection user, sign in.

export default function SignIn() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const userProvider = sharedInfo();
  // state variables with useState hooks
  const [createAccountSuccess, setCreateAccountSuccess] = useState<string | null>(null);
  // const [signInSuccess, setSignInSuccess] = useState<boolean>(false);
  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(false);
  // redirects
  const navigate = useNavigate();

  useEffect(() => {
    if (userProvider?.currentUser) {
      navigate("/inventory");
    }
  }, [userProvider?.currentUser]);

  // async function handleCreateAccount(e: React.SyntheticEvent) {
  //   e.preventDefault();

  //   const target = e.target as typeof e.target & eTargetType;
  //   const email = target.email.value;
  //   const password = target.password.value;

  //   try {
  //     const userCredential = await doCreateAccount(email, password);
  //     setCreateAccountSuccess(`Account creation successful: ${userCredential.user.email}.`);
  //   } catch (error: any) {
  //     setCreateAccountSuccess(`Error creating account: ${error.message}`);
  //   }
  // }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign-In success: ", user);
    } catch (error) {
      console.log("Google Sign-In error: ", error);
    }
  };

  const handleSignIn = async (props: SignInForm) => {
    const { email, password } = props;
    try {
      userProvider?.signIn(email, password);
    } catch (error) {
      console.log("Error signing in user");
    }
  };

  const TesterLoginButton = (props: TesterLoginButtonProps) => {
    const { email, acctType, password } = props;

    return (
      //prettier-ignore
      <Button
        color="secondary"
        fullWidth
        size="large"
        variant="outlined"
        onClick={() => handleSignIn(props)}
      >
        {acctType}
      </Button>
    );
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
        <Grid container item xs={10} md={6} lg={5} xl={3.5} justifyContent="center">
          <LoginPaper>
            {/* <Typography component="h1" variant="h3">
              Log In
            </Typography>
            <Box mt={3}>
              <button onClick={handleGoogleSignIn}>Sign in with Google</button>
            </Box>             */}
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              // prettier-ignore
              validationSchema={yup.object({
              email: yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: yup.string()
                .min(6, "Must be more than 6 characters")
                .required("Required"),
            })}
              onSubmit={(values) => {
                handleSignIn(values);
              }}
            >
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Grid item display="flex" justifyContent="center" pt={3}>
                    <Typography component="h1" variant="h3">
                      Log In
                    </Typography>
                  </Grid>
                  <Grid container item p={2} pt={0.5} mt={2} mb={2}>
                    <Grid item xs={12} p={2}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        label="Username"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12} p={2} pb={1.5}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        label="Password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        error={!!touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                      />
                    </Grid>
                    <Grid container item xs={12} p={2} pt={3}>
                      <Button type="submit" color="secondary" fullWidth size="large" variant="outlined">
                        Log In
                      </Button>
                      <Grid item xs={12} pt={4} pb={2}>
                        <Divider sx={{ height: "2px", width: "100%", marginRight: "16px" }} />
                      </Grid>
                      <Grid item xs={12} p={2} display="flex" justifyContent="center">
                        <Typography variant="h5">DEMO ACCOUNTS</Typography>
                      </Grid>
                      <Grid container item xs={12} spacing={2}>
                        <Grid item xs={6} md={6} justifyContent="center" p={0.5}>
                          <TesterLoginButton email="testing@123.com" acctType="admin" password="testing123" />
                        </Grid>
                        <Grid item xs={6} md={6} justifyContent="center" p={0.5}>
                          <TesterLoginButton email="testing@456.com" acctType="standard" password="testing456" />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </LoginPaper>
        </Grid>
      </Box>
    </>
  );
}
