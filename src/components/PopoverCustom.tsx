import React, { useState, ReactNode } from "react";
import Popover from "@mui/material/Popover";
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

interface PopoverCustomProps {
  buttonContent: ReactNode;
  popoverContent: ReactNode;
}

const PopoverCustom = (props: PopoverCustomProps) => {
  const theme = useTheme();
  const { buttonContent, popoverContent } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "custom-popover" : undefined;

  const handleMoreVertClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleClick(event);
  };

  return (
    <div>
      <IconButton
        aria-describedby={id}
        onClick={handleMoreVertClick}
        sx={{
          "&:focus, &:active": {
            outline: "none",
          },
        }}
      >
        {buttonContent}
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div style={{ display: "block", padding: "8px", backgroundColor: theme.palette.mode === "dark" ? "#262b32" : "#141b2d" }}>
          {popoverContent}
        </div>
      </Popover>
    </div>
  );
};

export default PopoverCustom;
