import styled from "styled-components";
import InventoryEntry from "./InventoryEntry";
import { InventoryEntry as IEntry } from "../types";
import { Box, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AppsIcon from "@mui/icons-material/Apps";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import Stack from "@mui/material/Stack";

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

function InventoryList(props: InventoryListProps) {
  const { listOfEntries, onEntryClick, onClickingAddEntry } = props;
  console.log("InventoryList: listOfEntries", listOfEntries);

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" borderRadius="3px">
          <h2>Inventory List</h2>
        </Box>
        <Box display="flex" borderRadius="3px">
          <Stack direction="row">
            <IconButton color="primary">
              <AppsIcon
                sx={{
                  fontSize: 28,
                  mr: 0.5,
                  ml: 1,
                  mt: 1,
                }}
              />
            </IconButton>
            <IconButton color="primary">
              <ViewHeadlineIcon
                sx={{
                  fontSize: 28,
                  mr: 1,
                  ml: 0.5,
                  mt: 1,
                }}
              />
            </IconButton>
          </Stack>
        </Box>
      </Box>
      <ListContainer>
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
    </>
  );
}

export default InventoryList;
