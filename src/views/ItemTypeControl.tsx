// Outside
import { useState, useEffect, useMemo } from "react";
import { sharedInfo } from "../helpers/UserContext";
// Styling
import { Grid } from "@mui/material";
import BasicModal from "../components/BasicModal.js";
import { FixedWidthItem } from "../style/styles.js";
// Components
import Header from "../components/Header.js";
import CategoryPanel from "../components/CategoryPanel.js";
import ItemTypeList from "../components/ItemTypeList.js";
import ItemTypeForm from "../components/ItemTypeForm.js";
import ItemTypeEntryDetail from "../components/ItemTypeEntryDetail.js";
// Types & Context
import { ItemType } from "../types/index.js";
// Database
import { addNewDoc, deleteExistingDoc, editExistingDoc } from "../hooks/mutations.js";
// Helper Functions
import { filterList } from "../helpers/SearchAndFilter.js";
import useDBHook from "../hooks/useDBHook.js";

function ItemTypeControl() {
  // STATE & SHARED INFORMATION
  const userProvider = sharedInfo();
  // For conditional rendering:
  const [addTypeFormVisible, setAddTypeFormVisibility] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<ItemType | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  // For data:
  const [tagsToFilter, setTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { itemTypeList, error } = useDBHook();
  const filteredItemTypeList = useMemo(() => {
    if (tagsToFilter.length === 0 && searchQuery === "") {
      return itemTypeList;
    }
    return filterList(itemTypeList, searchQuery, tagsToFilter);
  }, [itemTypeList, searchQuery, tagsToFilter]);

  // Miscellaneous:
  const subjectTagChecklist: string[] = ["Biology", "Chemistry", "Earth Science", "Physics", "General"];
  const purposeTagChecklist: string[] = ["Equipment", "Glassware", "Materials", "Measurement", "Models", "Safety", "Tools"];

  //#region useEffect hooks
  useEffect(() => {
    if (selectedEntry) {
      handleChangingSelectedEntry(selectedEntry.id!);
    }
  }, [itemTypeList, selectedEntry]);
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

  const onFilterByCategory = (arrayOfTags: string[]) => {
    setTags(arrayOfTags);
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
              listOfEntries={filteredItemTypeList}
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
