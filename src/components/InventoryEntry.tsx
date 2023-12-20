import styled from "styled-components";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const StyledCard = styled(Card)`
  width: 300px;
`;

type InventoryEntryProps = {
  id?: string;
  name: string;
  description: string;
  location: string;
  isCheckedOut: boolean;
  checkedOutBy: string | null;
  dateCheckedOut: string | null;
  tags: string[];
  whenEntryClicked: (id: string) => void;
};

function InventoryEntry(props: InventoryEntryProps) {
  // prettier-ignore
  const {
    id,
    name,
    description,
    location,
    isCheckedOut,
    checkedOutBy,
    dateCheckedOut,
    tags,
    whenEntryClicked,
  } = props;

  return (
    <>
      <StyledCard>
        <CardContent>
          {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Name: {name}
          </Typography> */}
          <Typography variant="h5" component="div">
            Name: {name}
          </Typography>
          {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography> */}
          <Typography variant="body2">
            Description: {description}
            <br />
            Location: {location}
            <br />
            Is Checked Out: {isCheckedOut ? "Yes" : "No"}
            <br />
          </Typography>
          <Typography variant="body2">Categories:</Typography>
          <Stack>
            {tags.map((tag, index) => (
              <Chip key={index} label={tag} />
            ))}
          </Stack>
        </CardContent>
        <CardActions>
          <Button onClick={() => whenEntryClicked(id!)} size="small">
            Details
          </Button>
        </CardActions>
      </StyledCard>
      {/* <div onClick={() => whenEntryClicked(id!)}>
        <h3>Name: {name}</h3>
        <p>Description: {description}</p>
        <p>Location: {location}</p>
        <p>Is Checked Out: {isCheckedOut ? "Yes" : "No"}</p>
        <p>Checked Out By: {isCheckedOut ? checkedOutBy : null}</p>
        <p>Date Checked Out: {isCheckedOut ? dateCheckedOut : null}</p>
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div> */}
    </>
  );
}

export default InventoryEntry;
