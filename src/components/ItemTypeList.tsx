import { useState } from "react";
import styled from "styled-components";
import { styled as styledMui } from "@mui/material/styles";
import ItemTypeEntry from "./ItemTypeEntry";
import { StyledIconButton } from "../style/styles";
import { ItemType } from "../types";
import { Button, Grid, Stack, Tooltip, useTheme } from "@mui/material";
import { Add, Apps, InfoOutlined, ViewHeadline } from "@mui/icons-material";
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

const catalogTooltipText = `A list of item types or item templates. These entries are used to populate the inventory.`;

export default function ItemTypeList(props: ItemTypeListProps) {
  const { listOfEntries, onEntryClick, onClickingAddEntry } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedView, setSelectedView] = useState<"card" | "table">("card");

  const StyledButton = styledMui(Button)(({ theme }) => ({
    // color: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    backgroundColor: theme.palette.mode === "dark" ? colors.grey[500] : "#1A2027",
  }));

  const activateCardView = () => {
    setSelectedView("card");
  };

  const activateTableView = () => {
    setSelectedView("table");
  };

  return (
    <>
      <Grid container item xs={12} pl={2.5} justifyContent="space-between">
        <Grid container item xs={10.5} borderRadius="3px" justifyContent="flex-start">
          <Grid item>
            <h2>Catalog</h2>
          </Grid>
          <Grid item>
            <Tooltip
              title={catalogTooltipText}
              placement="top"
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
              <div>
                <InfoOutlined />
              </div>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid item xs={1.5} borderRadius="3px">
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
              {selectedView === "card" && (
                <ItemContainer>
                  {listOfEntries.map((entry) => (
                    <ItemTypeEntry entry={entry} onEntryClick={onEntryClick} key={entry.id} />
                  ))}
                </ItemContainer>
              )}
              {selectedView === "table" && (
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
