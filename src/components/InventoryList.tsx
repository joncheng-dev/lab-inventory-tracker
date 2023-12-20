import styled from "styled-components";
import InventoryEntry from "./InventoryEntry";
import { InventoryEntry as IEntry } from "../types";
import { styled as styledmui } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

// const Item = styledmui(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// const ListContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const ItemContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `;

type InventoryListProps = {
  listOfEntries: IEntry[];
  onEntrySelection: (id: string) => void;
  onClickingAddEntry: () => void;
};

function InventoryList(props: InventoryListProps) {
  const { listOfEntries, onEntrySelection, onClickingAddEntry } = props;
  console.log("InventoryList: listOfEntries", listOfEntries);

  return (
    // <ListContainer>
    <>
      <h1>Inventory List</h1>
      {<button onClick={onClickingAddEntry}>Add Entry</button>}
      {/* <ItemContainer> */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} direction="row">
          <Grid item xs={12} display="flex">
            {listOfEntries.map((entry) => (
              // <Grid item xs={3}>
              <InventoryEntry
                whenEntryClicked={onEntrySelection}
                name={entry.name}
                location={entry.location}
                description={entry.description}
                isCheckedOut={entry.isCheckedOut}
                checkedOutBy={entry.checkedOutBy}
                dateCheckedOut={entry.dateCheckedOut}
                tags={entry.tags}
                id={entry.id!}
                key={entry.id}
              />
              // </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
      {/* </ItemContainer> */}
    </>
    // </ListContainer>
  );
}

export default InventoryList;
