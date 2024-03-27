// Outside
import { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { collection, onSnapshot } from "firebase/firestore";
import { sharedInfo } from "../helpers/UserContext";
// Styling / MUI
import { Grid, Snackbar, SnackbarContent } from "@mui/material";
import BasicModal from "../components/BasicModal.js";
import { FixedWidthItem } from "../style/styles.js";
// Components
import Header from "../components/Header.js";
import CategoryPanel from "../components/CategoryPanel.js";
import UserInfoPanel from "../components/UserInfoPanel.js";
import ItemForm from "../components/ItemForm.js";
import ItemList from "../components/ItemList.js";
import InventoryEntryDetail from "../components/InventoryEntryDetail";
// Types & Context
import { AddItemsForm, Item, ItemType } from "../types/index.js";
// Database
import { addMultipleDocs } from "../hooks/mutations.js";
// Helper Functions
import { filterList } from "../helpers/SearchAndFilter.js";

interface SnackbarState {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  message: string;
  color: "#4caf50" | "#FFFF00" | "#ff0f0f";
}

export default function InventoryControl() {
  // STATE & SHARED INFORMATION
  const userProvider = sharedInfo();
  // For conditional rendering:
  const [addItemFormVisible, setAddFormVisibility] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<ItemType | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotificationOpen] = useState<SnackbarState>({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "All items of type successfully removed from inventory.",
    color: "#4caf50",
  });
  // For data:
  const [itemList, setItemList] = useState<Item[]>([]);
  const [itemTypeList, setItemTypeList] = useState<ItemType[]>([]);
  const [itemTypeListForForms, setItemTypeListForForms] = useState<ItemType[]>([]);
  const [itemsCheckedOutByUser, setItemsCheckedOutByUser] = useState<Item[]>([]);
  const [tagsToFilter, setTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredList, setFilteredList] = useState<ItemType[]>([]);

  // Miscellaneous:
  const [error, setError] = useState<string | null>(null);
  const subjectTagChecklist: string[] = ["Biology", "Chemistry", "Earth Science", "Physics", "General"];
  const purposeTagChecklist: string[] = ["Equipment", "Glassware", "Materials", "Measurement", "Models", "Safety", "Tools"];

  //#region useEffect hooks
  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "items"),
      (collectionSnapshot) => {
        const entries: Item[] = [];
        collectionSnapshot.forEach((entry) => {
          entries.push({
            id: entry.id,
            type: entry.data().type,
            displayName: entry.data().displayName,
            isCheckedOut: entry.data().isCheckedOut,
            checkedOutBy: entry.data().checkedOutBy,
            dateCheckedOut: entry.data().dateCheckedOut,
          });
        });
        setItemList(entries);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "itemTypes"),
      (collectionSnapshot) => {
        const entries: ItemType[] = [];
        collectionSnapshot.forEach((entry) => {
          entries.push({
            id: entry.id,
            displayName: entry.data().displayName,
            location: entry.data().location,
            description: entry.data().description,
            tags: entry.data().tags,
            type: entry.data().type,
            image: entry.data().image,
          });
        });
        setItemTypeList(entries);
        setItemTypeListForForms(entries);
        console.log("InventoryControl, entries: ", entries);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  useEffect(() => {
    if (userProvider?.currentUser) {
      handleMakeUserItemList();
      console.log("InventoryControl, itemList: ", itemList);
      console.log("InventoryControl, itemsCheckedOutByUser: ", itemsCheckedOutByUser);
    }
  }, [itemList]);

  useEffect(() => {
    const itemEntriesToDisplay = () => {
      // Create a SET of item 'type'.
      const setOfTypes = [...new Set(itemList.map((entry) => entry.type))];
      const filteredItemTypes = itemTypeList
        .filter((entry) => setOfTypes.includes(entry.type || ""))
        .filter((entry): entry is ItemType => entry !== undefined);
      setItemTypeList(filteredItemTypes);
    };
    itemEntriesToDisplay();
  }, [itemList]);

  useEffect(() => {
    if (selectedEntry) {
      handleChangingSelectedEntry(selectedEntry.id!);
    }
  }, [itemTypeList, selectedEntry]);

  useEffect(() => {
    handleFilterList(itemTypeList, searchQuery, tagsToFilter);
  }, [itemTypeList, searchQuery, tagsToFilter]);

  //#endregion useEffect hooks

  //#region functions
  const handleMakeUserItemList = () => {
    if (userProvider?.currentUser) {
      setItemsCheckedOutByUser(() => {
        return itemList.filter((entry) => entry.checkedOutBy === userProvider.currentUser?.email);
      });
    }
  };

  const handleExitButtonClick = () => {
    if (selectedEntry) {
      setAddFormVisibility(false);
      setSelectedEntry(null);
      setEditing(false);
    } else {
      setAddFormVisibility(!addItemFormVisible);
    }
    setIsOpen(false);
  };

  const handleAddItemButtonClick = () => {
    setAddFormVisibility(!addItemFormVisible);
    setIsOpen(true);
  };

  const handleChangingSelectedEntry = (id: string) => {
    const selection = itemTypeList.filter((entry) => entry.id === id)[0];
    setSelectedEntry(selection);
    setIsOpen(true);
  };

  // Helper -- Search & Filter
  const onSearchInputChange = (queryString: string) => {
    setSearchQuery(queryString);
  };

  // Helper -- Search & Filter
  const onFilterByCategory = (arrayOfTags: string[]) => {
    setTags(arrayOfTags);
  };

  // Helper -- Search & Filter
  const handleFilterList = (list: ItemType[], query: string, tags: string[]) => {
    const filteredResult = filterList(list, query, tags);
    setFilteredList(filteredResult);
  };

  //#endregion functions

  //#region functions updating database
  // functions updating database
  // const handleAddingNewItems = async (data: AddItemsForm) => {
  //   addMultipleDocs("items", data);
  //   setAddFormVisibility(false);
  //   setIsOpen(false);
  // };
  const handleAddingNewItems = async (data: AddItemsForm) => {
    try {
      // Add new items to the database
      await addMultipleDocs("items", data);

      // Update the itemList state with the newly added items
      const newItems: Item[] = [];
      for (let i = 0; i < data.quantity; i++) {
        const newItem: Item = {
          id: `temp_${i}`, // You can set a temporary ID here or generate one from the database
          type: data.type,
          displayName: data.displayName,
          isCheckedOut: false,
          checkedOutBy: null,
          dateCheckedOut: null,
        };
        newItems.push(newItem);
      }
      setItemList((prevItemList) => [...prevItemList, ...newItems]);

      // Close the modal
      setAddFormVisibility(false);
      setIsOpen(false);

      // Show notification
      handleNotification("Item(s) successfully added to inventory."); // You may want to customize this function to display a specific message for adding items
    } catch (error) {
      console.error("Error adding new items:", error);
    }
  };

  //#endregion functions updating database
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleNotification = (message: string) => {
    setNotificationOpen({
      ...notification,
      open: true,
      message: message,
      color: "#4caf50",
    });
  };

  const handleCloseSnackbar = () => {
    setNotificationOpen({ ...notification, open: false });
  };
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
        <Grid item xs={7.75}>
          <Grid display="flex" justifyContent="space-between">
            {notification.open && (
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={notification.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
              >
                <SnackbarContent message={notification.message} sx={{ bgcolor: notification.color }} />
              </Snackbar>
            )}
            <ItemList
              // prettier-ignore
              listOfItems={itemList}
              listOfItemTypes={filteredList}
              onEntryClick={handleChangingSelectedEntry}
              onClickingAddEntry={handleAddItemButtonClick}
            />
          </Grid>
        </Grid>
        <Grid item xs={2.75} pr={2}>
          <FixedWidthItem>
            <UserInfoPanel
              // prettier-ignore
              onEntryClick={handleChangingSelectedEntry}
              itemsCheckedOutByUser={itemsCheckedOutByUser}
              listOfItemTypes={itemTypeList}
            />
          </FixedWidthItem>
        </Grid>
      </Grid>
      <BasicModal
        open={isOpen}
        onClose={() => {
          handleExitButtonClick();
        }}
      >
        {/* {isOpen && selectedEntry && editing && (
          <ItemTypeForm
            entry={selectedEntry}
            subjectTagChecklist={subjectTagChecklist}
            purposeTagChecklist={purposeTagChecklist}
            onFormSubmit={handleEditingItemType}
          />
        )} */}
        {isOpen && addItemFormVisible && itemTypeList.length > 0 && (
          <ItemForm
            // prettier-ignore
            itemTypeList={itemTypeListForForms}
            onFormSubmit={handleAddingNewItems}
          />
        )}
        {isOpen && selectedEntry && !editing && (
          <InventoryEntryDetail
            // prettier-ignore
            entry={selectedEntry}
            itemList={itemList}
            onSuccessfulDelete={handleNotification}
            onCloseModal={handleModalClose}
          />
        )}
      </BasicModal>
    </>
  );
}

// NOTES**
// Purpose:
// User sees list of items actually in inventory
// User can Search for items
// User can ADD, EDIT, DELETE, CHECK OUT, RETURN items
