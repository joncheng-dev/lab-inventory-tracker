import React, { useState, ReactNode } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

interface PopoverCustomProps {
  buttonContent: ReactNode;
  popoverContent: ReactNode;
}

const PopoverCustom = (props: PopoverCustomProps) => {
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
    // Stop propagation to prevent parent onClick from triggering
    event.stopPropagation();
    // Open the popover
    handleClick(event);
  };

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleMoreVertClick}>
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
        {popoverContent}
      </Popover>
    </div>
  );
};

export default PopoverCustom;
