import { useEffect, useState } from "react";
import { sharedInfo } from "../helpers/UserContext";
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Snackbar, SnackbarContent, Stack, useTheme } from "@mui/material";
import styled from "styled-components";
import { tokens } from "../themes.js";
import { CheckedOutBySummary, CheckOutFormInput, EditQuantityForm, Item, ItemType } from "../types/index.js";
import ChildModalEditQuant from "./ChildModalEditQuant.js";
import ItemCheckOutTable from "./ItemCheckOutTable.js";
import ItemStatusTable from "./ItemStatusTable.js";
import { addMultipleDocs, assetTrackUpdateDoc, deleteMultipleDocs } from "../hooks/mutations.js";
import {
  equipment1,
  equipment2,
  glassware1,
  glassware2,
  materials1,
  materials2,
  measurement1,
  models1,
  models2,
  models3,
  models4,
  safety1,
  safety2,
  tools1,
  tools2,
  tools3,
} from "../images";
import ChildModalDeleteAll from "./ChildModalDeleteAll.js";

//#region styles
const DetailsImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const MuiChipCustom = styled(Chip)(() => ({
  width: 150, //adding custom css styles
  height: 50,
  backgroundColor: "lightblue",
  borderRadius: 2,
  color: "white",

  "& .MuiChip-label": {
    color: "blue", //using the MUI chip label properties
    fontSize: 20,
  },

  "& .MuiChip-deleteIcon": {
    color: "blue",
    fontSize: 20,
  },
}));

const DetailsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two equal columns */
  gap: 1rem; /* Adjust the gap between columns */
`;

const StyledItemHeader = styled.p`
  font-size: 1rem;
  color: rgb(83, 167, 235);
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 0;
`;

const StyledItemValue = styled.p`
  font-size: 1rem;
  color: #ffffff;
  margin-top: 0; /* Add margin to the top of each value for spacing */
`;

const StyledInfoItem = styled.div`
  display: grid;
  grid-template-columns: auto;
  font-size: 1rem;
  text-align: left;
`;

const AvailabilityContainer = styled.div`
  width: 95%;
  display: grid;
  /* grid-template-columns: auto; */
  column-gap: 1rem;
  row-gap: 0.25rem;
`;

// const StyledItemHeader = styled.p`
//   font-size: 1rem;
//   color: rgb(83, 167, 235);
//   text-transform: uppercase;
//   font-weight: bold;
//   margin-bottom: 0;
// `;

// const StyledItemValue = styled.p`
//   font-size: 1rem;
//   color: #ffffff;
// `;

const StyledStack = styled(Stack)`
  display: flex;
  flex-wrap: wrap;
`;

const TextAlignLeftContainer = styled.div`
  /* text-align: left; */
`;
//#endregion styles

const imageDictionary: Record<string, string> = {
  equipment1,
  equipment2,
  glassware1,
  glassware2,
  materials1,
  materials2,
  measurement1,
  models1,
  models2,
  models3,
  models4,
  safety1,
  safety2,
  tools1,
  tools2,
  tools3,
};

interface SnackbarState {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  message:
    | "Items checked out successfully!"
    | "Total quantity updated successfully."
    | "New quantity is equal to current. No changes made."
    | "Cannot remove items that are checked out."
    | "Unable to delete items. All items need to be returned first."
    | "All items of type successfully removed from inventory.";
  color: "#4caf50" | "#FFFF00" | "#ff0f0f";
}

type ItemTypeEntryDetailProps = {
  entry: ItemType;
  itemList: Item[]; // Used to tally up quantity for each itemType
  onSuccessfulDelete: (message: string) => void;
  onCloseModal: () => void;
};

export default function ItemTypeEntryDetail(props: ItemTypeEntryDetailProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const userProvider = sharedInfo();
  const { entry, itemList, onSuccessfulDelete, onCloseModal } = props;
  const [quantity, setQuantity] = useState(0);
  const [quantAvail, setQuantAvail] = useState<number>(0);
  const [checkedOutBySummary, setCheckedOutBySummary] = useState<CheckedOutBySummary[]>([]);
  const [notification, setNotificationOpen] = useState<SnackbarState>({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "Items checked out successfully!",
    color: "#4caf50",
  });
  const [childModalNotification, setChildModalNotification] = useState<SnackbarState>({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "Unable to delete items. All items need to be returned first.",
    color: "#4caf50",
  });
  // prettier-ignore
  const {
    id,
    displayName,
    description,
    location,
    tags,
    type,
    image,
  } = entry;

  // console.log("InventoryEntryDetail, currentUser.userEmail: ", currentUser?.userEmail);

  // console.log("InventoryEntryDetail, itemList: ", itemList);
  // console.log("InventoryEntryDetail, type: ", type);
  useEffect(() => {
    const itemCounter = () => {
      const count = itemList.filter((item) => item.type === type).length;
      setQuantity(count);
    };
    itemCounter();
  }, [itemList, type]);

  useEffect(() => {
    const quantityAvailCounter = () => {
      const numAvailable = itemList
        // prettier-ignore
        .filter((item) => item.type === type)
        .filter((item) => !item.isCheckedOut).length;
      setQuantAvail(numAvailable);
    };
    quantityAvailCounter();
  }, [itemList, type, quantAvail]);

  useEffect(() => {
    currentlyCheckedOutItems();
  }, [itemList]);

  const handleCloseSnackbar = () => {
    setNotificationOpen({ ...notification, open: false });
  };

  const currentlyCheckedOutItems = () => {
    const itemsOfTargetType = itemList.filter((item) => item.type === type);
    const checkedOutByMap = new Map();

    itemsOfTargetType.forEach((item) => {
      const { checkedOutBy } = item;
      if (checkedOutBy) {
        if (checkedOutByMap.has(checkedOutBy)) {
          checkedOutByMap.set(checkedOutBy, checkedOutByMap.get(checkedOutBy) + 1);
        } else {
          checkedOutByMap.set(checkedOutBy, 1);
        }
      }
    });
    const summary: CheckedOutBySummary[] = Array.from(checkedOutByMap.entries()).map(([checkedOutBy, quantity]) => ({
      checkedOutBy,
      quantity,
    }));
    // console.log("InventoryEntryDetail, currentlyCheckedOutItems, summary: ", summary);
    setCheckedOutBySummary(summary);
  };

  function randomItemPicker(numItemsAvailable: number, numItemsToSelect: number) {
    let randomlySelectedIds = new Set<number>(),
      ans;
    while (randomlySelectedIds.size < numItemsToSelect) {
      randomlySelectedIds.add(Math.floor(Math.random() * numItemsAvailable));
    }
    ans = [...randomlySelectedIds];
    return ans;
  }

  const handleUpdateQuantity = (data: EditQuantityForm) => {
    if (data.quantity > quantity) {
      const quantDifference = data.quantity - quantity;
      const itemData = {
        type: type,
        displayName: displayName,
        quantity: quantDifference,
      };
      addMultipleDocs("items", itemData);
      setNotificationOpen({ ...notification, open: true, message: "Total quantity updated successfully.", color: "#4caf50" });
    } else if (data.quantity === quantity) {
      setNotificationOpen({ ...notification, open: true, message: "New quantity is equal to current. No changes made.", color: "#FFFF00" });
    } else {
      // Here, we will be removing items.
      console.log("New quantity: specified by user -- data.quantity: ", data.quantity); // data.quantity is new quantity specified by user
      console.log("Current quantity of items total -- quantity: ", quantity); // quantity is current number of items total
      console.log("Num of items able to be deleted -- quantAvail: ", quantAvail); // quantAvail is num of items able to be deleted
      // DELETE ITEMS
      const quantToDelete = quantity - data.quantity; // This is how many that will be (attempted to be) deleted.
      const itemsThatCanBeDeleted = itemList
        // prettier-ignore
        .filter((item) => item.type === type)
        .filter((item) => !item.isCheckedOut);
      console.log("itemsThatCanBeDeleted: ", itemsThatCanBeDeleted);
      const itemIdsThatCanBeDeleted = itemList
        // prettier-ignore
        .filter((item) => item.type === type && !item.isCheckedOut)
        .map((item) => item.id);
      console.log("itemIdsThatCanBeDeleted: ", itemIdsThatCanBeDeleted);
      // quantAvail --> Number not checked out
      if (quantAvail >= quantToDelete) {
        console.log("quantAvail >= quantToDelete, quantAvail: ", quantAvail);
        console.log("quantAvail >= quantToDelete, quantToDelete: ", quantToDelete);
        // Can delete all needed. Delete only if not checked out (specific ids)
        // Randomize the ids being sent to delete.
        const randomNumbers: number[] = randomItemPicker(quantAvail, quantToDelete);
        // randomNumbers = [0, 1, 3];
        // Look through list of deletable items, select the entries matching index positions.
        const itemsId = randomNumbers.map((index) => itemsThatCanBeDeleted[index].id);
        console.log("itemsId that are chosen to be deleted: ", itemsId);
        // Make the call to delete these items matching elements in itemsId array
        deleteMultipleDocs("items", itemsId as string[]);
        setNotificationOpen({ ...notification, open: true, message: "Total quantity updated successfully.", color: "#4caf50" });
      } else {
        // Cannot delete all required. Will only delete ALL quantAvail(specific ids)
        // quantAvail < quantToDelete
        // Thus, delete only all quantAvail
        deleteMultipleDocs("items", itemIdsThatCanBeDeleted as string[]);
        setNotificationOpen({ ...notification, open: true, message: "Cannot remove items that are checked out.", color: "#ff0f0f" });
      }
    }
  };

  const handleCheckoutItems = (data: CheckOutFormInput) => {
    // Randomize index positions we are interested in -- stored in an array.
    const userEmail = userProvider?.currentUser?.email || "";
    const randomNumbers: number[] = randomItemPicker(quantAvail, data.quantity);
    // randomNumbers = [0, 1, 3];
    // Looks through the collection of items, filters type matching itemType.
    const itemsOfTargetType = itemList.filter((item) => item.type === type).filter((item) => !item.isCheckedOut);
    // Look through list itemsOfTargetType, select the entries matching index positions.
    const itemsId = randomNumbers.map((index) => itemsOfTargetType[index].id);
    // Calls on the mutations to query firebase -- do a batch write edit
    assetTrackUpdateDoc("items", userEmail, itemsId as string[], "checkOut");
    // Report back that items were successfully checked out.
    setNotificationOpen({ ...notification, open: true, message: "Items checked out successfully!", color: "#4caf50" });
  };

  const handleReturnItems = () => {
    const userEmail = userProvider?.currentUser?.email || "";
    // console.log("InventoryEntryDetail, handleReturnItems, button clicked: ");
    // The currently viewed itemType -- being displayed on InventoryEntryDetail
    // If currently viewed itemList has items of itemType,
    const itemsOfTargetTypeCheckedOutByUser = itemList
      .filter((item) => item.type === type)
      .filter((item) => item.checkedOutBy === userProvider?.currentUser?.email);
    // AND checkedOutBy === userEmail,
    const itemIdsToReturn = itemsOfTargetTypeCheckedOutByUser.map((item) => item.id);
    // console.log("InventoryEntryDetail, handleReturnItems, currentUser.userEmail: ", currentUser?.userEmail);
    assetTrackUpdateDoc("items", userEmail, itemIdsToReturn as string[], "return");
  };

  // Delete all of specified item type
  const handleDeletingAllOfItemType = async () => {
    console.log("delete button clicked");
    console.log("entry is of type: ", entry?.type);
    console.log("itemList is: ", itemList);
    const checkedOutCount = itemList
      // prettier-ignore
      .filter((item) => item.type === entry?.type)
      .filter((item) => item.isCheckedOut === true).length;
    console.log("handleDeletingAllOfItemType, checkedOutCount: ", checkedOutCount);
    //    If > 0, show message that it cannot be done, do not delete anything
    if (checkedOutCount > 0) {
      // Show error notification.
      setChildModalNotification({
        ...childModalNotification,
        open: true,
        message: "Unable to delete items. All items need to be returned first.",
        color: "#ff0f0f",
      });
      // This is fine now. No need to modify further.
      console.log("Cannot delete all, checkedOutCount > 0, Count is: ", checkedOutCount);
    }
    //    If === 0 checked out, allow deletion, show message success
    if (checkedOutCount === 0) {
      console.log("Delete all possible, checkedOutCount === 0, Count is: ", checkedOutCount);
      // setSelectedEntry(null);
      const toBeDeleted = itemList.filter((item) => item.type === entry?.type).map((item) => item.id);
      await deleteMultipleDocs("items", toBeDeleted as string[]);
      onSuccessfulDelete("All items of type successfully removed from inventory.");
      onCloseModal();
    }
  };

  // const handleCloseChildModalNotification = () => {
  //   setChildModalNotification({
  //     ...childModalNotification,
  //     open: true,
  //   });
  // };

  return (
    <>
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
      <Box pt={0.2} sx={{ display: "flex", flexGrow: 1, alignContent: "center", backgroundColor: colors.primary[400] }}>
        <Grid container spacing={2} pt={1}>
          <Grid xs={7} item pt={1}>
            <Card sx={{ backgroundColor: colors.primary[400] }}>
              <CardContent>
                <h4>Entry Details</h4>
                <Divider />
                <br />
                <Grid xs={12} item>
                  <DetailsImageContainer>
                    <Box component="img" sx={{ maxHeight: 180, maxWidth: 180 }} src={imageDictionary[image]} alt="selected image" />
                  </DetailsImageContainer>
                </Grid>
                <Grid item xs={12}>
                  <h5>Categories</h5>
                  <Divider />
                  <br />
                  <StyledStack>
                    {!tags && <p>No tags to display</p>}
                    {tags &&
                      tags.map((tag, index) => <Chip key={index} label={tag} size="medium" variant="outlined" sx={{ fontSize: 15, m: 0.5 }} />)}
                  </StyledStack>
                </Grid>
                <Grid xs={6} item>
                  <StyledItemHeader>Display Name</StyledItemHeader>
                  <StyledItemValue>{displayName}</StyledItemValue>
                </Grid>
                <Grid xs={6} item>
                  <StyledItemHeader>Type</StyledItemHeader>
                  <StyledItemValue>{type}</StyledItemValue>
                </Grid>
                <Grid xs={12} item>
                  <StyledItemHeader>Description</StyledItemHeader>
                  <StyledItemValue>{description}</StyledItemValue>
                </Grid>
                <Grid xs={6} item>
                  <StyledItemHeader>Location</StyledItemHeader>
                  <StyledItemValue>{location}</StyledItemValue>
                </Grid>
                <Grid xs={6} item>
                  <StyledItemHeader>Total Quantity</StyledItemHeader>
                  <StyledItemValue>{quantity}</StyledItemValue>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={5} item>
            <Card sx={{ backgroundColor: colors.primary[400], marginBottom: 3 }}>
              <CardContent>
                <h4>Availability Status</h4>
                <Divider />
                <br />
                <AvailabilityContainer>
                  <ItemCheckOutTable quantAvail={quantAvail} onFormSubmit={handleCheckoutItems} />
                  <ItemStatusTable summary={checkedOutBySummary} />
                  <Box display="flex" justifyContent="space-between" pt={1}>
                    <Grid item xs={12} sx={{ direction: "row", textAlign: "right" }}>
                      {itemList.some((item) => type === item.type && item.checkedOutBy === userProvider?.currentUser?.email) ? (
                        <Button onClick={handleReturnItems} variant="contained">
                          Return
                        </Button>
                      ) : (
                        <Button disabled variant="contained">
                          Return
                        </Button>
                      )}
                    </Grid>
                  </Box>
                </AvailabilityContainer>
              </CardContent>
            </Card>
            <Card sx={{ backgroundColor: colors.primary[400] }}>
              <CardContent>
                <Grid xs={12} container item spacing={2}>
                  <Grid item>
                    {userProvider?.currentUser?.isAdmin && <ChildModalEditQuant quantTotal={quantity} onFormSubmit={handleUpdateQuantity} />}
                  </Grid>
                  <Grid item>{userProvider?.currentUser?.isAdmin && <ChildModalDeleteAll onClickingDelete={handleDeletingAllOfItemType} />}</Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <br />
      </Box>
    </>
  );
}
