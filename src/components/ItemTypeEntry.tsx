import styled from "styled-components";
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";
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
const StyledCard = styled(Card)`
  flex: 0 1 auto;
  width: 250px;
  max-width: 30%;
  border: 1px black solid;
  /* background: #369; */
  position: relative;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
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

  return (
    <StyledCard
      sx={{ maxWidth: 345 }}
      onClick={() => {
        onEntryClick(id!);
      }}
    >
      {image && <CardMedia sx={{ height: 140 }} image={imageDictionary[image]} title={image} />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {displayName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">
          Details
        </Button>
      </CardActions>
    </StyledCard>
  );
}

export default ItemTypeEntry;

{
  /* <Stack>
  {tags.map((tag, index) => (
    <Chip key={index} label={tag} />
  ))}
</Stack> */
}
