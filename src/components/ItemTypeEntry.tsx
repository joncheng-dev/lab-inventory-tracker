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
  const { id, displayName, type, image } = entry;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // Check if screen width is below 600px

  return isSmallScreen ? (
    <StyledCard
      sx={{ width: "400px", height: "150px", display: "flex", flexDirection: "row" }}
      onClick={() => {
        onEntryClick(id!);
      }}
    >
      <Box sx={{ width: "40%", height: "100%", overflow: "hidden" }}>
        {image && (
          <CardMedia component="img" sx={{ width: "100%", height: "100%", objectFit: "cover" }} image={imageDictionary[image]} title={image} />
        )}
      </Box>
      <Box sx={{ width: "60%", height: "100%", padding: "16px" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {displayName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {type}
          </Typography>
        </CardContent>
      </Box>
    </StyledCard>
  ) : (
    <StyledCard
      sx={{ maxWidth: 345 }}
      onClick={() => {
        onEntryClick(id!);
      }}
    >
      {image && <CardMedia component="img" sx={{ height: 140 }} image={imageDictionary[image]} title={image} />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {displayName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {type}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}

export default ItemTypeEntry;
