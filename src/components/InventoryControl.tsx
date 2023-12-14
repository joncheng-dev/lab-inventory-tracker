import React, { useState, useEffect } from "react";
import CategoryPanel from "./CategoryPanel.js";
import UserInfoPanel from "./UserInfoPanel.js";
import InventoryList from "./InventoryList";
import InventoryAddForm from "./InventoryAddForm";
import InventoryEntryDetail from "./InventoryEntryDetails.js";
import InventoryEditForm from "./InventoryEditForm.js";
import { db, auth } from "../firebase.js";
import { collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc, runTransaction } from "firebase/firestore";
import useFireStore from "./useFireStore.js";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Layout from "./Layout";

function InventoryControl() {
  // Styling
  const FixedWidthItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  // Constantly renders CategoryPanel, InventoryPanel, UserInfoPanel

  // Conditional Rendering
  let leftSidePanel = <CategoryPanel />;
  let centerPanel = null;
  let rightSidePanel = <UserInfoPanel />;

  // ah got it. Since Layout is a apre
  //if passing multiple components, it needs a fragment
  return (
    <Layout>
      <>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <FixedWidthItem>{leftSidePanel}</FixedWidthItem>
          </Grid>
          <Grid item xs={6}>
            <FixedWidthItem>{centerPanel}</FixedWidthItem>
          </Grid>
          <Grid item xs={3}>
            <FixedWidthItem>{rightSidePanel}</FixedWidthItem>
          </Grid>
        </Grid>
      </>
    </Layout>
  );
}

export default InventoryControl;
