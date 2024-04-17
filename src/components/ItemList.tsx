import { useState } from "react";
import ItemTypeEntry from "./ItemTypeEntry";
import DataTable from "./DataTable";
import { Item, ItemType } from "../types";
// import styled from "styled-components";
import { styled } from "@mui/material/styles";
import { StyledIconButton } from "../style/styles";
import { styled as styledMui } from "@mui/material/styles";
import { Box, Button, Grid, Stack, Tooltip, useTheme } from "@mui/material";
import { Add, Apps, InfoOutlined, ViewHeadline } from "@mui/icons-material";
import { tokens } from "../themes";
import { sharedInfo } from "../helpers/UserContext.tsx";
import { itemEntriesToDisplay } from "../helpers/SearchAndFilter.tsx";
import { fontSize } from "@mui/system";

//#region styles

const StyledTextContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  marginBottom: "2em",
}));

const StyledStackContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignContent: "center",
  justifyContent: "end",
}));

const ListContainer = styled("div")(({ theme }) => ({
  textAlign: "left",
}));

const ItemContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  gap: "1.5em",
}));

const ResponsiveDataGridContainer = styled("div")(({ theme }) => ({
  width: "100%",

  ".MuiDataGrid-root": {
    width: "100%",
  },
}));

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

  console.log("ItemList, itemList: ", itemList);
  console.log("ItemList, listOfItemTypes: ", listOfItemTypes);

  const StyledButton = styledMui(Button)(({ theme }) => ({
    // color: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    backgroundColor: theme.palette.mode === "dark" ? colors.grey[500] : "#1A2027",
    height: "60%",
    alignContent: "baseline",
    marginLeft: "0.5rem",
    marginTop: "-0.5rem",
    flexShrink: 1,
    // [theme.breakpoints.between("md", "lg")]: {
    //   padding: "0.3rem 0.7rem",
    // },
    // [theme.breakpoints.down("sm")]: {
    //   padding: "0.5rem 1rem",
    // },
  }));

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
          <h2>Inventory</h2>
          <Tooltip
            title={inventoryTooltipText}
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
            <InfoOutlined />
          </Tooltip>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {userProvider?.currentUser?.isAdmin && (
              <StyledButton onClick={onClickingAddEntry} variant="contained" startIcon={<Add />}>
                Items
              </StyledButton>
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
          {/* <Grid item xs={12}>
            {userProvider?.currentUser?.isAdmin && (
              <StyledButton onClick={onClickingAddEntry} variant="contained" startIcon={<Add />}>
                Add Items
              </StyledButton>
            )}
          </Grid> */}
          <br />
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

// [
//   {
//     id: "40ZIk1Mv2TbvxfkaztSu",
//     displayName: "Luria Broth",
//     location: "cabinet 5A",
//     description: "cell culture",
//     tags: ["Biology", "Chemistry"],
//     type: "luria-broth",
//     image: "glassware1",
//     count: 1,
//   },
//   {
//     id: "41MsOFpLUw3qGeeoAJYN",
//     displayName: "Ramps",
//     location: "cabinet 5b",
//     description: "wood, plywood",
//     tags: ["Physics", "General", "Equipment"],
//     type: "physics-ramps-2024",
//     image: "models2",
//     count: 3,
//   },
//   {
//     id: "6rsueHHEld3iGACk1bMh",
//     displayName: "Telescope",
//     location: "cabinet 5c",
//     description: "state of the art, 2024 edition from Carolina Supply",
//     tags: ["General", "Physics", "Equipment"],
//     type: "telescope-electronic-2024",
//     image: "equipment2",
//     count: 2,
//   },
//   {
//     id: "PzFGaDb8gGCTcoSyTRet",
//     displayName: "Baking Soda",
//     location: "cabinet 1b",
//     description: "for demonstrations & classroom use",
//     tags: ["General", "Materials"],
//     type: "materials-2022",
//     image: "glassware1",
//     count: 5,
//   },
//   {
//     id: "RDJhQszcUt8yHZPw8GAI",
//     displayName: "Vinegar",
//     location: "cabinet 2a",
//     description: "for demonstrations & classroom use",
//     tags: ["General", "Materials"],
//     type: "vinegar-bottle-2L-2024",
//     image: "glassware1",
//     count: 3,
//   },
//   {
//     id: "RidRtLATKhEUuOJ7JuJA",
//     displayName: "Beaker",
//     location: "Cabinet 2A",
//     description: "50ml Glass",
//     tags: ["Chemistry", "Glassware"],
//     type: "beaker-glass-2024",
//     image: "glassware2",
//     count: 2,
//   },
//   {
//     id: "Rp3SKLWh9eFVlfC0prvK",
//     displayName: "Meter Stick",
//     location: "cabinet 3c",
//     description: "made of light wood material",
//     tags: ["General", "Measurement"],
//     type: "meter-measurement-device-2023",
//     image: "measurement1",
//     count: 3,
//   },
//   {
//     id: "bbCnz27euL7WiUinUjpW",
//     displayName: "Earth Sun Moon Model",
//     location: "cabinet 3a",
//     description: "model with earth, sun, moon attached. It rotates",
//     tags: ["Earth Science", "Models"],
//     type: "earth-sci-model-2024",
//     image: "models1",
//     count: 2,
//   },
//   {
//     id: "caSij2hSjLNzR8TtrfCW",
//     displayName: "Magnifying Glass",
//     location: "cabinet 4c",
//     description: "bought in year 2014 from Carolina Supply Co.",
//     tags: ["Equipment", "General"],
//     type: "magnifying-glass-2014",
//     image: "tools3",
//     count: 1,
//   },
//   {
//     id: "evOsF9Cm2Bv8CLgOO5Ih",
//     displayName: "dd",
//     location: "cabinet 1b",
//     description: "123456789",
//     tags: [
//       "Chemistry",
//       "Equipment",
//       "Biology",
//       "Earth Science",
//       "Physics",
//       "General",
//       "Measurement",
//       "Materials",
//       "Glassware",
//       "Models",
//       "Safety",
//       "Tools",
//     ],
//     type: "bb",
//     image: "glassware2",
//     count: 1,
//   },
//   {
//     id: "kTjAxhzcwvdW78xC1ZkJ",
//     displayName: "Microscopes",
//     location: "cabinet 5b",
//     description: "for seeing microscopic objects",
//     tags: ["Biology", "Equipment"],
//     type: "microscope-mirror-2010",
//     image: "equipment1",
//     count: 2,
//   },
//   {
//     id: "o8szeDjGMyDTlinRZFsE",
//     displayName: "Dice",
//     location: "cabinet 1a",
//     description: "6-sided; Container of 300 pieces",
//     tags: ["General", "Materials"],
//     type: "dice-six-sided-2008",
//     image: "models4",
//     count: 2,
//   },
//   {
//     id: "zbW0kftDGJu2POzGbju2",
//     displayName: "Safety Goggles",
//     location: "cabinet 7a",
//     description: "all purpose use",
//     tags: ["General", "Safety"],
//     type: "safety-goggles-student-2015",
//     image: "safety2",
//     count: 3,
//   },
// ];
