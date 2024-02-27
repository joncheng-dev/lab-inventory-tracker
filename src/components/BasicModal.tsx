import * as React from "react";
import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { InventoryEntry } from "../types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "60vh",
  width: "60vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type BasicModalProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

export default function BasicModal(props: BasicModalProps) {
  const { children, open, onClose } = props;
  if (!open) {
    return null;
  }

  return (
    <div>
      <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          {children}
          <Button onClick={onClose}>Exit</Button>
        </Box>
      </Modal>
    </div>
  );
}
