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
  const { id, displayName, type } = entry;

  return (
    <StyledCard sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image="src/images/contemplative-reptile.jpg" title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {displayName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {type}
        </Typography>
      </CardContent>
      {/* <Stack>
        {tags.map((tag, index) => (
          <Chip key={index} label={tag} />
        ))}
      </Stack> */}
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
        {/* <Button size="small">{isCheckedOut ? "Return" : "Check Out"}</Button> */}
      </CardActions>
    </StyledCard>
  );
}

export default ItemTypeEntry;
