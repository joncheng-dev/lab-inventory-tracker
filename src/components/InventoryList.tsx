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
};

export default function InventoryList(props: InventoryListProps) {
  const { listOfEntries, onEntryClick, onClickingAddEntry } = props;
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
          <InventoryEntry entry={entry} onEntryClick={onEntryClick} key={entry.id} />
        ))}
      </ItemContainer>
    </ListContainer>
  );
}
