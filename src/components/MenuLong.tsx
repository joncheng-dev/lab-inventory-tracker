import React, { useState, ReactNode } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import SellIcon from "@mui/icons-material/Sell";

interface MenuLongProps {
  content: string[];
}

const ITEM_HEIGHT = 48;

export default function MenuLong({ content }: MenuLongProps) {
  console.log("MenuLong, content: ", content);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleMoreVertClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleClick(event);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleMoreVertClick}
        sx={{
          "&:focus, &:active": {
            outline: "none",
          },
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {content.map((entry, index) => (
          <MenuItem key={index}>
            <Chip icon={<SellIcon />} label={entry} variant="outlined" size="small" />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
