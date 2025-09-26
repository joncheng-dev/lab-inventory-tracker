import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { sharedInfo } from "../helpers/UserContext.tsx";
import { eTargetType } from "../types/index.tsx";
import { tokens } from "../themes.tsx";
import { useTheme } from "@mui/material";
import { Box, Button, Divider, Grid, Paper, TextField, Typography, useMediaQuery } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { doCreateAccount } from "../hooks/authUtil.tsx";
import { flexbox } from "@mui/system";
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

export default function SignIn() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const userProvider = sharedInfo();
  const deploymentType = import.meta.env.VITE_REACT_APP_FIREBASE_DEPLOYMENT;
  console.log("modified");
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

  const handleSignIn = async (props: SignInForm) => {
    const { email, password } = props;
    try {
      userProvider?.signIn(email, password);
    } catch (error) {
      console.log("Error signing in user");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      userProvider?.googleSignIn();
    } catch (error) {
      console.log("Error from Sign-In page, Google", error);
    }
  };

  const TesterLoginButton = (props: TesterLoginButtonProps) => {
    const { email, acctType, password } = props;

    return (
      //prettier-ignore
      <Button
        color="secondary"
        fullWidth
        size="medium"
        variant="contained"
        onClick={() => handleSignIn(props)}
      >
        {acctType}
      </Button>
    );
  };

  return (
    <>
      {deploymentType === "kkfs" ? (
        <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
          <LoginPaper>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
              style={{
                height: "50vh",
                width: "30vw",
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h2" mb={10}>
                  Welcome to KKFS Lab Manager
                </Typography>
                <Typography variant="h5" mb={7}>
                  Sign in to continue.
                </Typography>
                <Button type="submit" fullWidth color="primary" variant="contained" onClick={handleGoogleSignIn} startIcon={<GoogleIcon />}>
                  Sign In with Google
                </Button>
              </Grid>
            </Grid>
          </LoginPaper>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
          <Grid container item xs={10} md={6} lg={5} xl={3.5} justifyContent="center">
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
                    <Grid item display="flex" justifyContent="center" pt={3}>
                      <Typography variant="h4">Log In</Typography>
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
                        <Button type="submit" color="primary" fullWidth size="large" variant="contained">
                          Log In
                        </Button>
                        <Grid item xs={12} pt={4} pb={2}>
                          <Divider sx={{ height: "2px", width: "100%", marginRight: "16px" }} />
                        </Grid>
                        <Grid item xs={12} p={2} display="flex" justifyContent="center">
                          <Typography variant="h6">DEMO ACCOUNTS</Typography>
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
      )}
    </>
  );
}

// return (
//   <>
//     <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
//       <Grid container item xs={10} md={6} lg={5} xl={3.5} justifyContent="center">
//         <LoginPaper>
//           {deploymentType === "kkfs" ? (
//             <>
//               <Grid container spacing={2} style={{ height: "70vh" }} display="flex" flex-direction="row" alignContent="center">
//                 <Grid>
//                   <Typography variant="h3" align="center">
//                     Welcome back to KKFS Lab Manager
//                   </Typography>
//                   <Divider />
//                   <Typography align="center">Sign in to continue.</Typography>
//                 </Grid>
//                 <Grid>
//                   <Button type="submit" color="secondary" variant="outlined" onClick={handleGoogleSignIn} startIcon={<GoogleIcon />}>
//                     Sign In with Google
//                   </Button>
//                 </Grid>
//               </Grid>

//               {/* <Grid container>
//                   <Typography variant="h3" align="center" gutterBottom>
//                     Welcome back to KKFS Lab Manager
//                   </Typography>
//                   <Typography align="center" gutterBottom>
//                     Sign in to continue.
//                   </Typography>
//                   <Grid item display="flex" justifyContent="center" pt={3}>
//                     <Typography component="h1" variant="h3">
//                       Log In
//                     </Typography>
//                   </Grid>
//                   <Grid container item p={2} pt={0.5} mt={2} mb={2}>
//                     <Grid container item xs={12} p={2} pt={3}>
//                       <Button
//                         type="submit"
//                         color="secondary"
//                         fullWidth
//                         size="large"
//                         variant="outlined"
//                         onClick={handleGoogleSignIn}
//                         startIcon={<GoogleIcon />}
//                         sx={{ justifyContent: "flex-start", "& .MuiButton-startIcon": { marginRight: "20px" } }}
//                       >
//                         Continue with Google
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </Grid> */}
//             </>
//           ) : (
//             <Formik
//               initialValues={{
//                 email: "",
//                 password: "",
//               }}
//               // prettier-ignore
//               validationSchema={yup.object({
//                 email: yup.string()
//                   .email("Invalid email address")
//                   .required("Required"),
//                 password: yup.string()
//                   .min(6, "Must be more than 6 characters")
//                   .required("Required"),
//               })}
//               onSubmit={(values) => {
//                 handleSignIn(values);
//               }}
//             >
//               {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
//                 <form onSubmit={handleSubmit}>
//                   <Grid item display="flex" justifyContent="center" pt={3}>
//                     <Typography component="h1" variant="h3">
//                       Log In
//                     </Typography>
//                   </Grid>
//                   <Grid container item p={2} pt={0.5} mt={2} mb={2}>
//                     <Grid item xs={12} p={2}>
//                       <TextField
//                         fullWidth
//                         variant="outlined"
//                         type="text"
//                         label="Username"
//                         onBlur={handleBlur}
//                         onChange={handleChange}
//                         value={values.email}
//                         name="email"
//                         error={!!touched.email && !!errors.email}
//                         helperText={touched.email && errors.email}
//                       />
//                     </Grid>
//                     <Grid item xs={12} p={2} pb={1.5}>
//                       <TextField
//                         fullWidth
//                         variant="outlined"
//                         type="text"
//                         label="Password"
//                         onBlur={handleBlur}
//                         onChange={handleChange}
//                         value={values.password}
//                         name="password"
//                         error={!!touched.password && !!errors.password}
//                         helperText={touched.password && errors.password}
//                       />
//                     </Grid>
//                     <Grid container item xs={12} p={2} pt={3}>
//                       <Button type="submit" color="secondary" fullWidth size="large" variant="outlined">
//                         Log In
//                       </Button>
//                       <Grid item xs={12} pt={4} pb={2}>
//                         <Divider sx={{ height: "2px", width: "100%", marginRight: "16px" }} />
//                       </Grid>
//                       <Grid item xs={12} p={2} display="flex" justifyContent="center">
//                         <Typography variant="h5">DEMO ACCOUNTS</Typography>
//                       </Grid>
//                       <Grid container item xs={12} spacing={2}>
//                         <Grid item xs={6} md={6} justifyContent="center" p={0.5}>
//                           <TesterLoginButton email="testing@123.com" acctType="admin" password="testing123" />
//                         </Grid>
//                         <Grid item xs={6} md={6} justifyContent="center" p={0.5}>
//                           <TesterLoginButton email="testing@456.com" acctType="standard" password="testing456" />
//                         </Grid>
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                 </form>
//               )}
//             </Formik>
//           )}
//         </LoginPaper>
//       </Grid>
//     </Box>
//   </>
// );
