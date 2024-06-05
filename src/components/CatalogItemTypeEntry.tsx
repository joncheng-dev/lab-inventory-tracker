import { styled as styledM } from "@mui/material/styles";
import { ColorModeContext, tokens } from "../themes.tsx";
import styled from "styled-components";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PopoverCustom from "./PopoverCustom";
import MenuLong from "./MenuLong";
import MoreVert from "@mui/icons-material/MoreVert";
import SellIcon from "@mui/icons-material/Sell";
import { ItemType } from "../types";
import { useLocation } from "react-router-dom";
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
import { display } from "@mui/system";

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

const StyledCard = styledM(Card)(({ theme }) => ({
  display: "flex",
  flexFlow: "flex-grow",
  // flex: "1 2 auto",
  width: "100%",
  maxWidth: "100%",
  position: "relative",

  "&:hover": {
    cursor: "pointer",
  },
}));

const StyledImgBox = styledM(Box)(({ theme }) => ({
  width: "20%",
  height: "auto",
  // marginRight: "2em",
  [theme.breakpoints.down("md")]: {
    width: "40%",
    height: "100%",
    overflow: "hidden",
  },
}));

const StyledItemHeader = styled.p`
  font-size: 1rem;
  color: rgb(83, 167, 235);
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 0;
`;

const StyledItemValue = styled.p`
  font-size: 1rem;
  color: ${(props) => (props.theme.palette.mode === "dark" ? "#fff" : "#141b2d")};
  margin-top: 0; /* Add margin to the top of each value for spacing */
`;

export default function CatalogItemTypeEntry(props: CatalogItemTypeEntryProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { entry, onEntryClick } = props;
  const { id, description, displayName, type, image, tags } = entry;

  const StyledTextBox = styledM(Box)(({ theme }) => ({
    maxWidth: "80%",
    // height: "100%",
    backgroundColor: colors.primary[400],
    // marginLeft: "2em",
  }));

  return (
    <StyledCard
      onClick={() => {
        onEntryClick(id!);
      }}
    >
      <StyledImgBox>
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
      </StyledImgBox>
      <Grid
        item
        sx={{
          paddingLeft: 1,
          paddingRight: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: "80%",
          // height: "100%",
        }}
      >
        <Grid item>
          <StyledItemHeader>Display Name</StyledItemHeader>
          <StyledItemValue theme={theme}>{displayName}</StyledItemValue>
        </Grid>
        <Grid item>
          <StyledItemHeader>Type</StyledItemHeader>
          <StyledItemValue theme={theme}>{type}</StyledItemValue>
        </Grid>
        <Grid item>
          <StyledItemHeader>Description</StyledItemHeader>
          <StyledItemValue theme={theme}>{description}</StyledItemValue>
        </Grid>

        <Stack direction="row" sx={{ flexWrap: "nowrap", alignItems: "center" }} spacing={1}>
          {tags &&
            tags
              .slice(0, 2)
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
          {tags && tags.length <= 2 && (
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
          {tags && tags.length > 2 && (
            <div style={{ marginLeft: "auto" }}>
              <MenuLong content={tags.slice(2)} />
            </div>
          )}
        </Stack>
      </Grid>
    </StyledCard>
  );
}
