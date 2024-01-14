import styled from "styled-components";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { InventoryEntry as IEntry } from "../types";

//#region styles
const StyledCard = styled(Card)`
  flex: 0 1 auto;
  width: 250px;
  max-width: 30%;
  border: 1px black solid;
  background: #369;
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

type InventoryEntryProps = {
  entry: IEntry;
  onEntryClick: (id: string) => void;
};

function InventoryEntry(props: InventoryEntryProps) {
  console.log("InventoryEntry component renders");
  const { entry, onEntryClick } = props;
  const { id, name, description } = entry;

  return (
    <StyledCard sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image="src/images/contemplative-reptile.jpg" title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
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

export default InventoryEntry;
