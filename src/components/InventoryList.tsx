import { useState } from "react";
import styled from "styled-components";
import InventoryEntry from "./InventoryEntry";
import { InventoryEntry as IEntry } from "../types";
import { Box, Button, IconButton } from "@mui/material";
import { Add, Apps, ViewHeadline } from "@mui/icons-material";
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
  const [cardView, setCardView] = useState(true);
  const [tableView, setTableView] = useState(false);

  const activateCardView = () => {
    setCardView(true);
    setTableView(false);
  };

  const activateTableView = () => {
    setCardView(false);
    setTableView(true);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" borderRadius="3px">
          <h2>Inventory List</h2>
        </Box>
        <Box display="flex" borderRadius="3px">
          <Stack direction="row">
            <IconButton color="primary" onClick={activateCardView}>
              <Apps
                sx={{
                  fontSize: 25,
                  ml: 1,
                  mb: 1,
                }}
              />
            </IconButton>
            <IconButton color="primary" onClick={activateTableView}>
              <ViewHeadline
                sx={{
                  fontSize: 25,
                  mr: 1,
                  mb: 1,
                }}
              />
            </IconButton>
          </Stack>
        </Box>
      </Box>
      <ListContainer>
        <Button onClick={onClickingAddEntry} variant="contained" startIcon={<Add />}>
          Add Entry
        </Button>
        <br />
        <br />
        {cardView && (
          <ItemContainer>
            {listOfEntries.map((entry) => (
              <InventoryEntry entry={entry} onEntryClick={onEntryClick} key={entry.id} />
            ))}
          </ItemContainer>
        )}
        {tableView && (
          // /*prettier-ignore*/
          <h3>Table View</h3>
        )}
      </ListContainer>
    </>
  );
}

export default InventoryList;
