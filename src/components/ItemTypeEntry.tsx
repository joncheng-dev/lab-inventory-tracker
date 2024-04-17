import { styled } from "@mui/material/styles";
import { Box, Card, CardContent, CardMedia, Typography, useMediaQuery, useTheme } from "@mui/material";
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
    padding: "16px",
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
  const { entry, onEntryClick } = props;
  const { id, count, displayName, type, image } = entry;

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
          <Typography variant="body2" color="text.secondary">
            {count}
          </Typography>
        </CardContent>
      </StyledTextBox>
    </StyledCard>
  );
}

export default ItemTypeEntry;
