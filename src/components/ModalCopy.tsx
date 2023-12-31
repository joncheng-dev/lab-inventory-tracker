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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type BasicModalProps = {
  children: ReactNode;
};

export default function BasicModal(props: BasicModalProps) {
  // const { entry, onEntryClick } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    onEntryClick();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button size="small" variant="contained" onClick={handleOpen}>
        Details
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>{props.children}</Box>
      </Modal>
    </div>
  );
}
