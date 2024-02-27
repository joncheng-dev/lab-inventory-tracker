import { useState, useEffect } from "react";
import styled from "styled-components";
import { styled as styledMui } from "@mui/material/styles";
import ItemTypeEntry from "./ItemTypeEntry";
import { Item, ItemType } from "../types";
import { Button, Grid, IconButton, Stack, useTheme } from "@mui/material";
import { Add, Apps, ViewHeadline } from "@mui/icons-material";
import DataTable from "./DataTable";
import { tokens } from "../themes";

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

const StyledIconButton = styledMui(IconButton)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#fff" : "#1A2027",
}));

const ResponsiveDataGridContainer = styled("div")`
  width: 100%;

  .MuiDataGrid-root {
    width: 100%;
    /* .MuiDataGrid-colCell {

    } */
  }
`;
//#endregion styles

type ItemListProps = {
  listOfEntries: Item[];
  listOfItemTypes: Partial<ItemType>[];
  onEntryClick: (id: string) => void;
  onClickingAddEntry: () => void;
};

export default function ItemList(props: ItemListProps) {
  const { listOfEntries, listOfItemTypes, onEntryClick, onClickingAddEntry } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [uniqueItemTypes, setUniqueItemTypes] = useState<ItemType[]>([]);
  const [cardView, setCardView] = useState(true);
  const [tableView, setTableView] = useState(false);

  console.log("ItemList, listOfEntries: ", listOfEntries);
  console.log("ItemList, listOfItemTypes: ", listOfItemTypes);

  const StyledButton = styledMui(Button)(({ theme }) => ({
    // color: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    backgroundColor: theme.palette.mode === "dark" ? colors.grey[500] : "#1A2027",
  }));

  useEffect(() => {
    const itemEntriesToDisplay = () => {
      // Look at listOfEntries (it's an array of objects)
      // Create a SET of item 'type'.
      const setOfTypes = [...new Set(listOfEntries.map((entry) => entry.type))];
      // Use these to create item entries to display.
      console.log("ItemList, setOfTypes: ", setOfTypes);
      // Use this set of item types.
      // If the type is listed in here, create an ItemTypeEntry for it
      const filteredItemTypes = listOfItemTypes
        .filter((entry) => setOfTypes.includes(entry.type || ""))
        .filter((entry): entry is ItemType => entry !== undefined);
      setUniqueItemTypes(filteredItemTypes);
    };
    itemEntriesToDisplay();
  }, [listOfEntries]);

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
          <h2>Item List</h2>
        </Grid>
        <Grid item xs={2} borderRadius="3px">
          <Stack direction="row">
            <StyledIconButton onClick={activateCardView}>
              <Apps
                sx={{
                  fontSize: 25,
                  ml: 1,
                  mb: 1,
                }}
              />
            </StyledIconButton>
            <StyledIconButton onClick={activateTableView}>
              <ViewHeadline
                sx={{
                  fontSize: 25,
                  mr: 1,
                  mb: 1,
                }}
              />
            </StyledIconButton>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ListContainer>
            <Grid item xs={12}>
              <StyledButton onClick={onClickingAddEntry} variant="contained" startIcon={<Add />}>
                Add Items
              </StyledButton>
            </Grid>
            <br />
            <Grid item xs={12}>
              <ItemContainer>
                {uniqueItemTypes.map((entry) => (
                  <ItemTypeEntry entry={entry} onEntryClick={onEntryClick} key={entry.id} />
                ))}
                {/* {uniqueItemTypes.map((entry) => (
                  <div key={entry.id}>
                    <h3>{entry.displayName}</h3>
                    <p>{entry.type}</p>
                  </div>
                ))} */}
              </ItemContainer>
              {/* {cardView && (
              )}
              {tableView && (
                <ResponsiveDataGridContainer>
                  <DataTable data={uniqueEntries} onEntryClick={onEntryClick} />
                </ResponsiveDataGridContainer>
              )} */}
            </Grid>
          </ListContainer>
        </Grid>
      </Grid>
    </>
  );
}
