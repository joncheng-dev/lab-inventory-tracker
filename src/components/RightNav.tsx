import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Item, ItemType } from "../types";
import { Box, Button, Drawer, Tooltip, useMediaQuery, useTheme } from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { sharedInfo } from "../helpers/UserContext.tsx";
import { tokens } from "../themes";
import List from "@mui/material/List";
import DescriptionIcon from "@mui/icons-material/Description";
import Divider from "@mui/material/Divider";
import InventoryIcon from "@mui/icons-material/Inventory";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MoreVert from "@mui/icons-material/MoreVert";
import { StyledIconButton } from "../style/styles.tsx";
import CategoryPanel from "./CategoryPanel.tsx";
import { useFilterList } from "../helpers/SearchAndFilter.tsx";
import UserInfoPanel from "./UserInfoPanel.tsx";
import { UserInfoColumn } from "../style/styles.tsx";

interface RightNavProps {
  listOfItemTypes: ItemType[];
  itemsCheckedOutByUser: Item[];
  onEntryClick: (id: string) => void;
}

const StyledRightNavContainer = styled("div")(({ theme }) => ({
  gridArea: "rightNav",
}));

export default function RightNav(props: RightNavProps) {
  const userProvider = sharedInfo();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { listOfItemTypes, itemsCheckedOutByUser, onEntryClick } = props;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <StyledRightNavContainer>
      <StyledIconButton onClick={toggleDrawer(true)} disableRipple>
        <MoreVert />
      </StyledIconButton>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <UserInfoColumn>
          <UserInfoPanel
            // prettier-ignore
            listOfItemTypes={listOfItemTypes}
            itemsCheckedOutByUser={itemsCheckedOutByUser}
            onEntryClick={onEntryClick}
          />
        </UserInfoColumn>
      </Drawer>
    </StyledRightNavContainer>
  );
}
