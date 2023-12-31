import styled from "styled-components";
import InventoryEntry from "./InventoryEntry";
import { InventoryEntry as IEntry } from "../types";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BasicModal from "./ModalCopy";

const ListContainer = styled.div`
  text-align: left;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 2.6em;
`;

type InventoryListProps = {
  listOfEntries: IEntry[];
  onEntrySelection: (id: string) => void;
  onClickingAddEntry: () => void;
};

function InventoryList(props: InventoryListProps) {
  const { listOfEntries, onEntrySelection, onClickingAddEntry } = props;
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
          <BasicModal
            onEntryClick={onEntrySelection}
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
        ))}
      </ItemContainer>
    </ListContainer>
  );
}

export default InventoryList;

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
