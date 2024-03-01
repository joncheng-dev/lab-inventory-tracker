import { useContext, useEffect, useState } from "react";
import { UserContext } from "../helpers/UserContext.js";
import { Box, Button, Chip, Divider, Grid, Stack, useTheme } from "@mui/material";
import styled from "styled-components";
import { tokens } from "../themes.js";
import { CheckOutFormInput, Item, ItemType } from "../types/index.js";
import ChildModal from "./ChildModal.js";
import ItemCheckOutTable from "./ItemCheckOutTable.js";
import ItemReturnTable from "./ItemReturnTable.js";

//#region styles
const EntryDetailContainer = styled.div`
  padding-left: 50px;
  background-color: #282828;
  padding-top: 25px;
`;

const DetailsImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

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

const AvailabilityContainer = styled.div`
  width: 95%;
  display: grid;
  grid-template-columns: auto;
  column-gap: 1rem;
  row-gap: 0.25rem;
`;

const StyledInfoItem = styled.div`
  display: grid;
  grid-template-columns: auto;
  font-size: 1rem;
  text-align: left;
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

type ItemTypeEntryDetailProps = {
  entry: ItemType;
  itemList: Item[]; // Used to tally up quantity for each itemType
  // onClickingExit: () => void;
};

export default function ItemTypeEntryDetail(props: ItemTypeEntryDetailProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentUser = useContext(UserContext);
  const { entry, itemList } = props;
  const [quantity, setQuantity] = useState(0);
  const [quantAvail, setQuantAvail] = useState<number>(0);
  // prettier-ignore
  const {
    id,
    displayName,
    description,
    location,
    tags,
    type,
  } = entry;

  console.log("InventoryEntryDetail, currentUser.userEmail: ", currentUser?.userEmail);

  console.log("InventoryEntryDetail, itemList: ", itemList);
  console.log("InventoryEntryDetail, type: ", type);
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
  }, [itemList, type]);

  const handleCheckoutItems = (data: CheckOutFormInput) => {
    console.log("InventoryEntryDetail, data: ", data);
    // Calls on the mutations to query firebase -- do a batch write edit
    // Takes in the quantity of items the user wishes to check out.

    // -- Randomize the ones to be checked out using ItemList (from here, grab X number of Ids);
    // Batch write to those ids
    // Update these fields:
    // checkedOutBy: userEmail
    // dateCheckedOut: Date
    // isCheckedOut: true
  };

  return (
    <>
      <h2>{displayName}</h2>
      <EntryDetailContainer>
        <Box sx={{ flexGrow: 1, backgroundColor: colors.primary[400] }}>
          <Grid container spacing={2}>
            <Grid container xs={7} item>
              {/* <Box
                sx={{
                  "& .MuiTextField-root": { m: 1.5, width: "50ch" },
                }}
              > */}
              <Grid xs={8} container item>
                <h4>Inventory Entry Detail</h4>
                <Divider />
                <br />
                <Grid xs={12} item>
                  <DetailsImageContainer>
                    <Box component="img" sx={{ height: 180 }} src="src/images/contemplative-reptile.jpg" alt="green iguana" />
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
              </Grid>
              {/* </Box> */}
              <Grid xs={4} item>
                <h4>Categories</h4>
                <Divider />
                <br />
                <StyledStack>{tags && tags.map((tag, index) => <Chip key={index} label={tag} size="medium" />)}</StyledStack>
              </Grid>
            </Grid>
            <Grid xs={5} pt={1} item>
              <h4>Availability Status</h4>
              <Divider />
              <br />
              <AvailabilityContainer>
                <ItemCheckOutTable quantAvail={quantAvail} onFormSubmit={handleCheckoutItems} />
                {/* <ItemReturnTable itemList={itemList} /> */}
              </AvailabilityContainer>
            </Grid>
          </Grid>
          {/* <Box display="flex" justifyContent="space-between" p={1}>
            <Box display="flex" borderRadius="3px" p={2}>
              <Stack spacing={2} direction="row">
                <Button onClick={onClickingEdit} variant="contained">
                  Edit entry
                </Button>
                <ChildModal entryId={id!} onClickingDelete={onClickingDelete} />
                <Button onClick={onClickingExit} variant="contained">
                  Exit
                </Button>
              </Stack>
            </Box>
            <Box display="flex" borderRadius="3px" p={2}>
              <Stack spacing={2} direction="row">
                {!isCheckedOut ? (
                  <Button onClick={() => onClickingCheckout()} variant="contained">
                    Check Out
                  </Button>
                ) : (
                  <Button disabled variant="contained">
                    Check Out
                  </Button>
                )}
                {currentUser?.userEmail === checkedOutBy ? (
                  <Button onClick={() => onClickingReturn(id!)} variant="contained">
                    Return
                  </Button>
                ) : (
                  <Button disabled variant="contained">
                    Return
                  </Button>
                )}
              </Stack>
            </Box>
          </Box> */}
          <br />
        </Box>
      </EntryDetailContainer>
    </>
  );
}
