import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
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
import { maxWidth } from "@mui/system";

//#region styles
const StyledCard = styled(Card)(({ theme }) => ({
  // display: "flex",
  flex: "0 1 auto",
  width: "250px",
  maxWidth: "100%",
  position: "relative",

  "&:hover": {
    cursor: "pointer",
  },

  [theme.breakpoints.down("md")]: {
    minWidth: "450px",
    height: "170px",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    // paddingBottom: 0,
  },

  [theme.breakpoints.down("lg")]: {
    maxWidth: "345px",
    // paddingBottom: 16,
  },
}));

const StyledImgBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "40%",
    height: "100%",
    overflow: "hidden",
  },
}));

const StyledTextBox = styled(Box)(({ theme }) => ({
  // [theme.breakpoints.up("md")]: {
  //   paddingBottom: 16,
  // },
  [theme.breakpoints.down("md")]: {
    width: "60%",
    height: "100%",
    // marginBottom: theme.spacing(1), // Default margin for small screens
  },
  // [theme.breakpoints.down("md")]: {
  //   width: "60%",
  //   height: "100%",
  // },
}));

//#endregion

type ItemTypeEntryProps = {
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

function ItemTypeEntry(props: ItemTypeEntryProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { entry, onEntryClick } = props;
  const { id, count, displayName, type, image, tags } = entry;

  return (
    <StyledCard
      onClick={() => {
        onEntryClick(id!);
      }}
    >
      {/* made some edits to the way images are displayed here. */}
      <StyledImgBox>
        {image && (
          <CardMedia
            component="img"
            image={imageDictionary[image]}
            title={image}
            sx={{
              width: "100%",
              height: isSmallScreen ? "100%" : "140px",
              objectFit: "cover",
            }}
          />
        )}
      </StyledImgBox>
      <StyledTextBox>
        <CardContent sx={{ marginBottom: -2 }}>
          <Typography gutterBottom variant="h6">
            {displayName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {type}
          </Typography>
          {currentPath === "/inventory" && (
            <div style={{ margin: isSmallScreen ? "1.75em 0 1.5em 0" : "1.25em 0 1em 0" }}>
              <Typography variant="body2" color="text.secondary">
                {count} {count === 1 ? "unit" : "units"}
              </Typography>
            </div>
          )}
          {currentPath !== "/inventory" && (
            <div>
              <br />
              <br />
              <br />
            </div>
          )}
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

          {/* <Stack direction="row" sx={{ flexWrap: "wrap" }} spacing={1}>
            {!tags && <p>No tags to display</p>}
            {tags && tags.map((tag, index) => <Chip key={index} icon={<SellIcon />} label={tag} size="small" variant="outlined" />)}
          </Stack> */}
        </CardContent>
      </StyledTextBox>
    </StyledCard>
  );
}

export default ItemTypeEntry;
