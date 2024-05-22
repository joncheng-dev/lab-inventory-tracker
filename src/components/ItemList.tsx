import { useState } from "react";
import ItemTypeEntry from "./ItemTypeEntry";
import DataTable from "./DataTable";
import { Item, ItemType } from "../types";
// import styled from "styled-components";
import styled from "styled-components";
import { StyledIconButton } from "../style/styles";
import { styled as styledMui } from "@mui/material/styles";
import { Box, Button, Grid, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { Add, Apps, InfoOutlined, ViewHeadline } from "@mui/icons-material";
import { tokens } from "../themes";
import { sharedInfo } from "../helpers/UserContext.tsx";
import { itemEntriesToDisplay } from "../helpers/SearchAndFilter.tsx";
import { fontSize } from "@mui/system";

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

  // const StyledButton = styledMui(Button)(({ theme }) => ({
  //   // color: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   height: "60%",
  //   alignContent: "baseline",
  //   marginLeft: "0.5rem",
  //   marginTop: "-0.5rem",
  //   flexShrink: 1,
  //   // [theme.breakpoints.between("md", "lg")]: {
  //   //   padding: "0.3rem 0.7rem",
  //   // },
  //   // [theme.breakpoints.down("sm")]: {
  //   //   padding: "0.5rem 1rem",
  //   // },
  // }));

  const itemsToRender = itemEntriesToDisplay(itemList, listOfItemTypes);
  console.log("ItemList: itemsToRender: ", itemsToRender);

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
            // marginRight: theme.spacing(2),
            marginLeft: 0,
            [theme.breakpoints.up("sm")]: {
              // marginLeft: theme.spacing(3),
              width: "auto",
            },
          }}
        >
          <Typography variant="h4">Inventory</Typography>
          <Tooltip
            title={inventoryTooltipText}
            placement="top"
            sx={{ marginRight: 1 }}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      // offset: [0, -24],
                    },
                  },
                ],
              },
            }}
          >
            <InfoOutlined />
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
          <Stack direction="row">
            <Tooltip title="Card View">
              <StyledIconButton onClick={activateCardView} disableRipple>
                <Apps
                  sx={{
                    fontSize: 25,
                    ml: 1,
                    mb: 1,
                  }}
                />
              </StyledIconButton>
            </Tooltip>
            <Tooltip title="Table View">
              <StyledIconButton onClick={activateTableView} disableRipple>
                <ViewHeadline
                  sx={{
                    fontSize: 25,
                    mr: 1,
                    mb: 1,
                  }}
                />
              </StyledIconButton>
            </Tooltip>
          </Stack>
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
