// import * as React from "react";
import { ReactNode } from "react";
import { Box, Button, Grid, Modal } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
// import Typography from "@mui/material/Typography";
// import { Item } from "../types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -60%)",
  height: "80vh",
  width: "70vw",
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
          <Grid container>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <CloseIcon onClick={onClose}>Exit</CloseIcon>
            </Grid>
            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
