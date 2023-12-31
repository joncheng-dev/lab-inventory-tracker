import { useState, useEffect } from "react";
import Header from "../components/Header.js";
import CategoryPanel from "../components/CategoryPanel.js";
import UserInfoPanel from "../components/UserInfoPanel.js";
import InventoryList from "../components/InventoryList.js";
import InventoryAddForm from "../components/InventoryAddForm.js";
import InventoryEntryDetail from "../components/InventoryEntryDetail.js";
import InventoryEditForm from "../components/InventoryEditForm.js";
import { db, auth } from "../firebase.js";
import { collection, addDoc, doc, onSnapshot, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { styled as styledMui } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { InventoryEntry, UserEntry } from "../types/index.js";
import { useNavigate } from "react-router-dom";
// import useLocalStorage, { useLocalStorageProps } from "../hooks/useLocalStorage.js";
import { useUser } from "../components/Home.js";

function InventoryControl() {
  // STYLING
  //#region styling
  const FixedWidthItem = styledMui(Paper)(({ theme }) => ({
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
  // const [currentUser, setCurrentUser] = useState<useLocalStorageProps | null>(null);
  const { currentUser } = useUser();
  const [itemsCheckedOutByUser, setItemsCheckedOutByUser] = useState<InventoryEntry[]>([]);

  // For data:
  const [inventoryList, setInventoryList] = useState<InventoryEntry[]>([]);
  const [tagsToFilter, setTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredList, setFilteredList] = useState<InventoryEntry[]>([]);
  // const localUser = useLocalStorage({ key: "currentUser", objectToStore: currentUser });

  // Miscellaneous:
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
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

  // useEffect(() => {
  //   handleGettingCurrentUserInfoFromDb();
  // }, []);

  useEffect(() => {
    if (selectedEntry !== null) {
      handleChangingSelectedEntry(selectedEntry.id!);
    }
  }, [inventoryList, selectedEntry]);

  useEffect(() => {
    handleMakeUserItemList();
  }, [inventoryList]);

  useEffect(() => {
    handleFilterList();
  }, [inventoryList, searchQuery, tagsToFilter]);

  // useEffect(() => {
  //   if (localUser !== null) {
  //     setCurrentUser(localUser);
  //   }
  //   console.log("useEffect setCurrentUser, user to UserInfoPanel is: ", currentUser!.objectToStore);
  // }, [localUser]);

  //#endregion useEffect hooks

  //#region functions
  // const handleGettingCurrentUserInfoFromDb = async () => {
  //   try {
  //     if (auth.currentUser) {
  //       const userRef = doc(db, "users", auth.currentUser.uid);
  //       const docSnap = await getDoc(userRef);
  //       if (docSnap.exists()) {
  //         const userInfo = docSnap.data() as UserEntry;
  //         setCurrentUser({ key: "currentUser", objectToStore: userInfo });
  //         // Redirect user to sign-in if not signed in.
  //       } else {
  //         console.log("No such user in database. (User collections does not contain a user document with this id.)");
  //       }
  //     } else {
  //       console.log("Please sign in before proceeding.");
  //     }
  //   } catch (error) {
  //     console.error("Error retrieving user info:", error);
  //   }
  // };

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

  const handleMakeUserItemList = () => {
    if (currentUser) {
      setItemsCheckedOutByUser(() => {
        return inventoryList.filter((entry) => entry.checkedOutBy === currentUser!.objectToStore.userEmail);
      });
    }
  };

  const onSearchInputChange = (queryString: string) => {
    console.log("Parent: onSearchInputChange", queryString);
    setSearchQuery(queryString);
  };

  const onFilterByCategory = (arrayOfTags: string[]) => {
    setTags(arrayOfTags);
  };

  const handleFilterList = () => {
    let filteredListCopy = [...inventoryList];
    if (tagsToFilter.length > 0) {
      filteredListCopy = filteredListCopy.filter((entry) => tagsToFilter.some((tag) => entry.tags.includes(tag)));
    }
    if (searchQuery !== "") {
      filteredListCopy = filteredListCopy.filter((entry) => entry.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredList(filteredListCopy);
  };

  //#endregion functions

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

  const handleCheckOutItem = async () => {
    if (!selectedEntry) {
      throw new Error("No items are currently selected. (Selected entry is null.)");
    }
    const entryRef = doc(db, "inventoryEntries", selectedEntry.id!);
    if (selectedEntry.isCheckedOut === false) {
      const checkOutEntryData: Partial<InventoryEntry> = {
        isCheckedOut: true,
        checkedOutBy: auth.currentUser!.email,
        dateCheckedOut: new Date().toDateString(),
      };
      await updateDoc(entryRef, checkOutEntryData);
    } else {
      throw "Item is not available to be checked out.";
    }
  };

  const handleReturnItem = async (itemId: string) => {
    const entryRef = doc(db, "inventoryEntries", itemId!);
    const itemToReturn = inventoryList.filter((entry) => entry.id === itemId)[0];
    if (itemToReturn.isCheckedOut === true && itemToReturn.checkedOutBy === currentUser!.objectToStore.userEmail) {
      const returnEntryData: Partial<InventoryEntry> = {
        isCheckedOut: false,
        checkedOutBy: null,
        dateCheckedOut: null,
      };
      await updateDoc(entryRef, returnEntryData);
    } else {
      throw "Item is not checked out, so it cannot be returned.";
    }
  };
  //#endregion functions updating database
  //#region queries
  //endregion queries

  //#region Conditional Rendering of Components
  let leftSidePanel = (
    <CategoryPanel
      tags={tagsToFilter}
      subjectTagChecklist={subjectTagChecklist}
      purposeTagChecklist={purposeTagChecklist}
      onCategorySelection={onFilterByCategory}
    />
  );
  let centerPanel = null;
  let rightSidePanel = null;

  if (currentUser) {
    rightSidePanel = (
      <UserInfoPanel user={currentUser!.objectToStore} itemsCheckedOutByUser={itemsCheckedOutByUser} onEntrySelection={handleChangingSelectedEntry} />
    );
  }

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
        onClickingCheckout={handleCheckOutItem}
        onClickingReturn={handleReturnItem}
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
      <InventoryList listOfEntries={filteredList} onClickingAddEntry={handleAddEntryButtonClick} onEntrySelection={handleChangingSelectedEntry} />
    );
  }
  //#endregion Conditional Rendering of Components
  return (
    <>
      {/* Conditional rendering */}
      <Header onSearchInputChange={onSearchInputChange} />
      <Grid container spacing={1}>
        <Grid item xs={1.5}>
          <FixedWidthItem>{leftSidePanel}</FixedWidthItem>
        </Grid>
        <Grid item xs={8}>
          <FixedWidthItem>{centerPanel}</FixedWidthItem>
        </Grid>
        <Grid item xs={2.5}>
          <FixedWidthItem>{rightSidePanel}</FixedWidthItem>
        </Grid>
      </Grid>
    </>
  );
}

export default InventoryControl;
