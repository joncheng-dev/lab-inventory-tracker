import { useContext, useEffect, useState } from "react";
// import { db, auth } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
import { sharedInfo } from "../helpers/UserContext";
import { Box, Button, Chip, Divider, Grid, Snackbar, SnackbarContent, SnackbarOrigin, Stack, useTheme } from "@mui/material";
import styled from "styled-components";
import { tokens } from "../themes.js";
import { CheckedOutBySummary, CheckOutFormInput, EditQuantityForm, Item, ItemType } from "../types/index.js";
import ChildModalEditQuant from "./ChildModalEditQuant.js";
import ItemCheckOutTable from "./ItemCheckOutTable.js";
import ItemStatusTable from "./ItemStatusTable.js";
import { addMultipleDocs, assetTrackUpdateDoc } from "../hooks/mutations.js";
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

//#region styles
const EntryDetailContainer = styled.div`
  /* padding-left: 10px; */
  background-color: #282828;
  /* padding-top: 25px; */
`;

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

// const DetailsContainer = styled.div`
//   float: left;
//   width: 100%;
//   display: grid;
//   grid-template-columns: auto auto;
//   column-gap: 1rem;
//   row-gap: 0.25rem;
// `;

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
  display: block;
  justify-content: "left";
`;

const TextAlignLeftContainer = styled.div`
  /* text-align: left; */
`;
//#endregion styles

// !TO DO
// Write a function that opens up a small modal.
// Modal should be titled "Edit Total Quantity" (with a tool tip that says it can modify all existing items)
// Input field for numbers.
// Update / Cancel buttons
// Write a function that properly calls database to update quantity appropriately

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

const SnackbarMessage = styled(SnackbarContent)`
  && {
    background-color: #4caf50; /* success color */
  }
`;

interface SnackbarState {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
}

type ItemTypeEntryDetailProps = {
  entry: ItemType;
  itemList: Item[]; // Used to tally up quantity for each itemType
  // onClickingExit: () => void;
};

export default function ItemTypeEntryDetail(props: ItemTypeEntryDetailProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const userProvider = sharedInfo();
  const { entry, itemList } = props;
  const [quantity, setQuantity] = useState(0);
  const [quantAvail, setQuantAvail] = useState<number>(0);
  const [checkedOutBySummary, setCheckedOutBySummary] = useState<CheckedOutBySummary[]>([]);
  const [checkoutNotification, setCheckoutNotificationOpen] = useState<SnackbarState>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [quantUpdateNotification, setQuantUpdateNotificationOpen] = useState<SnackbarState>({
    open: false,
    vertical: "top",
    horizontal: "center",
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
    setCheckoutNotificationOpen({ ...checkoutNotification, open: false });
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
    // data =
    // {
    //   "quantity": 2
    // }
    if (data.quantity > quantity) {
      // Here, we make a number of documents for the difference
      console.log("InventoryEntryDetail, data.quantity > quantAvail, data.quantity: ", data.quantity);
      console.log("InventoryEntryDetail, data.quantity > quantAvail, quantity: ", quantity);
      const quantDifference = data.quantity - quantity;
      console.log("InventoryEntryDetail, quantDifference: ", quantDifference);
      const itemData = {
        type: type,
        displayName: displayName,
        quantity: quantDifference,
      };
      addMultipleDocs("items", itemData);
      setQuantUpdateNotificationOpen({ ...quantUpdateNotification, open: true });
    } else {
      // Here, we delete a number of documents -- if they are not checked out
      console.log("InventoryEntryDetail, else, data.quantity: ", data.quantity);
      console.log("InventoryEntryDetail, else, quantity: ", quantity);
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
    setCheckoutNotificationOpen({ ...checkoutNotification, open: true });
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

  return (
    <>
      <h2>{displayName}</h2>
      <EntryDetailContainer>
        {checkoutNotification.open && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={checkoutNotification.open}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
          >
            <SnackbarMessage message="Items checked out successfully!" />
          </Snackbar>
        )}
        {quantUpdateNotification.open && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={quantUpdateNotification.open}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
          >
            <SnackbarMessage message="Quantity updated!" />
          </Snackbar>
        )}
        <Box pt={0.2} sx={{ flexGrow: 1, backgroundColor: colors.primary[400] }}>
          <Grid container spacing={2} pt={1}>
            <Grid container xs={7} item pt={1}>
              <Grid xs={8} container item pl={1.5}>
                <h4>Inventory Entry Detail</h4>
                <Divider />
                <br />
                <Grid xs={12} item>
                  <DetailsImageContainer>
                    <Box component="img" sx={{ maxHeight: 180, maxWidth: 180 }} src={imageDictionary[image]} alt="selected image" />
                  </DetailsImageContainer>
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
                <DetailsContainer></DetailsContainer>
                <Grid xs={6} item>
                  <StyledItemHeader>Location</StyledItemHeader>
                  <StyledItemValue>{location}</StyledItemValue>
                </Grid>
                <Grid xs={6} item>
                  <StyledItemHeader>Total Quantity</StyledItemHeader>
                  <StyledItemValue>{quantity}</StyledItemValue>
                </Grid>
                <Grid xs={12} item>
                  <ChildModalEditQuant quantTotal={quantity} onFormSubmit={handleUpdateQuantity} />
                </Grid>
              </Grid>
              <Grid xs={4} item>
                <h4>Categories</h4>
                <Divider />
                <br />
                <StyledStack>{tags && tags.map((tag, index) => <Chip key={index} label={tag} size="medium" sx={{ fontSize: 15 }} />)}</StyledStack>
                {/* <StyledStack>{tags && tags.map((tag, index) => <MuiChipCustom key={index} label={tag} size="medium" />)}</StyledStack> */}
              </Grid>
            </Grid>
            <Grid xs={5} item>
              <h4>Availability Status</h4>
              <Divider />
              <br />
              <AvailabilityContainer>
                <ItemCheckOutTable quantAvail={quantAvail} onFormSubmit={handleCheckoutItems} />
                <ItemStatusTable summary={checkedOutBySummary} />
                <Box display="flex" justifyContent="space-between" pt={1}>
                  {/* <Box display="flex" borderRadius="3px" p={2}>
                    <Stack spacing={2} direction="row">
                      <Button onClick={onClickingEdit} variant="contained">
                        Edit entry
                      </Button>
                      <ChildModal entryId={id!} onClickingDelete={onClickingDelete} />
                      <Button onClick={onClickingExit} variant="contained">
                        Exit
                      </Button>
                    </Stack>
                  </Box> */}
                  {/* <Box display="flex" borderRadius="3px" p={2}>
                    <Stack spacing={2} direction="row" textAlign="right"> */}
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
                  {/* </Stack>
                  </Box> */}
                </Box>
              </AvailabilityContainer>
            </Grid>
          </Grid>
          <br />
        </Box>
      </EntryDetailContainer>
    </>
  );
}
