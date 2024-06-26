// Outside
import { useState, useEffect } from "react";
import { sharedInfo } from "../helpers/UserContext";
// Styling / MUI
import { Grid, Snackbar, SnackbarContent } from "@mui/material";
import BasicModal from "../components/BasicModal.js";
import { CategoryColumn, UserInfoColumn } from "../style/styles.js";
// Components
import Header from "../components/Header.js";
import CategoryPanel from "../components/CategoryPanel.js";
import UserInfoPanel from "../components/UserInfoPanel.js";
import ItemForm from "../components/ItemForm.js";
import ItemList from "../components/ItemList.js";
import InventoryEntryDetail from "../components/InventoryEntryDetail";
// Types & Context
import { AddItemsForm, Item, ItemType } from "../types/index.js";
import { useTheme } from "@mui/material/styles";
// Database
import { addMultipleDocs } from "../hooks/mutations.js";
// Helper Functions
import { useFilterList } from "../helpers/SearchAndFilter.js";

interface SnackbarState {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  message: string;
  color: string;
}

export default function InventoryControl() {
  // STATE & SHARED INFORMATION
  const userProvider = sharedInfo();
  const theme = useTheme();
  // For conditional rendering:
  const [addItemFormVisible, setAddFormVisibility] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<ItemType | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  // For notifications
  const [notification, setNotificationOpen] = useState<SnackbarState>({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "All items of type successfully removed from inventory.",
    color: `${theme.palette.primary.main}`,
  });

  // For data:
  const [itemsCheckedOutByUser, setItemsCheckedOutByUser] = useState<Item[]>([]);
  const {
    onSearchInputChange,
    tagsToFilter,
    subjectTagChecklist,
    purposeTagChecklist,
    onFilterByCategory,
    itemList,
    itemTypeList,
    filteredItemTypeList,
    itemTypeListForForms,
  } = useFilterList();

  useEffect(() => {
    if (userProvider?.currentUser) {
      handleMakeUserItemList();
    }
  }, [itemList]);

  useEffect(() => {
    if (selectedEntry) {
      handleChangingSelectedEntry(selectedEntry.id!);
    }
  }, [itemTypeList, selectedEntry]);
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

  //#endregion functions

  //#region functions updating database
  const handleAddingNewItems = async (data: AddItemsForm) => {
    addMultipleDocs("items", data);
    setAddFormVisibility(false);
    setIsOpen(false);
    handleNotification("Item(s) successfully added to inventory.");
  };
  //#endregion functions updating database

  const handleModalClose = () => {
    setSelectedEntry(null);
    setIsOpen(false);
  };

  const handleNotification = (message: string) => {
    setNotificationOpen({
      ...notification,
      open: true,
      message: message,
      color: `${theme.palette.primary.main}`,
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
      <Header
        onSearchInputChange={onSearchInputChange}
        // For CategoryPanel
        tagsToFilter={tagsToFilter}
        onFilterByCategory={onFilterByCategory}
        // For UserInfoPanel
        listOfItemTypes={itemTypeList}
        itemsCheckedOutByUser={itemsCheckedOutByUser}
        onEntryClick={handleChangingSelectedEntry}
      />
      <Grid container pt={2} spacing={1}>
        <Grid item xs={12} sm={4} md={3} lg={2} sx={{ display: { xs: "none", sm: "block" } }}>
          <CategoryColumn>
            <CategoryPanel
              tags={tagsToFilter}
              subjectTagChecklist={subjectTagChecklist}
              purposeTagChecklist={purposeTagChecklist}
              onCategorySelection={onFilterByCategory}
            />
          </CategoryColumn>
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={7.5}>
          <Grid item display="block" ml={2} mr={2}>
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
              itemList={itemList}
              listOfItemTypes={filteredItemTypeList}
              onEntryClick={handleChangingSelectedEntry}
              onClickingAddEntry={handleAddItemButtonClick}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2.5} sx={{ display: { xs: "none", lg: "block" } }}>
          <UserInfoColumn>
            <UserInfoPanel
              // prettier-ignore
              listOfItemTypes={itemTypeList}
              itemsCheckedOutByUser={itemsCheckedOutByUser}
              onEntryClick={handleChangingSelectedEntry}
            />
          </UserInfoColumn>
        </Grid>
      </Grid>
      <BasicModal
        open={isOpen}
        onClose={() => {
          handleExitButtonClick();
        }}
      >
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
