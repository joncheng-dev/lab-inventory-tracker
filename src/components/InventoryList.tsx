import styled from "styled-components";
import InventoryEntry from "./InventoryEntry";
import { InventoryEntry as IEntry } from "../types";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

//#region styles
const ListContainer = styled.div`
  text-align: left;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 2.6em;
`;
//#endregion styles

type InventoryListProps = {
  listOfEntries: IEntry[];
  onEntryClick: (id: string) => void;
  onClickingAddEntry: () => void;
  // InventoryEntryDetail
  onClickingEdit: () => void;
  onClickingCheckout: () => void;
  onClickingReturn: (itemId: string) => void;
  onClickingDelete: (id: string) => void;
  onClickingExit: () => void;
};

export default function InventoryList(props: InventoryListProps) {
  // prettier-ignore
  const {
    listOfEntries,
    onEntryClick,
    onClickingAddEntry,
    // For InventoryEntryDetail:
    onClickingEdit,
    onClickingCheckout,
    onClickingReturn,
    onClickingDelete,
    onClickingExit,
  } = props;

  console.log("InventoryList: listOfEntries", listOfEntries);

  return (
    <ListContainer>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" borderRadius="3px">
          <h2>Inventory List</h2>
        </Box>
      </Box>
      <Button onClick={onClickingAddEntry} variant="contained" startIcon={<AddIcon />}>
        Add Entry
      </Button>
      <br />
      <br />
      <ItemContainer>
        {listOfEntries.map((entry) => (
          <InventoryEntry
            onEntryClick={onEntryClick}
            entry={entry}
            onClickingEdit={onClickingEdit}
            onClickingCheckout={onClickingCheckout}
            onClickingReturn={onClickingReturn}
            onClickingDelete={onClickingDelete}
            onClickingExit={onClickingExit}
            key={entry.id}
          />
        ))}
      </ItemContainer>
    </ListContainer>
  );
}

// {
//   listOfEntries.map((entry) => (
//     <InventoryEntry
//       whenEntryClicked={onEntrySelection}
//       name={entry.name}
//       location={entry.location}
//       description={entry.description}
//       isCheckedOut={entry.isCheckedOut}
//       checkedOutBy={entry.checkedOutBy}
//       dateCheckedOut={entry.dateCheckedOut}
//       tags={entry.tags}
//       id={entry.id!}
//       key={entry.id}
//     />
//   ));
// }
