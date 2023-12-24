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
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Layout from "../components/Layout.js";
import { InventoryEntry, UserEntry } from "../types/index.js";
import { useNavigate } from "react-router-dom";

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
  const [currentUser, setCurrentUser] = useState<UserEntry | null>(null);
  const [itemsCheckedOutByUser, setItemsCheckedOutByUser] = useState<InventoryEntry[]>([]);
  // For data:
  const [inventoryList, setInventoryList] = useState<InventoryEntry[]>([]);
  const [tagsToFilter, setTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredList, setFilteredList] = useState<InventoryEntry[]>([]);
  // Miscellaneous:
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const subjectTagChecklist: string[] = ["Biology", "Chemistry", "Earth Science", "Physics", "General"];
  const purposeTagChecklist: string[] = ["Equipment", "Materials", "Models", "Safety"];

  //#region useEffect hooks
  // useEffect(() => {
  //   console.log(JSON.stringify(inventoryList));
  //   console.log("InventoryControl useEffect: inventoryList", inventoryList);
  // }, [inventoryList]);

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
    handleGettingCurrentUserInfoFromDb();
  }, []);

  useEffect(() => {
    if (selectedEntry !== null) {
      handleChangingSelectedEntry(selectedEntry.id!);
    }
  }, [inventoryList, selectedEntry]);

  useEffect(() => {
    handleMakeUserItemList();
  }, [inventoryList]);

  useEffect(() => {
    handleFilterListByCategoryBoxes(tagsToFilter);
    // handleFilterListCombined();
  }, [inventoryList, searchQuery]);

  useEffect(() => {
    handleFilterListBySearchString();
  }, [inventoryList, searchQuery]);

  //#endregion useEffect hooks

  //#region functions
  const handleGettingCurrentUserInfoFromDb = async () => {
    try {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userInfo = docSnap.data() as UserEntry;
          setCurrentUser(userInfo);
          // Redirect user to sign-in if not signed in.
        } else {
          console.log("No such user in database. (User collections does not contain a user document with this id.)");
        }
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error retrieving user info:", error);
    }
  };

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
        return inventoryList.filter((entry) => entry.checkedOutBy === currentUser!.userEmail);
      });
    }
  };

  const onSearchInputChange = (queryString: string) => {
    console.log("Parent: onSearchInputChange", queryString);
    setSearchQuery(queryString);
  };

  // const onFilterByCategory = (arrayOfTags: string[]) => {
  //   setTags(arrayOfTags);
  // };

  const handleFilterListByCategoryBoxes = (arrayOfTags: string[]) => {
    //prettier-ignore
    setTags(arrayOfTags);
    if (arrayOfTags.length === 0) {
      setFilteredList(inventoryList);
      console.log("handleFilterListByCategoryBoxes (if): ", filteredList);
    } else {
      // const filteredList = inventoryList.filter((entry) => arrayOfTags.some((tag) => entry.tags.includes(tag)));
      // setFilteredList(filteredList);
      // console.log("handleFilterListByCategoryBoxes (else): ", filteredList);
      setFilteredList((prevfilteredList) => {
        return prevfilteredList.filter((entry) => arrayOfTags.some((tag) => entry.tags.includes(tag)));
      });
      console.log("handleFilterListByCategoryBoxes (else): ", filteredList);
    }
  };

  const handleFilterListBySearchString = () => {
    if (searchQuery !== "") {
      setFilteredList((prevfilteredList) => {
        return prevfilteredList.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
      });
      // const filteredResultsByQuery = filteredList.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
      // setFilteredList(filteredResultsByQuery);
    } else {
      setFilteredList(inventoryList);
    }
  };

  // const handleFilterListCombined = () => {
  //   if (tagsToFilter.length === 0) {
  //     setFilteredList(inventoryList);
  //     console.log("handleFilteredListCombined(if 1) - no tags", filteredList);
  //   }
  //   if (tagsToFilter.length > 0) {
  //     const tempFilteredList = filteredList.filter((entry) => tagsToFilter.some((tag) => entry.tags.includes(tag)));
  //     setFilteredList(tempFilteredList);
  //     console.log("handleFilteredListCombined(if 3) - have tags", filteredList);
  //   }
  //   if (searchQuery === "") {
  //     setFilteredList(inventoryList);
  //     console.log("handleFilteredListCombined(if 2) - no search", filteredList);
  //   }
  //   if (searchQuery !== "") {
  //     const filteredResultsByQuery = filteredList.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  //     setFilteredList(filteredResultsByQuery);
  //     console.log("handleFilteredListCombined(if 4) - have search", filteredList);
  //   }
  // };
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
    if (itemToReturn.isCheckedOut === true && itemToReturn.checkedOutBy === currentUser!.userEmail) {
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
  let headerPanel = <Header onSearchInputChange={onSearchInputChange} />;
  let leftSidePanel = (
    <CategoryPanel
      tags={tagsToFilter}
      subjectTagChecklist={subjectTagChecklist}
      purposeTagChecklist={purposeTagChecklist}
      onCategorySelection={handleFilterListByCategoryBoxes}
    />
  );
  let centerPanel = null;
  let rightSidePanel = null;

  if (currentUser) {
    rightSidePanel = (
      <UserInfoPanel user={currentUser!} itemsCheckedOutByUser={itemsCheckedOutByUser} onEntrySelection={handleChangingSelectedEntry} />
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
    <Layout>
      <>
        {headerPanel}
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
    </Layout>
  );
}

export default InventoryControl;
