import React, { useState } from "react";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import BasicModal from "./BasicModal.js";
import InventoryEntryDetail from "../components/InventoryEntryDetail.js";
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
  // id?: string;
  // name: string;
  // description: string;
  // location: string;
  // isCheckedOut: boolean;
  // checkedOutBy: string | null;
  // dateCheckedOut: string | null;
  // tags: string[];
  onClickingEdit: () => void;
  onClickingCheckout: () => void;
  onClickingReturn: (itemId: string) => void;
  onClickingDelete: (id: string) => void;
  onClickingExit: () => void;
  onEntryClick: (id: string) => void;
};

// onClickingEdit={handleEditEntryButtonClick}
// onClickingCheckout={handleCheckOutItem}
// onClickingReturn={handleReturnItem}
// onClickingDelete={handleDeletingEntry}
// onClickingExit={handleExitButtonClick}

export default function InventoryEntry(props: InventoryEntryProps) {
  // prettier-ignore
  const {
    entry,
    onClickingEdit,
    onClickingCheckout,
    onClickingReturn,
    onClickingDelete,
    onClickingExit,
    onEntryClick,
  } = props;

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

  const [isOpen, setIsOpen] = useState(false);

  function openSpecifiedItemModal(entryId: string) {
    onEntryClick(entryId);
    setIsOpen(true);
  }

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
        <Button size="small" variant="contained" onClick={() => onEntryClick(id!)}>
          Details
        </Button>
        <Button onClick={() => openSpecifiedItemModal(id!)}>Open Modal</Button>
        <BasicModal open={isOpen} onClose={() => setIsOpen(false)}>
          <InventoryEntryDetail
            entry={entry}
            onClickingEdit={onClickingEdit}
            onClickingCheckout={onClickingCheckout}
            onClickingReturn={onClickingReturn}
            onClickingDelete={onClickingDelete}
            onClickingExit={onClickingExit}
          />
        </BasicModal>
        {/* <Button size="small">{isCheckedOut ? "Return" : "Check Out"}</Button> */}
      </CardActions>
    </StyledCard>
  );
}

// <Button size="small" variant="contained" onClick={() => whenEntryClicked(id!)}>
//   Details
// </Button>;

// <>
//   <StyledCard>
//     <CardContent>
//       <Typography variant="h5" component="div">
//         {name}
//       </Typography>
//       <Typography variant="body2">
//         Description: {description}
//         <br />
//         Location: {location}
//         <br />
//         Is Checked Out: {isCheckedOut ? "Yes" : "No"}
//         <br />
//       </Typography>
//       <Typography variant="body2">Tags:</Typography>
//       <Stack>
//         {tags.map((tag, index) => (
//           <Chip key={index} label={tag} />
//         ))}
//       </Stack>
//     </CardContent>
//     <ButtonContainer>
//       <Button onClick={() => whenEntryClicked(id!)} size="small">
//         Details
//       </Button>
//     </ButtonContainer>
//   </StyledCard>
// </>;

// <>
//   <StyledCard>
//     <CardContent>
//       {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//         Name: {name}
//       </Typography> */}
//       <Typography variant="h5" component="div">
//         {name}
//       </Typography>
//       {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
//         adjective
//       </Typography> */}
//       <Typography variant="body2">
//         Description: {description}
//         <br />
//         Location: {location}
//         <br />
//         Is Checked Out: {isCheckedOut ? "Yes" : "No"}
//         <br />
//       </Typography>
//       <Typography variant="body2">Tags:</Typography>
//       <Stack>
//         {tags.map((tag, index) => (
//           <Chip key={index} label={tag} />
//         ))}
//       </Stack>
//     </CardContent>
//     {/* <CardActions> */}
//     <ButtonContainer>
//       <Button onClick={() => whenEntryClicked(id!)} size="small">
//         Details
//       </Button>
//     </ButtonContainer>
//     {/* </CardActions> */}
//   </StyledCard>
//   {/* <div onClick={() => whenEntryClicked(id!)}>
//     <h3>Name: {name}</h3>
//     <p>Description: {description}</p>
//     <p>Location: {location}</p>
//     <p>Is Checked Out: {isCheckedOut ? "Yes" : "No"}</p>
//     <p>Checked Out By: {isCheckedOut ? checkedOutBy : null}</p>
//     <p>Date Checked Out: {isCheckedOut ? dateCheckedOut : null}</p>
//     <ul>
//       {tags.map((tag, index) => (
//         <li key={index}>{tag}</li>
//       ))}
//     </ul>
//   </div> */}
// </>;
