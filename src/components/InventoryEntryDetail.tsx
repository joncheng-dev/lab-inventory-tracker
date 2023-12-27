import { InventoryEntry } from "../types";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import Chip from "@mui/material/Chip";
import { Box, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import { tokens } from "../themes";

const EntryDetailContainer = styled.div`
  padding-left: 50px;
  background-color: #282828;
  padding-top: 25px;
`;

const InputColumnContainer = styled.div`
  float: left;
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 1rem;
  row-gap: 0.25rem;
`;

const StyledInfoItem = styled.div`
  display: grid;
  grid-template-columns: auto;
  font-size: 1rem;
  text-align: left;
`;

const StyledItemHeader = styled.p`
  font-size: 1rem;
  color: rgb(83, 167, 235);
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 0;
`;

const StyledItemValue = styled.p`
  font-size: 1rem;
  color: #ffffff;
`;

const StyledStack = styled(Stack)`
  display: block;
  justify-content: "left";
`;

const TextAlignLeftContainer = styled.div`
  text-align: left;
`;

// Typing for Inventory Entry Details component
type InventoryEntryDetailProps = {
  entry: InventoryEntry;
  onClickingCheckout: () => void;
  onClickingReturn: (itemId: string) => void;
  onClickingEdit: () => void;
  onClickingDelete: (id: string) => void;
  onClickingExit: () => void;
};

function InventoryEntryDetails(props: InventoryEntryDetailProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { entry, onClickingCheckout, onClickingReturn, onClickingEdit, onClickingDelete, onClickingExit } = props;
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
  } = entry;

  return (
    <TextAlignLeftContainer>
      <h2>Inventory Entry Detail</h2>
      <EntryDetailContainer>
        <Box sx={{ flexGrow: 1, backgroundColor: colors.primary[400] }}>
          <Grid container spacing={2}>
            <Grid xs={7}>
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1.5, width: "50ch" },
                }}
              >
                <h3>{name}</h3>
                <Divider />
                <br />
                <InputColumnContainer>
                  <StyledInfoItem>
                    <StyledItemHeader>Description</StyledItemHeader>
                    <StyledItemValue>{description}</StyledItemValue>
                  </StyledInfoItem>
                  <StyledInfoItem>
                    <StyledItemHeader>Location</StyledItemHeader>
                    <StyledItemValue>{location}</StyledItemValue>
                  </StyledInfoItem>
                  <StyledInfoItem>
                    <StyledItemHeader>Is Checked Out</StyledItemHeader>
                    <StyledItemValue>{isCheckedOut ? "Yes" : "No"}</StyledItemValue>
                  </StyledInfoItem>
                  <StyledInfoItem>
                    <StyledItemHeader>Checked Out By</StyledItemHeader>
                    <StyledItemValue>{isCheckedOut ? checkedOutBy : null}</StyledItemValue>
                  </StyledInfoItem>
                  <StyledInfoItem>
                    <StyledItemHeader>Date Checked Out</StyledItemHeader>
                    <StyledItemValue>{isCheckedOut ? dateCheckedOut : null}</StyledItemValue>
                  </StyledInfoItem>
                </InputColumnContainer>
              </Box>
            </Grid>
            <Grid xs={5} pt={1}>
              <h2>Tags</h2>
              <Divider />
              <br />
              <StyledStack>
                {tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="medium" />
                ))}
              </StyledStack>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" p={1}>
            <Box display="flex" borderRadius="3px" p={2}>
              <Stack spacing={2} direction="row">
                <Button onClick={() => onClickingCheckout()} variant="contained">
                  Check Out
                </Button>
                <Button onClick={() => onClickingReturn(id!)} variant="contained">
                  Return
                </Button>
              </Stack>
            </Box>
            <Box display="flex" borderRadius="3px" p={2}>
              <Stack spacing={2} direction="row">
                <Button onClick={onClickingEdit} variant="contained">
                  Edit entry
                </Button>
                <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => onClickingDelete(id!)} color="error">
                  Delete
                </Button>
                <Button onClick={onClickingExit} variant="contained">
                  Exit
                </Button>
              </Stack>
            </Box>
          </Box>

          <br />
        </Box>
      </EntryDetailContainer>
    </TextAlignLeftContainer>
  );
}

export default InventoryEntryDetails;
