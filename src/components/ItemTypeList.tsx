import { useState } from "react";
import styled from "styled-components";
import { styled as styledMui } from "@mui/material/styles";
import ItemTypeEntry from "./ItemTypeEntry";
import { ItemType } from "../types";
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
  gap: 1.5em;
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

type ItemTypeListProps = {
  listOfEntries: ItemType[];
  onEntryClick: (id: string) => void;
  onClickingAddEntry: () => void;
};

export default function ItemTypeList(props: ItemTypeListProps) {
  const { listOfEntries, onEntryClick, onClickingAddEntry } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cardView, setCardView] = useState(true);
  const [tableView, setTableView] = useState(false);

  const StyledButton = styledMui(Button)(({ theme }) => ({
    // color: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    backgroundColor: theme.palette.mode === "dark" ? colors.grey[500] : "#1A2027",
  }));

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
      <Grid container item xs={12} pl={2.5} justifyContent="space-between">
        <Grid item xs={10} borderRadius="3px">
          <h2>Item Types</h2>
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
                Add Entry
              </StyledButton>
            </Grid>
            <br />
            <Grid item xs={12}>
              {cardView && (
                <ItemContainer>
                  {listOfEntries.map((entry) => (
                    <ItemTypeEntry entry={entry} onEntryClick={onEntryClick} key={entry.id} />
                  ))}
                </ItemContainer>
              )}
              {tableView && (
                <ResponsiveDataGridContainer>
                  <DataTable data={listOfEntries} onEntryClick={onEntryClick} />
                </ResponsiveDataGridContainer>
              )}
            </Grid>
          </ListContainer>
        </Grid>
      </Grid>
    </>
  );
}
