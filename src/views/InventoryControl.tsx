import { useState, useEffect, useContext, useMemo } from "react";
import Header from "../components/Header.js";
import CategoryPanel from "../components/CategoryPanel.js";
import UserInfoPanel from "../components/UserInfoPanel.js";
import InventoryList from "../components/InventoryList.js";
import InventoryAddForm from "../components/InventoryAddForm.js";
import InventoryEntryDetail from "../components/InventoryEntryDetail.js";
import InventoryEditForm from "../components/InventoryEditForm.js";
import { db } from "../firebase";
import { collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import { styled as styledMui } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { InventoryEntry } from "../types/index.js";
import { useNavigate } from "react-router-dom";
// import useLocalStorage, { useLocalStorageProps } from "../hooks/useLocalStorage.js";
import { UserContext } from "../helpers/UserContext.js";
import BasicModal from "../components/BasicModal.js";
import InventoryForm from "../components/InventoryForm.js";

function InventoryControl() {
  //#region STYLING
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
  const [isOpen, setIsOpen] = useState(false); // For modal

  // const [currentUser, setCurrentUser] = useState<useLocalStorageProps | null>(null);
  const currentUser = useContext(UserContext);
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

  useEffect(() => {
    if (selectedEntry) {
      handleChangingSelectedEntry(selectedEntry.id!);
    }
  }, [inventoryList, selectedEntry]);

  useEffect(() => {
    if (currentUser) {
      handleMakeUserItemList();
    }
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
  const handleExitButtonClick = () => {
    if (selectedEntry) {
      setAddFormVisibility(false);
      setSelectedEntry(null);
      setEditing(false);
    } else {
      setAddFormVisibility(!addFormVisible);
    }
    setIsOpen(false);
  };

  const handleAddEntryButtonClick = () => {
    setAddFormVisibility(!addFormVisible);
    setIsOpen(true);
  };

  const handleChangingSelectedEntry = (id: string) => {
    const selection = inventoryList.filter((entry) => entry.id === id)[0];
    setSelectedEntry(selection);
    setIsOpen(true);
  };

  const handleEditEntryButtonClick = () => {
    setEditing(!editing);
  };

  const handleMakeUserItemList = () => {
    if (currentUser) {
      setItemsCheckedOutByUser(() => {
        return inventoryList.filter((entry) => entry.checkedOutBy === currentUser.userEmail);
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
    setIsOpen(false);
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
  };

  const handleDeletingEntry = async (id: string) => {
    setIsOpen(false);
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
        checkedOutBy: currentUser?.userEmail,
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

  return (
    <>
      {/* Conditional rendering */}
      <Header onSearchInputChange={onSearchInputChange} />
      <Grid container spacing={1}>
        <Grid item xs={1.5}>
          <FixedWidthItem>
            <CategoryPanel
              tags={tagsToFilter}
              subjectTagChecklist={subjectTagChecklist}
              purposeTagChecklist={purposeTagChecklist}
              onCategorySelection={onFilterByCategory}
            />
          </FixedWidthItem>
        </Grid>
        <Grid item xs={8}>
          <FixedWidthItem>
            <InventoryList listOfEntries={filteredList} onEntryClick={handleChangingSelectedEntry} onClickingAddEntry={handleAddEntryButtonClick} />
          </FixedWidthItem>
        </Grid>
        <Grid item xs={2.5}>
          <FixedWidthItem>
            {currentUser ? <UserInfoPanel itemsCheckedOutByUser={itemsCheckedOutByUser} onEntryClick={handleChangingSelectedEntry} /> : ""}
          </FixedWidthItem>
        </Grid>
      </Grid>
      <BasicModal
        open={isOpen}
        onClose={() => {
          handleExitButtonClick();
        }}
      >
        {isOpen && selectedEntry && editing && (
          <InventoryForm
            entry={selectedEntry}
            subjectTagChecklist={subjectTagChecklist}
            purposeTagChecklist={purposeTagChecklist}
            onFormSubmit={handleEditingEntryInList}
          />
        )}
        {isOpen && addFormVisible && (
          <InventoryForm
            subjectTagChecklist={subjectTagChecklist}
            purposeTagChecklist={purposeTagChecklist}
            onFormSubmit={handleAddingNewEntryToList}
          />
        )}
        {isOpen && selectedEntry && !editing && (
          <InventoryEntryDetail
            entry={selectedEntry}
            onClickingEdit={handleEditEntryButtonClick}
            onClickingCheckout={handleCheckOutItem}
            onClickingReturn={handleReturnItem}
            onClickingDelete={handleDeletingEntry}
          />
        )}
      </BasicModal>
    </>
  );
}

export default InventoryControl;
