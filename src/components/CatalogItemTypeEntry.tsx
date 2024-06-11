import { styled as styledM } from "@mui/material/styles";
import { tokens } from "../themes.tsx";
import styled, { ThemeProvider } from "styled-components";
import { Box, Card, CardMedia, Chip, Grid, IconButton, Stack, useTheme } from "@mui/material";
import MenuLong from "./MenuLong";
import MoreVert from "@mui/icons-material/MoreVert";
import SellIcon from "@mui/icons-material/Sell";
import { ItemType } from "../types";
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

type CatalogItemTypeEntryProps = {
  entry: ItemType;
  onEntryClick: (id: string) => void;
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

// const StyledItemHeader = styled.p`
//   font-size: 1rem;
//   text-transform: uppercase;
//   font-weight: bold;
//   margin-top: 0;
//   margin-bottom: 0;
// `;

// const StyledItemValue = styled.p`
//   font-size: 1rem;
//   /* color: ${(props) => (props.theme.palette.mode === "dark" ? "#fff" : "#141b2d")}; */
//   color: ${(props) => (props.theme.palette.mode === "dark" ? "#fff" : "#59554C")};
//   margin-top: 0; /* Add margin to the top of each value for spacing */
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: ${(props) => (props.theme.width <= 2 * props.theme.lineHeight ? "normal" : "nowrap")};
// `;

const StyledItemHeader = styledM("p")(({ theme }) => ({
  fontSize: "1rem",
  textTransform: "uppercase",
  color: theme.palette.mode === "dark" ? "#fff" : "#141b2d",
  fontWeight: "bold",
  marginTop: 0,
  marginBottom: 0,
}));

const StyledItemValue = styledM("p")(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.mode === "dark" ? "#fff" : "#141b2d",
  marginTop: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

export default function CatalogItemTypeEntry(props: CatalogItemTypeEntryProps) {
  const theme = useTheme();
  const { entry, onEntryClick } = props;
  const { id, description, displayName, type, image, tags } = entry;
  const colors = tokens(theme.palette.mode);

  const StyledCard = styledM(Card)(({ theme }) => ({
    display: "flex",
    flexFlow: "flex-grow",
    maxHeight: "200px",
    width: "100%",
    maxWidth: "100%",
    position: "relative",

    "&:hover": {
      cursor: "pointer",
    },
  }));

  return (
    <StyledCard
      onClick={() => {
        onEntryClick(id!);
      }}
    >
      <Box
        sx={{
          height: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "auto",
            xl: "auto",
          },
          overflow: "hidden",
          width: {
            xs: "40%",
            sm: "40%",
            md: "40%",
            lg: "20%",
            xl: "20%",
          },
        }}
      >
        {image && (
          <CardMedia
            component="img"
            image={imageDictionary[image]}
            title={image}
            sx={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
          />
        )}
      </Box>
      <Grid
        container
        sx={{
          paddingLeft: 1,
          paddingRight: 1,
          paddingTop: 1,
          display: "flex",
          maxWidth: "80%",
        }}
      >
        <ThemeProvider theme={theme}>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <StyledItemHeader>Display Name</StyledItemHeader>
            <StyledItemValue theme={theme}>{displayName}</StyledItemValue>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <StyledItemHeader>Type</StyledItemHeader>
            <StyledItemValue theme={theme}>{type}</StyledItemValue>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <StyledItemHeader>Description</StyledItemHeader>
            <StyledItemValue theme={theme}>{description}</StyledItemValue>
          </Grid>
        </ThemeProvider>
        <Stack direction="row" sx={{ flexWrap: "nowrap", alignItems: "center" }} spacing={1}>
          {tags &&
            tags
              .slice(0, 5)
              .map((tag, index) => (
                <Chip
                  key={index}
                  icon={<SellIcon />}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{ flex: "1 1 1", textOverflow: "ellipsis", overflow: "hidden", flexWrap: "nowrap" }}
                />
              ))}
          {tags && tags.length <= 5 && (
            <div style={{ marginLeft: "auto" }}>
              <IconButton
                aria-label="empty"
                disabled
                sx={{
                  flex: "1 1 1",
                  "&:focus, &:active": {
                    outline: "none",
                  },
                }}
              >
                <MoreVert />
              </IconButton>
            </div>
          )}
          {tags && tags.length >= 5 && (
            <div style={{ marginLeft: "auto" }}>
              <MenuLong content={tags.slice(5)} />
            </div>
          )}
        </Stack>
      </Grid>
    </StyledCard>
  );
}
