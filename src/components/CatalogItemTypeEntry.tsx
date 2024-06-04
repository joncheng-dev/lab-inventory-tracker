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

const StyledImgBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "40%",
    height: "100%",
    overflow: "hidden",
  },
}));

export default function CatalogItemTypeEntry(props: CatalogItemTypeEntryProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { entry, onEntryClick } = props;
  const { id, count, displayName, type, image, tags } = entry;

  return (
    <Card
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
              height: isSmallScreen ? "100%" : "140px",
              objectFit: "cover",
            }}
          />
        )}
      </StyledImgBox>
      <Typography>Item Type: {type}</Typography>
      <Typography>Display Name: {displayName}</Typography>
      <Typography>Count: {count}</Typography>
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
    </Card>
  );
}
