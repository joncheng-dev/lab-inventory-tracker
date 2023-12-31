import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.tsx";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { eTargetType } from "../types/index.tsx";
import { tokens } from "../themes";
import { useTheme } from "@mui/material";
import { Button } from "@mui/material";

//#region style
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

function SignIn() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // state variables with useState hooks
  const [createAccountSuccess, setCreateAccountSuccess] = useState<string | null>(null);
  const [signInSuccess, setSignInSuccess] = useState<string | null>(null);
  const [signOutSuccess, setSignOutSuccess] = useState<string | null>(null);
  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(false);
  // redirects
  const navigate = useNavigate();

  // functions
  function handleCheckboxChange() {
    setIsCreateAccount((prevState) => !prevState);
  }

  function doCreateAccount(e: React.SyntheticEvent) {
    e.preventDefault();

    // Typing form values
    const target = e.target as typeof e.target & eTargetType;
    const email = target.email.value;
    const password = target.password.value;

    console.log("Account made with email:", email);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // user successfully creates account
        setCreateAccountSuccess(`Account creation successful: ${userCredential.user.email}.`);
        console.log("Account creation successful:", userCredential.user.email);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          userEmail: email,
          userId: userCredential.user.uid,
        });
      })
      .catch((error) => {
        // error with creating account
        setCreateAccountSuccess(`Error creating account: ${error.message}`);
        console.error("Error creating account:", error.message);
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
        navigate("/inventory");
      })
      .catch((error) => {
        setSignInSuccess(`There was an error with sign-in: ${error.message}`);
      });
  }

  // conditional rendering
  return (
    <FormContainer>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Create Account</span>
                </h6>
                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" checked={isCreateAccount} onChange={handleCheckboxChange} />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <form onSubmit={doSignIn}>
                            <div className="form-group">
                              <input type="email" name="email" className="form-style" placeholder="Email" autoComplete="off" />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input type="password" name="password" className="form-style" placeholder="Password" />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <Button type="submit" variant="contained" className="btn mt-4">
                              Sign In
                            </Button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Create Account</h4>
                          <form onSubmit={doCreateAccount}>
                            <div className="form-group mt-2">
                              <input type="email" name="email" className="form-style" placeholder="Email" autoComplete="off" />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input type="password" name="password" className="form-style" placeholder="Password" />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <Button type="submit" variant="contained" className="btn mt-4">
                              Create Account
                            </Button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormContainer>
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

// <form>
//   <label htmlFor="email">User email:</label>
//   <br />
//   <input type="text" name="email" />
//   <br />
//   <label htmlFor="password">Password:</label>
//   <br />
//   <input type="password" name="password" />
//   <br />
//   <button type="submit">Create Account</button>
// </form>;

// <React.Fragment>
//   <h1>Create an Account</h1>
//   {createAccountSuccess}
//   <Box
//     component="form"
//     sx={{
//       "& .MuiTextField-root": { m: 1, width: "25ch" },
//     }}
//     noValidate
//     autoComplete="off"
//     onSubmit={doCreateAccount}
//   >
//     <Grid container spacing={2}>
//       <Grid>
//         <TextField type="text" name="email" label="Email" variant="filled" required />
//         <TextField type="password" name="password" label="Password" required />
//       </Grid>
//       <Grid item xs={4}>
//         <Stack spacing={2} direction="row">
//           <Button variant="outlined" type="submit">
//             Create Account
//           </Button>
//         </Stack>
//       </Grid>
//     </Grid>
//   </Box>
//   <h1>Sign In</h1>
//   {signInSuccess}
//   <Box
//     component="form"
//     sx={{
//       "& .MuiTextField-root": { m: 1, width: "25ch" },
//     }}
//     noValidate
//     autoComplete="off"
//     onSubmit={doSignIn}
//   >
//     <Grid container spacing={2}>
//       <Grid>
//         <TextField type="text" name="email" label="Email" variant="filled" required />
//         <TextField type="password" name="password" label="Password" required />
//       </Grid>
//       <Grid item xs={4}>
//         <Stack spacing={2} direction="row">
//           <Button variant="contained" type="submit">
//             Sign In
//           </Button>
//         </Stack>
//       </Grid>
//     </Grid>
//   </Box>
//   <h1>Sign Out</h1>
//   {signOutSuccess}
//   <br />
//   <Stack spacing={2} direction="row">
//     <Button variant="contained" onClick={doSignOut}>
//       Sign Out
//     </Button>
//   </Stack>
// </React.Fragment>;
