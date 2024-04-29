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
  border: "1px black solid",
  position: "relative",

  "&:hover": {
    cursor: "pointer",
  },

  [theme.breakpoints.down("md")]: {
    minWidth: "450px",
    height: "150px",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },

  [theme.breakpoints.down("lg")]: {
    maxWidth: "345px",
  },
}));

const StyledImgBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "40%",
    height: "100%",
    overflow: "hidden",
  },
  [theme.breakpoints.down("lg")]: {},
}));

const StyledTextBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "60%",
    height: "100%",
  },
  [theme.breakpoints.down("lg")]: {},
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
  const { entry, onEntryClick } = props;
  const { id, count, displayName, type, image, tags } = entry;

  console.log("ItemTypeEntry, tags: ", tags);

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
              height: "140px",
              objectFit: "cover",
            }}
          />
        )}
      </StyledImgBox>
      <StyledTextBox>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {displayName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {type}
          </Typography>
          <br />
          {currentPath === "/inventory" && (
            <Typography variant="body2" color="text.secondary">
              {count} units
            </Typography>
          )}
          <br />
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
                {/* <PopoverCustom
                  // prettier-ignore
                  buttonContent={<MoreVert />}
                  popoverContent={tags.slice(2).map((tag, index) => (
                    <Chip
                      key={index}
                      icon={<SellIcon />}
                      label={tag}
                      size="small"
                      sx={{ backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff" }}
                    />
                  ))}
                /> */}
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
