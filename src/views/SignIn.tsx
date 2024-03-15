import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.tsx";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { sharedInfo } from "../helpers/UserContext.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { eTargetType } from "../types/index.tsx";
import { tokens } from "../themes.tsx";
import { useTheme } from "@mui/material";
import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { doCreateAccount } from "../hooks/authUtil.tsx";
import TextInput from "../components/Forms/TextInput.tsx";
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

const FormContainer = styled.div`
  body {
    font-family: "Poppins", sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 1.7;
    color: #c4c3ca;
    background-color: #1f2029;
    overflow-x: hidden;
  }
  a {
    cursor: pointer;
    transition: all 200ms linear;
  }
  a:hover {
    text-decoration: none;
  }
  .link {
    color: #c4c3ca;
  }
  .link:hover {
    color: #ffeba7;
  }
  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 1.7;
  }
  h4 {
    font-weight: 600;
  }
  h6 span {
    padding: 0 20px;
    text-transform: uppercase;
    font-weight: 700;
  }
  .section {
    position: relative;
    width: 100%;
    display: block;
  }
  .full-height {
    min-height: 100vh;
  }
  [type="checkbox"]:checked,
  [type="checkbox"]:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  .checkbox:checked + label,
  .checkbox:not(:checked) + label {
    position: relative;
    display: block;
    text-align: center;
    width: 50px;
    height: 12px;
    border-radius: 8px;
    padding: 0;
    margin: 10px auto;
    cursor: pointer;
    background-color: #ffeba7;
  }
  .checkbox:checked + label:before,
  .checkbox:not(:checked) + label:before {
    position: absolute;
    display: block;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    color: #ffeba7;
    background-color: #102770;
    font-family: "unicons";
    content: " ";
    z-index: 20;
    top: -10px;
    left: -10px;
    line-height: 36px;
    text-align: center;
    font-size: 24px;
    transition: all 0.5s ease;
  }
  .checkbox:checked + label:before {
    transform: translateX(44px) rotate(-270deg);
  }

  .card-3d-wrap {
    position: relative;
    width: 440px;
    max-width: 100%;
    height: 400px;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    perspective: 800px;
    margin-top: 60px;
  }
  .card-3d-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    transition: all 600ms ease-out;
  }
  .card-front,
  .card-back {
    width: 100%;
    height: 100%;
    background-color: #2a2b38;
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: 300%;
    position: absolute;
    border-radius: 6px;
    left: 0;
    top: 0;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -o-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .card-back {
    transform: rotateY(180deg);
  }
  .checkbox:checked ~ .card-3d-wrap .card-3d-wrapper {
    transform: rotateY(180deg);
  }
  .center-wrap {
    position: absolute;
    width: 100%;
    padding: 0 35px;
    top: 50%;
    left: 0;
    transform: translate3d(0, -50%, 35px) perspective(100px);
    z-index: 20;
    display: block;
  }

  .form-group {
    position: relative;
    display: block;
    margin: 0;
    padding: 0;
  }
  .form-style {
    padding: 13px 20px;
    padding-left: 55px;
    height: 48px;
    width: 100%;
    font-weight: 500;
    border-radius: 4px;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.5px;
    outline: none;
    color: #c4c3ca;
    background-color: #1f2029;
    border: none;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
    box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
  }
  .form-style:focus,
  .form-style:active {
    border: none;
    outline: none;
    box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
  }
  .input-icon {
    position: absolute;
    top: 0;
    left: 18px;
    height: 48px;
    font-size: 24px;
    line-height: 48px;
    text-align: left;
    color: #ffeba7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .form-group input:-ms-input-placeholder {
    color: #c4c3ca;
    opacity: 0.7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }
  .form-group input::-moz-placeholder {
    color: #c4c3ca;
    opacity: 0.7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }
  .form-group input:-moz-placeholder {
    color: #c4c3ca;
    opacity: 0.7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }
  .form-group input::-webkit-input-placeholder {
    color: #c4c3ca;
    opacity: 0.7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }
  .form-group input:focus:-ms-input-placeholder {
    opacity: 0;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }
  .form-group input:focus::-moz-placeholder {
    opacity: 0;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }
  .form-group input:focus:-moz-placeholder {
    opacity: 0;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }
  .form-group input:focus::-webkit-input-placeholder {
    opacity: 0;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .btn {
    border-radius: 4px;
    height: 44px;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
    padding: 0 30px;
    letter-spacing: 1px;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    justify-content: center;
    -ms-flex-pack: center;
    text-align: center;
    border: none;
    background-color: #ffeba7;
    color: #102770;
    box-shadow: 0 8px 24px 0 rgba(255, 235, 167, 0.2);
  }
  .btn:active,
  .btn:focus {
    background-color: #102770;
    color: #ffeba7;
    box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2);
  }
  .btn:hover {
    background-color: #102770;
    color: #ffeba7;
    box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2);
  }

  .logo {
    position: absolute;
    top: 30px;
    right: 30px;
    display: block;
    z-index: 100;
    transition: all 250ms linear;
  }
  .logo img {
    height: 26px;
    width: auto;
    display: block;
  }
`;
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
  const [user] = useAuthState(auth);
  const userProvider = sharedInfo();
  // state variables with useState hooks
  const [createAccountSuccess, setCreateAccountSuccess] = useState<string | null>(null);
  // const [signInSuccess, setSignInSuccess] = useState<boolean>(false);
  const [signOutSuccess, setSignOutSuccess] = useState<string | null>(null);
  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(false);
  // redirects
  const navigate = useNavigate();

  useEffect(() => {
    if (userProvider?.currentUser) {
      navigate("/inventory");
    }
  }, [userProvider?.currentUser]);

  // useEffect(() => {
  //   console.log("signInSuccess: ", signInSuccess);
  //   // console.log("SignIn component mounted");
  //   // console.log("SignIn, useEffect, state - signInSuccess: ", signInSuccess);
  //   if (signInSuccess) {
  //     navigate("/inventory");
  //     console.log("SignIn, navigate to /inventory");
  //   }
  // }, [signInSuccess]);

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
                    {/* <Grid container item xs={12}>
                      <Grid item xs={6} justifyContent="center" p={0.5}>
                        <TesterLoginButton email="testing@123.com" acctType="admin" password="testing123" />
                      </Grid>
                      <Grid item xs={6} justifyContent="center" p={0.5}>
                        <TesterLoginButton email="testing@456.com" acctType="standard" password="testing456" />
                      </Grid>
                    </Grid> */}
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

function UserContext() {
  throw new Error("Function not implemented.");
}
// functions
// function handleCheckboxChange() {
//   setIsCreateAccount((prevState) => !prevState);
// }

// function doCreateAccount(e: React.SyntheticEvent) {
//   e.preventDefault();

//   // Typing form values
//   const target = e.target as typeof e.target & eTargetType;
//   const email = target.email.value;
//   const password = target.password.value;

//   console.log("Account made with email:", email);

//   createUserWithEmailAndPassword(auth, email, password)
//     .then(async (userCredential) => {
//       // user successfully creates account
//       setCreateAccountSuccess(`Account creation successful: ${userCredential.user.email}.`);
//       console.log("Account creation successful:", userCredential.user.email);
//       await setDoc(doc(db, "users", userCredential.user.uid), {
//         userEmail: email,
//         userId: userCredential.user.uid,
//       });
//     })
//     .catch((error) => {
//       // error with creating account
//       setCreateAccountSuccess(`Error creating account: ${error.message}`);
//       console.error("Error creating account:", error.message);
//     });
// }

// function doSignIn(e: React.SyntheticEvent) {
//   e.preventDefault();

//   // Typing form values
//   const target = e.target as typeof e.target & eTargetType;
//   const email = target.email.value;
//   const password = target.password.value;

//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       console.log("User credential: ", userCredential);
//       console.log("signInWithEmailAndPassword, userCredential.user.email: ", userCredential.user.email);
//       setSignInSuccess(`You've signed in as: ${userCredential.user.email}`);
//       navigate("/inventory");
//     })
//     .catch((error) => {
//       console.error("Sign-in error: ", error);
//       setSignInSuccess(`There was an error with sign-in: ${error.message}`);
//     });
// }

// async function doSignIn(props: SignInForm) {
//   // Typing form values
//   const email = props.email;
//   const password = props.password;

//   try {
//     console.log("Before signInWithEmailAndPassword");
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     console.log("After signInWithEmailAndPassword, userCredential:", userCredential);
//     // const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     setSignInSuccess(`You've signed in as: ${userCredential.user.email}`);
//     navigate("/inventory");
//   } catch (error: any) {
//     console.error("Sign-in error: ", error);
//     setSignInSuccess(`There was an error with sign-in: ${error.message}`);
//   }
// }

// <Form>
//   <h3>Sign In</h3>
//   <TextField
//     fullWidth
//     variant="filled"
//     type="text"
//     label="Email"
//     onBlur={handleBlur}
//     onChange={handleChange}
//     value={values.email}
//     name="email"
//     error={!!touched.email && !!errors.email}
//     helperText={touched.email && errors.email}
//     sx={{ gridColumn: "span 4" }}
//   />
//   {/* <TextInput label="Email" name="email" type="text" placeholder="Email Address" /> */}
//   <TextInput label="Password" name="password" type="password" placeholder="Password" />
//   <button type="submit">Submit</button>
// </Form>;

/* <label htmlFor="password">Password</label>
        <Field name="password" type="text" />
        <ErrorMessage name="password" /> */

//   // conditional rendering
//   return (
//     <FormContainer>
//       <div className="section">
//         <div className="container">
//           <div className="row full-height justify-content-center">
//             <div className="col-12 text-center align-self-center py-5">
//               <div className="section pb-5 pt-5 pt-sm-2 text-center">
//                 <h6 className="mb-0 pb-3">
//                   <span>Log In </span>
//                   <span>Create Account</span>
//                 </h6>
//                 <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" checked={isCreateAccount} onChange={handleCheckboxChange} />
//                 <label htmlFor="reg-log"></label>
//                 <div className="card-3d-wrap mx-auto">
//                   <div className="card-3d-wrapper">
//                     <div className="card-front">
//                       <div className="center-wrap">
//                         <div className="section text-center">
//                           <h4 className="mb-4 pb-3">Log In</h4>
//                           <form onSubmit={doSignIn}>
//                             <div className="form-group">
//                               <input type="email" name="email" className="form-style" placeholder="Email" autoComplete="off" />
//                               <i className="input-icon uil uil-at"></i>
//                             </div>
//                             <div className="form-group mt-2">
//                               <input type="password" name="password" className="form-style" placeholder="Password" />
//                               <i className="input-icon uil uil-lock-alt"></i>
//                             </div>
//                             <Button type="submit" variant="contained" className="btn mt-4">
//                               Sign In
//                             </Button>
//                           </form>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-back">
//                       <div className="center-wrap">
//                         <div className="section text-center">
//                           <h4 className="mb-4 pb-3">Create Account</h4>
//                           <form onSubmit={doCreateAccount}>
//                             <div className="form-group mt-2">
//                               <input type="email" name="email" className="form-style" placeholder="Email" autoComplete="off" />
//                               <i className="input-icon uil uil-at"></i>
//                             </div>
//                             <div className="form-group mt-2">
//                               <input type="password" name="password" className="form-style" placeholder="Password" />
//                               <i className="input-icon uil uil-lock-alt"></i>
//                             </div>
//                             <Button type="submit" variant="contained" className="btn mt-4">
//                               Create Account
//                             </Button>
//                           </form>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </FormContainer>
// );

// //#region style
// const FormContainer = styled.div`
//   body {
//     font-family: "Poppins", sans-serif;
//     font-weight: 300;
//     font-size: 15px;
//     line-height: 1.7;
//     color: #c4c3ca;
//     background-color: #1f2029;
//     overflow-x: hidden;
//   }
//   a {
//     cursor: pointer;
//     transition: all 200ms linear;
//   }
//   a:hover {
//     text-decoration: none;
//   }
//   .link {
//     color: #c4c3ca;
//   }
//   .link:hover {
//     color: #ffeba7;
//   }
//   p {
//     font-weight: 500;
//     font-size: 14px;
//     line-height: 1.7;
//   }
//   h4 {
//     font-weight: 600;
//   }
//   h6 span {
//     padding: 0 20px;
//     text-transform: uppercase;
//     font-weight: 700;
//   }
//   .section {
//     position: relative;
//     width: 100%;
//     display: block;
//   }
//   .full-height {
//     min-height: 100vh;
//   }
//   [type="checkbox"]:checked,
//   [type="checkbox"]:not(:checked) {
//     position: absolute;
//     left: -9999px;
//   }
//   .checkbox:checked + label,
//   .checkbox:not(:checked) + label {
//     position: relative;
//     display: block;
//     text-align: center;
//     width: 50px;
//     height: 12px;
//     border-radius: 8px;
//     padding: 0;
//     margin: 10px auto;
//     cursor: pointer;
//     background-color: #ffeba7;
//   }
//   .checkbox:checked + label:before,
//   .checkbox:not(:checked) + label:before {
//     position: absolute;
//     display: block;
//     width: 28px;
//     height: 28px;
//     border-radius: 50%;
//     color: #ffeba7;
//     background-color: #102770;
//     font-family: "unicons";
//     content: " ";
//     z-index: 20;
//     top: -10px;
//     left: -10px;
//     line-height: 36px;
//     text-align: center;
//     font-size: 24px;
//     transition: all 0.5s ease;
//   }
//   .checkbox:checked + label:before {
//     transform: translateX(44px) rotate(-270deg);
//   }

//   .card-3d-wrap {
//     position: relative;
//     width: 440px;
//     max-width: 100%;
//     height: 400px;
//     -webkit-transform-style: preserve-3d;
//     transform-style: preserve-3d;
//     perspective: 800px;
//     margin-top: 60px;
//   }
//   .card-3d-wrapper {
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     top: 0;
//     left: 0;
//     -webkit-transform-style: preserve-3d;
//     transform-style: preserve-3d;
//     transition: all 600ms ease-out;
//   }
//   .card-front,
//   .card-back {
//     width: 100%;
//     height: 100%;
//     background-color: #2a2b38;
//     background-position: bottom center;
//     background-repeat: no-repeat;
//     background-size: 300%;
//     position: absolute;
//     border-radius: 6px;
//     left: 0;
//     top: 0;
//     -webkit-transform-style: preserve-3d;
//     transform-style: preserve-3d;
//     -webkit-backface-visibility: hidden;
//     -moz-backface-visibility: hidden;
//     -o-backface-visibility: hidden;
//     backface-visibility: hidden;
//   }
//   .card-back {
//     transform: rotateY(180deg);
//   }
//   .checkbox:checked ~ .card-3d-wrap .card-3d-wrapper {
//     transform: rotateY(180deg);
//   }
//   .center-wrap {
//     position: absolute;
//     width: 100%;
//     padding: 0 35px;
//     top: 50%;
//     left: 0;
//     transform: translate3d(0, -50%, 35px) perspective(100px);
//     z-index: 20;
//     display: block;
//   }

//   .form-group {
//     position: relative;
//     display: block;
//     margin: 0;
//     padding: 0;
//   }
//   .form-style {
//     padding: 13px 20px;
//     padding-left: 55px;
//     height: 48px;
//     width: 100%;
//     font-weight: 500;
//     border-radius: 4px;
//     font-size: 14px;
//     line-height: 22px;
//     letter-spacing: 0.5px;
//     outline: none;
//     color: #c4c3ca;
//     background-color: #1f2029;
//     border: none;
//     -webkit-transition: all 200ms linear;
//     transition: all 200ms linear;
//     box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
//   }
//   .form-style:focus,
//   .form-style:active {
//     border: none;
//     outline: none;
//     box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
//   }
//   .input-icon {
//     position: absolute;
//     top: 0;
//     left: 18px;
//     height: 48px;
//     font-size: 24px;
//     line-height: 48px;
//     text-align: left;
//     color: #ffeba7;
//     -webkit-transition: all 200ms linear;
//     transition: all 200ms linear;
//   }

//   .form-group input:-ms-input-placeholder {
//     color: #c4c3ca;
//     opacity: 0.7;
//     -webkit-transition: all 200ms linear;
//     transition: all 200ms linear;
//   }
//   .form-group input::-moz-placeholder {
//     color: #c4c3ca;
//     opacity: 0.7;
//     -webkit-transition: all 200ms linear;
//     transition: all 200ms linear;
//   }
//   .form-group input:-moz-placeholder {
//     color: #c4c3ca;
//     opacity: 0.7;
//     -webkit-transition: all 200ms linear;
//     transition: all 200ms linear;
//   }
//   .form-group input::-webkit-input-placeholder {
//     color: #c4c3ca;
//     opacity: 0.7;
//     -webkit-transition: all 200ms linear;
//     transition: all 200ms linear;
//   }
//   .form-group input:focus:-ms-input-placeholder {
//     opacity: 0;
//     -webkit-transition: all 200ms linear;
//     transition: all 200ms linear;
//   }
//   .form-group input:focus::-moz-placeholder {
//     opacity: 0;
//     -webkit-transition: all 200ms linear;
//     transition: all 200ms linear;
//   }
//   .form-group input:focus:-moz-placeholder {
//     opacity: 0;
//     -webkit-transition: all 200ms linear;
//     transition: all 200ms linear;
//   }
//   .form-group input:focus::-webkit-input-placeholder {
//     opacity: 0;
//     -webkit-transition: all 200ms linear;
//     transition: all 200ms linear;
//   }

//   .btn {
//     border-radius: 4px;
//     height: 44px;
//     font-size: 13px;
//     font-weight: 600;
//     text-transform: uppercase;
//     -webkit-transition: all 200ms linear;
//     transition: all 200ms linear;
//     padding: 0 30px;
//     letter-spacing: 1px;
//     display: -webkit-inline-flex;
//     display: -ms-inline-flexbox;
//     display: inline-flex;
//     -webkit-align-items: center;
//     -moz-align-items: center;
//     -ms-align-items: center;
//     align-items: center;
//     -webkit-justify-content: center;
//     -moz-justify-content: center;
//     -ms-justify-content: center;
//     justify-content: center;
//     -ms-flex-pack: center;
//     text-align: center;
//     border: none;
//     background-color: #ffeba7;
//     color: #102770;
//     box-shadow: 0 8px 24px 0 rgba(255, 235, 167, 0.2);
//   }
//   .btn:active,
//   .btn:focus {
//     background-color: #102770;
//     color: #ffeba7;
//     box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2);
//   }
//   .btn:hover {
//     background-color: #102770;
//     color: #ffeba7;
//     box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2);
//   }

//   .logo {
//     position: absolute;
//     top: 30px;
//     right: 30px;
//     display: block;
//     z-index: 100;
//     transition: all 250ms linear;
//   }
//   .logo img {
//     height: 26px;
//     width: auto;
//     display: block;
//   }
// `;

// const StyledErrorMessage = styled.div`
//   font-size: 12px;
//   color: var(--red-600);
//   width: 400px;
//   margin-top: 0.25rem;
//   &:before {
//     content: "❌ ";
//     font-size: 10px;
//   }
//   @media (prefers-color-scheme: dark) {
//     color: var(--red-300);
//   }
// `;
// //#endregion style

// export default function SignIn() {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   // state variables with useState hooks
//   const [createAccountSuccess, setCreateAccountSuccess] = useState<string | null>(null);
//   const [signInSuccess, setSignInSuccess] = useState<string | null>(null);
//   const [signOutSuccess, setSignOutSuccess] = useState<string | null>(null);
//   const [isCreateAccount, setIsCreateAccount] = useState<boolean>(false);
//   // redirects
//   const navigate = useNavigate();

//   // functions
//   function handleCheckboxChange() {
//     setIsCreateAccount((prevState) => !prevState);
//   }

//   function doCreateAccount(e: React.SyntheticEvent) {
//     e.preventDefault();

//     // Typing form values
//     const target = e.target as typeof e.target & eTargetType;
//     const email = target.email.value;
//     const password = target.password.value;

//     console.log("Account made with email:", email);

//     createUserWithEmailAndPassword(auth, email, password)
//       .then(async (userCredential) => {
//         // user successfully creates account
//         setCreateAccountSuccess(`Account creation successful: ${userCredential.user.email}.`);
//         console.log("Account creation successful:", userCredential.user.email);
//         await setDoc(doc(db, "users", userCredential.user.uid), {
//           userEmail: email,
//           userId: userCredential.user.uid,
//         });
//       })
//       .catch((error) => {
//         // error with creating account
//         setCreateAccountSuccess(`Error creating account: ${error.message}`);
//         console.error("Error creating account:", error.message);
//       });
//   }

//   function doSignIn(e: React.SyntheticEvent) {
//     e.preventDefault();

//     // Typing form values
//     const target = e.target as typeof e.target & eTargetType;
//     const email = target.email.value;
//     const password = target.password.value;

//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         console.log("User credential: ", userCredential);
//         console.log("signInWithEmailAndPassword, userCredential.user.email: ", userCredential.user.email);
//         setSignInSuccess(`You've signed in as: ${userCredential.user.email}`);
//         navigate("/inventory");
//       })
//       .catch((error) => {
//         console.error("Sign-in error: ", error);
//         setSignInSuccess(`There was an error with sign-in: ${error.message}`);
//       });
//   }

//   // conditional rendering
//   return (
//     <FormContainer>
//       <div className="section">
//         <div className="container">
//           <div className="row full-height justify-content-center">
//             <div className="col-12 text-center align-self-center py-5">
//               <div className="section pb-5 pt-5 pt-sm-2 text-center">
//                 <h6 className="mb-0 pb-3">
//                   <span>Log In </span>
//                   <span>Create Account</span>
//                 </h6>
//                 <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" checked={isCreateAccount} onChange={handleCheckboxChange} />
//                 <label htmlFor="reg-log"></label>
//                 <div className="card-3d-wrap mx-auto">
//                   <div className="card-3d-wrapper">
//                     <div className="card-front">
//                       <div className="center-wrap">
//                         <div className="section text-center">
//                           <h4 className="mb-4 pb-3">Log In</h4>
//                           <form onSubmit={doSignIn}>
//                             <div className="form-group">
//                               <input type="email" name="email" className="form-style" placeholder="Email" autoComplete="off" />
//                               <i className="input-icon uil uil-at"></i>
//                             </div>
//                             <div className="form-group mt-2">
//                               <input type="password" name="password" className="form-style" placeholder="Password" />
//                               <i className="input-icon uil uil-lock-alt"></i>
//                             </div>
//                             <Button type="submit" variant="contained" className="btn mt-4">
//                               Sign In
//                             </Button>
//                           </form>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-back">
//                       <div className="center-wrap">
//                         <div className="section text-center">
//                           <h4 className="mb-4 pb-3">Create Account</h4>
//                           <form onSubmit={doCreateAccount}>
//                             <div className="form-group mt-2">
//                               <input type="email" name="email" className="form-style" placeholder="Email" autoComplete="off" />
//                               <i className="input-icon uil uil-at"></i>
//                             </div>
//                             <div className="form-group mt-2">
//                               <input type="password" name="password" className="form-style" placeholder="Password" />
//                               <i className="input-icon uil uil-lock-alt"></i>
//                             </div>
//                             <Button type="submit" variant="contained" className="btn mt-4">
//                               Create Account
//                             </Button>
//                           </form>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </FormContainer>
//   );
// }
