import React, { useState } from "react";
import { InventoryEntry } from "../types";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BasicModal from "./BasicModal.js";
import InventoryEntryDetail from "../components/InventoryEntryDetail.js";

type UserItemProps = {
  entry: InventoryEntry;
  onEntryClick: (id: string) => void;
  // InventoryEntryDetail
  onClickingEdit: () => void;
  onClickingCheckout: () => void;
  onClickingReturn: (itemId: string) => void;
  onClickingDelete: (id: string) => void;
  onClickingExit: () => void;
};

const StyledCard = styled(Card)`
  flex: 0 1 auto;
  max-width: 100%;
  border: 1px rgba(232, 230, 227, 0.87);
  background: #369;
  position: relative;
  text-align: left;
`;

export default function UserItem(props: UserItemProps) {
  // prettier-ignore
  const {
    entry,
    onEntryClick,
    onClickingEdit,
    onClickingCheckout,
    onClickingReturn,
    onClickingDelete,
    onClickingExit,
  } = props;
  const { id, name, dateCheckedOut } = entry;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* <StyledCard onClick={() => openSpecifiedEntryModal(id!)}> */}
      <StyledCard
        onClick={() => {
          console.log("UserItem, Div clicked");
          setIsOpen(true);
          onEntryClick(id!);
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2">Checkout Date: {dateCheckedOut}</Typography>
        </CardContent>
      </StyledCard>
      <BasicModal
        open={isOpen}
        onClose={() => {
          onClickingExit();
          setIsOpen(false);
        }}
      >
        <InventoryEntryDetail
          entry={entry}
          onClickingEdit={onClickingEdit}
          onClickingCheckout={onClickingCheckout}
          onClickingReturn={onClickingReturn}
          onClickingDelete={onClickingDelete}
        />
      </BasicModal>
    </>
  );
}
