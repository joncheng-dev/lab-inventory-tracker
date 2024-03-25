import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ChildModalStyle = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type ChildModalDeleteAllProps = {
  // entryId: string;
  // onClickingDelete: (id: string) => void;
  onClickingDelete: () => void;
};

export default function ChildModalDeleteAll(props: ChildModalDeleteAllProps) {
  const { onClickingDelete } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleOpen} color="error">
        Remove All
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...ChildModalStyle, width: 400 }}>
          <h3>Are you sure you want to remove all items of this type?</h3>
          <br />
          <p>This action cannot be undone.</p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={onClickingDelete} variant="contained" startIcon={<DeleteIcon />} color="error">
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
