import React, { useState, useEffect } from "react";
import CategoryPanel from "./CategoryPanel";
import UserInfoPanel from "./UserInfoPanel";
import InventoryList from "./InventoryList";
import InventoryAddForm from "./InventoryAddForm";
import InventoryEntryDetail from "./InventoryEntryDetail";
import InventoryEditForm from "./InventoryEditForm";
import { db, auth } from "../firebase.js";
import { collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc, runTransaction } from "firebase/firestore";
import useFireStore from "./useFireStore.js";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Layout from "./Layout";
import { InventoryEntry as IEntry } from "./Types/index.js";

function InventoryControl() {
  // Styling
  const FixedWidthItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  // State
  const [addFormVisible, setAddFormVisibility] = useState(false);
  const [inventoryList, setInventoryList] = useState<IEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  //#region useEffect hooks
  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "inventoryEntries"),
      (collectionSnapshot) => {
        const entries: IEntry[] = [];
        collectionSnapshot.forEach((entry) => {
          entries.push({
            id: entry.id,
            name: entry.data().name,
            location: entry.data().location,
            description: entry.data().description,
            checkedOut: entry.data().available,
            checkedOutBy: entry.data().checkedOutBy,
            dateCheckedOut: entry.data().dateCheckedOut,
            tags: entry.data().tags,
          });
        });
        setInventoryList(entries);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  useEffect(() => {
    if (selectedEntry !== null) {
      handleChangingSelectedEntry(selectedEntry.id);
    }
  }, [inventoryList, selectedEntry]);
  //#endregion useEffect hooks

  //#region functions

  //#endregion functions

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
