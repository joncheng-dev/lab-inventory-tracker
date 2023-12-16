import { useState, useEffect } from "react";
import CategoryPanel from "./CategoryPanel";
import UserInfoPanel from "./UserInfoPanel";
import InventoryList from "./InventoryList";
import InventoryAddForm from "./InventoryAddForm";
import InventoryEntryDetail from "./InventoryEntryDetail";
import InventoryEditForm from "./InventoryEditForm";
import { db, auth } from "../firebase.js";
import { collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc, runTransaction } from "firebase/firestore";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Layout from "./Layout";
import { InventoryEntry } from "./Types/";

function InventoryControl() {
  // STYLING
  //#region styling
  const FixedWidthItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  //#endregion styling

  // STATE & SHARED INFORMATION
  // For conditional rendering:
  const [addFormVisible, setAddFormVisibility] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<InventoryEntry | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  // For data:
  const [inventoryList, setInventoryList] = useState<InventoryEntry[]>([]);
  // For error handling:
  const [error, setError] = useState<string | null>(null);
  const subjectTagChecklist: string[] = ["Biology", "Chemistry", "Earth Science", "Physics", "General"];
  const purposeTagChecklist: string[] = ["Equipment", "Materials", "Models", "Safety"];
  //#region useEffect hooks
  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "inventoryEntries"),
      (collectionSnapshot) => {
        const entries: InventoryEntry[] = [];
        collectionSnapshot.forEach((entry) => {
          entries.push({
            id: entry.id,
            name: entry.data().name,
            location: entry.data().location,
            description: entry.data().description,
            isCheckedOut: entry.data().isCheckedOut,
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
      handleChangingSelectedEntry(selectedEntry.id!);
    }
    console.log(`useEffect updated selectedEntry`);
  }, [inventoryList, selectedEntry]);
  //#endregion useEffect hooks

  //#region functions
  const handleExitButtonClick = () => {
    if (selectedEntry) {
      setAddFormVisibility(false);
      setSelectedEntry(null);
      setEditing(false);
    } else {
      setAddFormVisibility(!addFormVisible);
    }
  };

  const handleAddEntryButtonClick = () => {
    setAddFormVisibility(!addFormVisible);
  };

  const handleChangingSelectedEntry = (id: string) => {
    const selection = inventoryList.filter((entry) => entry.id === id)[0];
    setSelectedEntry(selection);
  };

  const handleEditEntryButtonClick = () => {
    setEditing(!editing);
  };

  //#region functions updating database
  // functions updating database
  const handleAddingNewEntryToList = async (entry: InventoryEntry) => {
    await addDoc(collection(db, "inventoryEntries"), entry);
    setAddFormVisibility(false);
  };

  const handleEditingEntryInList = async (entry: InventoryEntry) => {
    const entryRef = doc(db, "inventoryEntries", entry.id!);
    // Typing for data being updated
    const data: Partial<InventoryEntry> = {
      name: entry.name,
      description: entry.description,
      location: entry.location,
      tags: entry.tags,
    };
    await updateDoc(entryRef, data);
    setEditing(false);
    setSelectedEntry(null);
  };

  const handleDeletingEntry = async (id: string) => {
    setSelectedEntry(null);
    await deleteDoc(doc(db, "inventoryEntries", id));
  };

  const handleCheckoutAndReturn = async (id: string, task: string) => {
    try {
      await runTransaction(db, async (transaction) => {
        // Check to make sure selectedEntry is not null
        if (!selectedEntry) {
          throw new Error("Selected entry is null.");
        }
        // read both the target item entry AND the current user
        const entryRef = doc(db, "inventoryEntries", selectedEntry.id!);
        const userRef = doc(db, "users", auth.currentUser!.uid);
        // read the information in both docs
        const entryDoc = await transaction.get(entryRef);
        if (!entryDoc.exists()) {
          throw "Item document does not exist";
        }
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) {
          throw "User document does not exist";
        }
        // if both user and item exist, continue with the transaction
        const checkedOutStatus = !entryDoc.data().isCheckedOut;
        const userCheckedOutItems = userDoc.data().itemsCheckedOut || {};
        // Decide which transaction to carry out
        switch (task) {
          case "check out":
            // update the specific entry identified by "id" in this object first.
            userCheckedOutItems[id] = {
              dateCheckedOut: new Date().toDateString(),
            };
            // update both user and item docs
            const checkOutEntryData: Partial<InventoryEntry> = {
              isCheckedOut: checkedOutStatus,
              checkedOutBy: auth.currentUser!.email,
              dateCheckedOut: new Date().toDateString(),
            };
            transaction.update(entryRef, checkOutEntryData);
            transaction.update(userRef, {
              itemsCheckedOut: userCheckedOutItems,
            });
            break;
          case "return":
            if (userCheckedOutItems[id]) {
              delete userCheckedOutItems[id];
              const returnEntryData: Partial<InventoryEntry> = {
                isCheckedOut: checkedOutStatus,
                checkedOutBy: null,
                dateCheckedOut: null,
              };
              transaction.update(entryRef, returnEntryData);
              transaction.update(userRef, { itemsCheckedOut: userCheckedOutItems });
            } else {
              throw "Item is not checked out.";
            }
            break;
          default:
            break;
        }
      });
      console.log("Transaction successful.");
    } catch (e) {
      console.log("Transaction failed.", e);
    }
  };
  //#endregion functions updating database
  //#endregion functions

  // Conditional Rendering of Components
  let leftSidePanel = <CategoryPanel />;
  let centerPanel = null;
  let rightSidePanel = <UserInfoPanel />;

  if (selectedEntry !== null && editing) {
    centerPanel = (
      <InventoryEditForm
        entry={selectedEntry}
        subjectTagChecklist={subjectTagChecklist}
        purposeTagChecklist={purposeTagChecklist}
        onFormSubmit={handleEditingEntryInList}
        onClickingExit={handleExitButtonClick}
      />
    );
  } else if (selectedEntry !== null) {
    centerPanel = (
      <InventoryEntryDetail
        entry={selectedEntry}
        onClickingEdit={handleEditEntryButtonClick}
        onClickingCheckoutOrReturn={handleCheckoutAndReturn}
        onClickingDelete={handleDeletingEntry}
        onClickingExit={handleExitButtonClick}
      />
    );
  } else if (addFormVisible) {
    centerPanel = (
      <InventoryAddForm
        subjectTagChecklist={subjectTagChecklist}
        purposeTagChecklist={purposeTagChecklist}
        onFormSubmit={handleAddingNewEntryToList}
        onClickingExit={handleExitButtonClick}
      />
    );
  } else {
    centerPanel = (
      <InventoryList listOfEntries={inventoryList} onClickingAddEntry={handleAddEntryButtonClick} onEntrySelection={handleChangingSelectedEntry} />
    );
  }
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
