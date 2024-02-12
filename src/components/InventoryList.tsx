import { useState } from "react";
import styled from "styled-components";
import InventoryEntry from "./InventoryEntry";
import { InventoryEntry as IEntry } from "../types";
import { Button, Grid, IconButton, Stack } from "@mui/material";
import { Add, Apps, ViewHeadline } from "@mui/icons-material";
import InventoryTable from "./InventoryTable";

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

const ResponsiveDataGridContainer = styled("div")`
  width: 100%;

  .MuiDataGrid-root {
    width: 100%;
    /* .MuiDataGrid-colCell {

    } */
  }
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
      <Grid container xs={12} justifyContent="space-between">
        <Grid item xs={10} borderRadius="3px">
          <h2>Inventory List</h2>
        </Grid>
        <Grid item xs={2} borderRadius="3px">
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
        </Grid>
        <Grid item xs={12}>
          <ListContainer>
            <Grid item xs={12}>
              <Button onClick={onClickingAddEntry} variant="contained" startIcon={<Add />}>
                Add Entry
              </Button>
            </Grid>
            <br />
            <Grid item xs={12}>
              {cardView && (
                <ItemContainer>
                  {listOfEntries.map((entry) => (
                    <InventoryEntry entry={entry} onEntryClick={onEntryClick} key={entry.id} />
                  ))}
                </ItemContainer>
              )}
              {tableView && (
                <ResponsiveDataGridContainer>
                  <InventoryTable data={listOfEntries} onEntryClick={onEntryClick} />
                </ResponsiveDataGridContainer>
              )}
            </Grid>
          </ListContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default InventoryList;
