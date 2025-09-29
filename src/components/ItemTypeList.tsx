import { useState } from "react";
import styled from "styled-components";
import CatalogItemTypeEntry from "./CatalogItemTypeEntry.tsx";
import { ItemType } from "../types";
import { Box, Button, Grid, Tooltip, Typography, useTheme } from "@mui/material";
import { Add, InfoOutlined } from "@mui/icons-material";
import DataTable from "./DataTable";
import { tokens } from "../themes";
import { ViewSelectorButtons } from "./Buttons.tsx";
import { sharedInfo } from "../helpers/UserContext.tsx";
import { usePreferences } from "../helpers/PreferencesContext.tsx";
import { saveViewPreference } from "../helpers/helpers";

const StyledTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1em;
  align-items: center;
`;

const StyledStackContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: end;
`;

const ListContainer = styled.div`
  text-align: left;
  margin-bottom: 1em;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1.5em;
`;

const ResponsiveDataGridContainer = styled("div")`
  width: 100%;

  .MuiDataGrid-root {
    width: 100%;
  }
`;

type ItemTypeListProps = {
  listOfEntries: ItemType[];
  onEntryClick: (id: string) => void;
  onClickingAddEntry: () => void;
};

const catalogTooltipText = `A list of item types or item templates. These entries are used to populate the inventory.`;

export default function ItemTypeList(props: ItemTypeListProps) {
  const { listOfEntries, onEntryClick, onClickingAddEntry } = props;
  const userProvider = sharedInfo();
    if (!userProvider) {
    return null;  
  }
  const { currentUser } = userProvider;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { viewMode, setViewMode } = usePreferences();

  const activateCardView = async () => {
    setViewMode("card");
    if (currentUser?.uid) {
      saveViewPreference(currentUser?.uid, "card");
    }
  };

  
  const activateTableView = async () => {
    setViewMode("table");
    if (currentUser?.uid) {
      saveViewPreference(currentUser?.uid, "table");
    }
  };

  return (
    <>
      <StyledTextContainer>
        <Box
          sx={{
            display: "flex",
            alignItems: "left",
            position: "relative",
            marginLeft: 0,
          }}
        >
          <Typography variant="h4">Catalog</Typography>
          <Tooltip title={catalogTooltipText} placement="top" sx={{ marginRight: 1 }}>
            <InfoOutlined fontSize="small" />
          </Tooltip>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button onClick={onClickingAddEntry} variant="contained" startIcon={<Add />}>
              Add Entry
            </Button>
          </Box>
        </Box>
        <StyledStackContainer>
          <ViewSelectorButtons onCardViewClick={activateCardView} onTableViewClick={activateTableView} />
        </StyledStackContainer>
      </StyledTextContainer>
      <ListContainer>
        <Grid container>
          <Grid item xs={12}>
            {viewMode === "card" && (
              <ItemContainer>
                {listOfEntries.map((entry) => (
                  <CatalogItemTypeEntry entry={entry} onEntryClick={onEntryClick} key={entry.id} />
                ))}
              </ItemContainer>
            )}
            {viewMode === "table" && (
              <ResponsiveDataGridContainer>
                <DataTable data={listOfEntries} onEntryClick={onEntryClick} />
              </ResponsiveDataGridContainer>
            )}
          </Grid>
        </Grid>
      </ListContainer>
    </>
  );
}
