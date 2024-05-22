import { useState } from "react";
import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ChildModalStyle = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type ChildModalProps = {
  entryId: string;
  onClickingDelete: (id: string) => void;
};

export default function ChildModal(props: ChildModalProps) {
  const { entryId, onClickingDelete } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleOpen} color="warning">
        Delete
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...ChildModalStyle, width: 400 }}>
          <Typography variant="h5">Are you sure you want to Delete?</Typography>
          <br />
          <Typography variant="body1">This action cannot be undone.</Typography>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "30px" }}>
            <Button onClick={handleClose} variant="contained" color="secondary" sx={{ marginRight: "15px" }}>
              Cancel
            </Button>
            <Button onClick={() => onClickingDelete(entryId!)} variant="contained" startIcon={<DeleteIcon />} color="warning">
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
