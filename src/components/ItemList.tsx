import { useState } from "react";
import ItemTypeEntry from "./ItemTypeEntry";
import DataTable from "./DataTable";
import { Item, ItemType } from "../types";
// import styled from "styled-components";
import styled from "styled-components";
import { styled as styledMui } from "@mui/material/styles";
import { Box, Button, Grid, Tooltip, Typography, useTheme } from "@mui/material";
import { Add, InfoOutlined } from "@mui/icons-material";
import { tokens } from "../themes";
import { sharedInfo } from "../helpers/UserContext.tsx";
import { itemEntriesToDisplay } from "../helpers/SearchAndFilter.tsx";
import { fontSize } from "@mui/system";
import { ViewSelectorButtons } from "./Buttons/buttons.tsx";

//#region styles
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
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1.5em;
`;

const StyledListContainer = styledMui(Box)`
  
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

type ItemListProps = {
  itemList: Item[];
  listOfItemTypes: ItemType[];
  onEntryClick: (id: string) => void;
  onClickingAddEntry: () => void;
};

const inventoryTooltipText = `A collection of all items registered to the laboratory.`;

export default function ItemList(props: ItemListProps) {
  const { itemList, listOfItemTypes, onEntryClick, onClickingAddEntry } = props;
  const userProvider = sharedInfo();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedView, setSelectedView] = useState<"card" | "table">("card");
  const itemsToRender = itemEntriesToDisplay(itemList, listOfItemTypes);

  const activateCardView = () => {
    setSelectedView("card");
  };

  const activateTableView = () => {
    setSelectedView("table");
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
          <Typography variant="h4">Inventory</Typography>
          <Tooltip title={inventoryTooltipText} placement="top" sx={{ marginRight: 1 }}>
            <InfoOutlined fontSize="small" />
          </Tooltip>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {userProvider?.currentUser?.isAdmin && (
              <Button onClick={onClickingAddEntry} variant="contained" size="medium" startIcon={<Add />}>
                Items
              </Button>
            )}
          </Box>
        </Box>
        <StyledStackContainer>
          <ViewSelectorButtons onCardViewClick={activateCardView} onTableViewClick={activateTableView} />
        </StyledStackContainer>
      </StyledTextContainer>
      <ListContainer>
        <Grid container>
          <Grid item xs={12}>
            {selectedView === "card" && (
              <ItemContainer>
                {itemsToRender.map((entry) => (
                  <ItemTypeEntry entry={entry} onEntryClick={onEntryClick} key={entry.id} />
                ))}
              </ItemContainer>
            )}
            {selectedView === "table" && (
              <ResponsiveDataGridContainer>
                <DataTable data={itemsToRender} onEntryClick={onEntryClick} />
              </ResponsiveDataGridContainer>
            )}
          </Grid>
        </Grid>
      </ListContainer>
    </>
  );
}
