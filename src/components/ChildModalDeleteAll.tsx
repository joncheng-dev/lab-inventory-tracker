import { useState } from "react";
import { Box, Button, Modal, Snackbar, SnackbarContent, Typography, useTheme } from "@mui/material";
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
  color: string;
}

type ChildModalDeleteAllProps = {
  onClickingDelete: () => void;
};

export default function ChildModalDeleteAll(props: ChildModalDeleteAllProps) {
  const { onClickingDelete } = props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [notification, setNotification] = useState<SnackbarState>({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "Unable to delete items. All items need to be returned first.",
    color: `${theme.palette.warning.main}`,
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
      <Button
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={handleOpen}
        color="warning"
        sx={{ marginTop: "20px", marginRight: "22px", marginBottom: "15px" }}
      >
        Remove All
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...ChildModalStyle, width: 400 }}>
          <Typography variant="h6" fontWeight="bold">
            Are you sure you want to remove all items of this type?
          </Typography>
          <br />
          <Typography variant="body1">This action cannot be undone.</Typography>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "30px" }}>
            <Button onClick={handleClose} variant="contained" color="secondary" sx={{ marginRight: "15px" }}>
              Cancel
            </Button>
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
