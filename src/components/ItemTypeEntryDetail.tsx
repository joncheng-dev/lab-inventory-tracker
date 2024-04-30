import { useContext } from "react";
import SellIcon from "@mui/icons-material/Sell";
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, useTheme } from "@mui/material";
import styled from "styled-components";
import { tokens } from "../themes.js";
import { ItemType } from "../types/index.js";
import ChildModal from "./ChildModal.js";
import BasicTable from "./ItemCheckOutTable.js";
import {
  equipment1,
  equipment2,
  glassware1,
  glassware2,
  materials1,
  materials2,
  measurement1,
  models1,
  models2,
  models3,
  models4,
  safety1,
  safety2,
  tools1,
  tools2,
  tools3,
} from "../images";

//#region styles
const EntryDetailContainer = styled.div`
  /* padding-left: 50px; */
  background-color: #282828;
  /* padding-top: 25px; */
`;

const DetailsImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

// const DetailsContainer = styled.div`
//   float: left;
//   width: 100%;
//   display: grid;
//   grid-template-columns: auto auto;
//   column-gap: 1rem;
//   row-gap: 0.25rem;
// `;

const DetailsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two equal columns */
  gap: 1rem; /* Adjust the gap between columns */
`;

const StyledItemHeader = styled.p`
  font-size: 1rem;
  color: rgb(83, 167, 235);
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 0;
`;

const StyledItemValue = styled.p`
  font-size: 1rem;
  color: #ffffff;
  margin-top: 0; /* Add margin to the top of each value for spacing */
`;

const AvailabilityContainer = styled.div`
  width: 95%;
  display: grid;
  /* grid-template-columns: auto auto; */
  column-gap: 1rem;
  row-gap: 0.25rem;
`;

const StyledInfoItem = styled.div`
  display: grid;
  grid-template-columns: auto;
  font-size: 1rem;
  text-align: left;
`;

// const StyledItemHeader = styled.p`
//   font-size: 1rem;
//   color: rgb(83, 167, 235);
//   text-transform: uppercase;
//   font-weight: bold;
//   margin-bottom: 0;
// `;

// const StyledItemValue = styled.p`
//   font-size: 1rem;
//   color: #ffffff;
// `;

const StyledStack = styled(Stack)`
  display: block;
  justify-content: "left";
  flex-direction: "column";
`;

const TextAlignLeftContainer = styled.div`
  /* text-align: left; */
`;
//#endregion styles

type ItemTypeEntryDetailProps = {
  entry: ItemType;
  onClickingEdit: () => void;
  onClickingDelete: (id: string) => void;
  // onClickingExit: () => void;
};

const imageDictionary: Record<string, string> = {
  equipment1,
  equipment2,
  glassware1,
  glassware2,
  materials1,
  materials2,
  measurement1,
  models1,
  models2,
  models3,
  models4,
  safety1,
  safety2,
  tools1,
  tools2,
  tools3,
};

export default function ItemTypeEntryDetail(props: ItemTypeEntryDetailProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { entry, onClickingEdit, onClickingDelete } = props;
  // prettier-ignore
  const {
    id,
    displayName,
    description,
    location,
    tags,
    type,
    image,
  } = entry;

  return (
    <Box
      pt={0.2}
      sx={{
        display: "flex",
        flexGrow: 1,
        alignContent: "center",
        backgroundColor: colors.primary[400],
        width: {
          xs: 400,
          sm: 600,
          md: 800,
          lg: 1100,
          xl: 1100,
        },
        maxHeight: "80vh",
        overflowY: "auto",
        // "@media (max-width: 1280px)": {
        //   justifyContent: "center", // Center contents horizontally
        //   alignItems: "center", // Center contents vertically
        // },
      }}
    >
      <Grid container spacing={2} pt={1} sx={{ justifyContent: "center", alignItems: { xl: "flex-start", lg: "center" } }}>
        <Grid
          container
          item
          lg={6}
          xl={3}
          pt={3}
          sx={{
            order: { md: 1, lg: 2, xl: 1 },
            flexDirection: {
              xl: "row",
              lg: "row",
              md: "column",
              sm: "column",
            },
          }}
        >
          <Card sx={{ backgroundColor: colors.primary[400], marginBottom: 3, paddingLeft: 1, paddingRight: 1 }}>
            <CardContent>
              <Grid xs={12} item>
                <DetailsImageContainer>
                  <Box sx={{ width: "100%", height: 300, overflow: "hidden" }}>
                    <img src={imageDictionary[image]} alt="selected image" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </Box>
                </DetailsImageContainer>
              </Grid>
              <br />
              <Grid item xs={12}>
                <h5>Categories</h5>
                <Divider />
                <Stack direction="row" sx={{ flexWrap: "wrap" }} spacing={1}>
                  {!tags && <p>No tags to display</p>}
                  {tags && tags.map((tag, index) => <Chip key={index} icon={<SellIcon />} label={tag} size="medium" variant="outlined" />)}
                </Stack>
              </Grid>
              <br />
            </CardContent>
          </Card>
        </Grid>
        <Grid
          container
          item
          lg={6}
          xl={4}
          pt={1}
          sx={{
            order: { md: 2, lg: 1, xl: 2 },
            flexDirection: {
              xl: "row",
              lg: "row",
              md: "column",
              sm: "column",
            },
            display: "flex", // Ensure the container is a flex container
            height: "100%", // Occupy the full height of the parent
          }}
        >
          <Card
            sx={{ backgroundColor: colors.primary[400], marginBottom: 3, paddingLeft: 1, paddingRight: 1, display: "flex", flexDirection: "column" }}
          >
            <CardContent style={{ flex: 1 }}>
              <h4>Item Details</h4>
              <Divider />
              <br />
              <Grid xs={12} item>
                <StyledItemHeader>Display Name</StyledItemHeader>
                <StyledItemValue>{displayName}</StyledItemValue>
              </Grid>
              <Grid xs={12} item>
                <StyledItemHeader>Type</StyledItemHeader>
                <StyledItemValue>{type}</StyledItemValue>
              </Grid>
              <Grid xs={12} item>
                <StyledItemHeader>Location</StyledItemHeader>
                <StyledItemValue>{location}</StyledItemValue>
              </Grid>
              <Grid xs={12} item>
                <StyledItemHeader>Description</StyledItemHeader>
                <StyledItemValue>{description}</StyledItemValue>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid xs={12} container item spacing={2}>
                <Grid item>
                  <Button onClick={onClickingEdit} variant="contained">
                    Edit entry
                  </Button>
                </Grid>
                <Grid item>
                  <ChildModal entryId={id!} onClickingDelete={onClickingDelete} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
