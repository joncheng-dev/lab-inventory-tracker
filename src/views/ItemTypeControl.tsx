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
import ItemTypeList from "../components/ItemTypeList.js";
import ItemTypeForm from "../components/ItemTypeForm.js";
import ItemTypeEntryDetail from "../components/ItemTypeEntryDetail.js";
// Types & Context
import { ItemType } from "../types/index.js";
import { UserContext } from "../helpers/UserContext.js";
// Database
import { addNewDoc, deleteExistingDoc, editExistingDoc } from "../hooks/mutations.js";
// Helper Functions
import { filterList } from "../helpers/SearchAndFilter.js";

function ItemTypeControl() {
  // STATE & SHARED INFORMATION
  const currentUser = useContext(UserContext);
  // For conditional rendering:
  const [addTypeFormVisible, setAddTypeFormVisibility] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<ItemType | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false); // For modal

  // For data:
  const [itemTypeList, setItemTypeList] = useState<ItemType[]>([]);
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
  }, [itemTypeList, selectedEntry]);

  useEffect(() => {
    handleFilterList(itemTypeList, searchQuery, tagsToFilter);
  }, [itemTypeList, searchQuery, tagsToFilter]);

  //#endregion useEffect hooks

  //#region functions
  const handleExitButtonClick = () => {
    if (selectedEntry) {
      setAddTypeFormVisibility(false);
      setSelectedEntry(null);
      setEditing(false);
    } else {
      setAddTypeFormVisibility(!addTypeFormVisible);
    }
    setIsOpen(false);
  };

  const handleAddItemTypeButtonClick = () => {
    setAddTypeFormVisibility(!addTypeFormVisible);
    setIsOpen(true);
  };

  const handleChangingSelectedEntry = (id: string) => {
    const selection = itemTypeList.filter((entry) => entry.id === id)[0];
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
  const handleAddingNewItemType = async (entry: ItemType) => {
    addNewDoc("itemTypes", entry);
    setAddTypeFormVisibility(false);
    setIsOpen(false);
  };

  const handleEditingItemType = async (entry: ItemType) => {
    editExistingDoc("itemTypes", entry);
    setEditing(false);
  };

  const handleDeletingItemType = async (id: string) => {
    deleteExistingDoc("itemTypes", id);
    setIsOpen(false);
    setSelectedEntry(null);
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
        <Grid item xs={7.75}>
          <Grid display="flex" justifyContent="space-between">
            <ItemTypeList
              // prettier-ignore
              listOfEntries={filteredList}
              onEntryClick={handleChangingSelectedEntry}
              onClickingAddEntry={handleAddItemTypeButtonClick}
            />
          </Grid>
        </Grid>
        <Grid item xs={2.75} pr={2}>
          <FixedWidthItem>
            {
              <>
                <h3>User Info Panel</h3>
                <p>Not applicable for Item Types</p>
              </>
            }
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
          <ItemTypeForm
            entry={selectedEntry}
            subjectTagChecklist={subjectTagChecklist}
            purposeTagChecklist={purposeTagChecklist}
            onFormSubmit={handleEditingItemType}
          />
        )}
        {isOpen && addTypeFormVisible && (
          <ItemTypeForm
            // prettier-ignore
            subjectTagChecklist={subjectTagChecklist}
            purposeTagChecklist={purposeTagChecklist}
            onFormSubmit={handleAddingNewItemType}
          />
        )}
        {isOpen && selectedEntry && !editing && (
          <ItemTypeEntryDetail
            // prettier-ignore
            entry={selectedEntry}
            onClickingEdit={handleEditEntryButtonClick}
            onClickingDelete={handleDeletingItemType}
          />
        )}
      </BasicModal>
    </>
  );
}

export default ItemTypeControl;
