import { useState } from "react";
import { Box, Button, Modal, Snackbar, SnackbarContent } from "@mui/material";
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

interface SnackbarState {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  message:
    | "Items checked out successfully!"
    | "Total quantity updated successfully."
    | "New quantity is equal to current. No changes made."
    | "Cannot remove items that are checked out."
    | "Unable to delete items. All items need to be returned first."
    | "All items of type successfully removed from inventory.";
  color: "#4caf50" | "#FFFF00" | "#ff0f0f";
}

type ChildModalDeleteAllProps = {
  onClickingDelete: () => void;
};

export default function ChildModalDeleteAll(props: ChildModalDeleteAllProps) {
  const { onClickingDelete } = props;
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState<SnackbarState>({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "Unable to delete items. All items need to be returned first.",
    color: "#ff0f0f",
  });
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setNotification({
      ...notification,
      open: true,
    });
    onClickingDelete();
    if (notification.message !== "Unable to delete items. All items need to be returned first.") {
      handleClose();
    }
  };

  const handleNotificationClose = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  return (
    <>
      <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleOpen} color="warning">
        Remove All
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...ChildModalStyle, width: 400 }}>
          <h3>Are you sure you want to remove all items of this type?</h3>
          <br />
          <p>This action cannot be undone.</p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete} variant="contained" startIcon={<DeleteIcon />} color="warning">
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
      >
        <SnackbarContent message={notification.message} sx={{ bgcolor: notification.color }} />
      </Snackbar>
    </>
  );
}
