import styled from "styled-components";
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";
import { ItemType } from "../types";

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

function ItemTypeEntry(props: ItemTypeEntryProps) {
  const { entry, onEntryClick } = props;
  const { id, displayName, type, image } = entry;

  return (
    <StyledCard sx={{ maxWidth: 345 }}>
      {image && <CardMedia sx={{ height: 140 }} image={image} title="selected image" />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {displayName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            onEntryClick(id!);
          }}
        >
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
