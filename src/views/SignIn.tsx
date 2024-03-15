import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { sharedInfo } from "../helpers/UserContext.tsx";
import { eTargetType } from "../types/index.tsx";
import { tokens } from "../themes.tsx";
import { useTheme } from "@mui/material";
import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { doCreateAccount } from "../hooks/authUtil.tsx";
import { flexbox } from "@mui/system";

//#region style
const LoginPaper = styled(Paper)(({ theme }) => ({
  elevation: "3",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "50vh",
  width: "30vw",
  padding: "20px",
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

  async function handleCreateAccount(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & eTargetType;
    const email = target.email.value;
    const password = target.password.value;

    try {
      const userCredential = await doCreateAccount(email, password);
      setCreateAccountSuccess(`Account creation successful: ${userCredential.user.email}.`);
    } catch (error: any) {
      setCreateAccountSuccess(`Error creating account: ${error.message}`);
    }
  }

  const handleSignIn = async (props: SignInForm) => {
    const { email, password } = props;
    try {
      userProvider?.signIn(email, password);
      // setSignInSuccess(true);
    } catch (error) {
      console.log("Error signing in user");
      // setSignInSuccess(false);
    }
  };

  // function handleSignIn(props: SignInForm) {
  //   // console.log("1a. SignIn, handleSignIn started, props: ", props);
  //   const { email, password } = props;
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       console.log("User credential: ", userCredential);
  //       console.log("signInWithEmailAndPassword, userCredential.user.email: ", userCredential.user.email);
  //       setSignInSuccess(true);
  //       // navigate("/inventory");
  //     })
  //     .catch((error: any) => {
  //       console.error("Sign-in error: ", error);
  //       setSignInSuccess(false);
  //     });
  // }

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
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <LoginPaper>
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
                <Grid container justifyContent="center" pt={3}>
                  <Typography component="h1" variant="h3">
                    Log In
                  </Typography>
                </Grid>
                <Grid container p={2} pt={0.5} sx={{ marginTop: 2, marginBottom: 2 }}>
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
                    <Grid item xs={12} p={2} justifyContent="center">
                      <Typography variant="h5">DEMO ACCOUNTS</Typography>
                    </Grid>
                    <Grid container item xs={12}>
                      <Grid item xs={6} justifyContent="center" p={0.5}>
                        <TesterLoginButton email="testing@123.com" acctType="admin" password="testing123" />
                      </Grid>
                      <Grid item xs={6} justifyContent="center" p={0.5}>
                        <TesterLoginButton email="testing@456.com" acctType="standard" password="testing456" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </LoginPaper>
      </Box>
    </>
  );
}
