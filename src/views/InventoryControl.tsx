// Outside
import { useState, useEffect, useContext } from "react";
import { db } from "../firebase.js";
import { collection, onSnapshot } from "firebase/firestore";
// Styling
import { Grid } from "@mui/material";
import BasicModal from "../components/BasicModal.js";
import { FixedWidthItem } from "../style/styles.js";
// Components
import Header from "../components/Header.js";
import CategoryPanel from "../components/CategoryPanel.js";
import UserInfoPanel from "../components/UserInfoPanel.js";
import ItemForm from "../components/ItemForm.js";
import ItemList from "../components/ItemList.js";
// Types & Context
import { AddItemsForm, Item, ItemType } from "../types/index.js";
import { UserContext } from "../helpers/UserContext.js";
// Database
import { addMultipleDocs } from "../hooks/mutations.js";
// Helper Functions
import { filterList } from "../helpers/SearchAndFilter.js";

export default function InventoryControl() {
  // STATE & SHARED INFORMATION
  const currentUser = useContext(UserContext);
  // For conditional rendering:
  const [addItemFormVisible, setAddFormVisibility] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<Item | ItemType | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  // For data:
  const [itemList, setItemList] = useState<Item[]>([]);
  const [itemTypeList, setItemTypeList] = useState<ItemType[]>([]);
  const [tagsToFilter, setTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredList, setFilteredList] = useState<ItemType[]>([]);

  // Miscellaneous:
  const [error, setError] = useState<string | null>(null);
  const subjectTagChecklist: string[] = ["Biology", "Chemistry", "Earth Science", "Physics", "General"];
  const purposeTagChecklist: string[] = ["Equipment", "Materials", "Models", "Safety"];

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
          });
        });
        setItemTypeList(entries);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

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
  }, [itemList, selectedEntry]);

  useEffect(() => {
    handleFilterList(itemTypeList, searchQuery, tagsToFilter);
  }, [itemList, searchQuery, tagsToFilter]);

  //#endregion useEffect hooks

  //#region functions
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
    const selection = itemList.filter((entry) => entry.id === id)[0];
    setSelectedEntry(selection);
    setIsOpen(true);
  };

  const handleEditEntryButtonClick = () => {
    setEditing(!editing);
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
  const handleAddingNewItems = async (data: AddItemsForm) => {
    addMultipleDocs("items", data);
    setAddFormVisibility(false);
    setIsOpen(false);
  };

  // const handleEditingItemType = async (entry: Item) => {
  //   editExistingDoc("itemTypes", entry);
  //   setEditing(false);
  // };

  // console.log("InventoryControl, itemTypeList: ", itemTypeList);

  // const handleDeletingItemType = async (id: string) => {
  //   deleteExistingDoc("itemTypes", id);
  //   setIsOpen(false);
  //   setSelectedEntry(null);
  // };
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
          <Grid display="flex" justifyContent="space-between">
            <ItemList
              // prettier-ignore
              listOfItems={itemList}
              listOfItemTypes={filteredList}
              onEntryClick={handleChangingSelectedEntry}
              onClickingAddEntry={handleAddItemButtonClick}
            />
          </Grid>
        </Grid>
        <Grid item xs={2.5}>
          <FixedWidthItem>{<h3>User Info Panel</h3>}</FixedWidthItem>
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
        {isOpen && addItemFormVisible && (
          <ItemForm
            // prettier-ignore
            itemTypeList={itemTypeList}
            onFormSubmit={handleAddingNewItems}
          />
        )}
        {/* {isOpen && selectedEntry && !editing && (
          <ItemTypeEntryDetail
            // prettier-ignore
            entry={selectedEntry}
            onClickingEdit={handleEditEntryButtonClick}
            onClickingDelete={handleDeletingItemType}
          />
        )} */}
      </BasicModal>
    </>
  );
}

// NOTES**
// Purpose:
// User sees list of items actually in inventory
// User can Search for items
// User can ADD, EDIT, DELETE, CHECK OUT, RETURN items

// To add an item, MODAL opens up.
// User selects an ITEMTYPE from dropdown
// User can search for this ITEMTYPE
// User enters quantity
// Upon submission, "quantity" number of ItemType is created -- added to database
