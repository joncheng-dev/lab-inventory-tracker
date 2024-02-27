import { useContext } from "react";
import { UserContext } from "../helpers/UserContext.js";
import { Box, Button, Chip, Divider, Stack, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import { tokens } from "../themes";
import { InventoryEntry } from "../types";
import ChildModal from "./ChildModal";
import BasicTable from "./BasicTable.js";

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
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
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
  text-align: left;
`;
//#endregion styles

// Typing for Inventory Entry Details component
type InventoryEntryDetailProps = {
  entry: InventoryEntry;
  onClickingCheckout: () => void;
  onClickingReturn: (itemId: string) => void;
  onClickingEdit: () => void;
  onClickingDelete: (id: string) => void;
  // onClickingExit: () => void;
};

export default function InventoryEntryDetails(props: InventoryEntryDetailProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentUser = useContext(UserContext);
  const { entry, onClickingCheckout, onClickingReturn, onClickingEdit, onClickingDelete } = props;
  // prettier-ignore
  const {
    id,
    name,
    description,
    location,
    isCheckedOut,
    checkedOutBy,
    dateCheckedOut,
    quantity,
    tags,
  } = entry;

  console.log("InventoryEntryDetail, currentUser.userEmail: ", currentUser?.userEmail);

  return (
    <TextAlignLeftContainer>
      <h2>{name}</h2>
      <EntryDetailContainer>
        <Box sx={{ flexGrow: 1, backgroundColor: colors.primary[400] }}>
          <Grid container spacing={2}>
            <Grid container xs={7}>
              {/* <Box
                sx={{
                  "& .MuiTextField-root": { m: 1.5, width: "50ch" },
                }}
              > */}
              <Grid xs={8} container>
                <h4>Entry Details</h4>
                <Divider />
                <br />
                <Grid xs={12}>
                  <DetailsImageContainer>
                    <Box component="img" sx={{ height: 180 }} src="src/images/contemplative-reptile.jpg" alt="green iguana" />
                  </DetailsImageContainer>
                </Grid>
                <Grid xs={12}>
                  <StyledItemHeader>Description</StyledItemHeader>
                  <StyledItemValue>{description}</StyledItemValue>
                </Grid>
                <DetailsContainer></DetailsContainer>
                <Grid xs={7}>
                  <StyledItemHeader>Location</StyledItemHeader>
                  <StyledItemValue>{location}</StyledItemValue>
                </Grid>
                <Grid xs={5}>
                  <StyledItemHeader>Quantity</StyledItemHeader>
                  <StyledItemValue>{quantity}</StyledItemValue>
                </Grid>
              </Grid>
              {/* </Box> */}
              <Grid xs={4}>
                <h4>Categories</h4>
                <Divider />
                <br />
                <StyledStack>{tags && tags.map((tag, index) => <Chip key={index} label={tag} size="medium" />)}</StyledStack>
              </Grid>
            </Grid>
            <Grid xs={5} pt={1}>
              <h4>Status</h4>
              <Divider />
              <br />
              <AvailabilityContainer>
                <StyledInfoItem>
                  <StyledItemHeader>Availability</StyledItemHeader>
                  <StyledItemValue>{isCheckedOut ? "Not Available" : "Available"}</StyledItemValue>
                </StyledInfoItem>
                <StyledInfoItem>
                  <StyledItemHeader>Checked Out By</StyledItemHeader>
                  <StyledItemValue>{isCheckedOut ? checkedOutBy : null}</StyledItemValue>
                </StyledInfoItem>
                <StyledInfoItem>
                  <StyledItemHeader>Date Checked Out</StyledItemHeader>
                  <StyledItemValue>{isCheckedOut ? dateCheckedOut?.toString() : null}</StyledItemValue>
                </StyledInfoItem>
              </AvailabilityContainer>
              <BasicTable />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" p={1}>
            <Box display="flex" borderRadius="3px" p={2}>
              <Stack spacing={2} direction="row">
                <Button onClick={onClickingEdit} variant="contained">
                  Edit entry
                </Button>
                <ChildModal entryId={id!} onClickingDelete={onClickingDelete} />
                {/* <Button onClick={onClickingExit} variant="contained">
                  Exit
                </Button> */}
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
          </Box>
          <br />
        </Box>
      </EntryDetailContainer>
    </TextAlignLeftContainer>
  );
}