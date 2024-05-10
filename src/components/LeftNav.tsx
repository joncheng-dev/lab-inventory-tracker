import { useState } from "react";
import { styled } from "@mui/material/styles";
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
import { StyledIconButton } from "../style/styles.tsx";
import CategoryPanel from "./CategoryPanel.tsx";
import { useFilterList } from "../helpers/SearchAndFilter.tsx";

interface LeftNavProps {
  tagsToFilter: string[];
  onFilterByCategory: (arrayOfTags: string[]) => void;
}

const StyledLeftNavContainer = styled("div")(({ theme }) => ({
  gridArea: "leftNav",
}));

export default function LeftNav(props: LeftNavProps) {
  const { tagsToFilter, onFilterByCategory } = props;
  const userProvider = sharedInfo();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const { subjectTagChecklist, purposeTagChecklist } = useFilterList();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {userProvider?.currentUser?.isAdmin && (
          <Tooltip
            title="Catalog"
            placement="right"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -24],
                    },
                  },
                ],
              },
            }}
          >
            <ListItem key="Catalog" disablePadding>
              <ListItemButton component={Link} to="/catalog" sx={{ "&:hover": { color: "inherit !important" } }} >
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Catalog"/>
              </ListItemButton>
            </ListItem>
          </Tooltip>
        )}
        <Tooltip
          title="Inventory"
          placement="right"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -24],
                  },
                },
              ],
            },
          }}
        >
          <ListItem key="Inventory" disablePadding>
            <ListItemButton component={Link} to="/inventory" sx={{ "&:hover": { color: "inherit !important" } }}>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Inventory" />
            </ListItemButton>
          </ListItem>
        </Tooltip>
      </List>
    </Box>
  );

  return (
    <StyledLeftNavContainer>
      <StyledIconButton onClick={toggleDrawer(true)} className="menu-button-btwn-inventory-catalog">
        <MenuIcon className="menu-button-btwn-inventory-catalog" />
      </StyledIconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
        <Divider />
        {isSmallScreen && (
          <div style={{ paddingLeft: "20px" }}>
            <CategoryPanel
              tags={tagsToFilter}
              subjectTagChecklist={subjectTagChecklist}
              purposeTagChecklist={purposeTagChecklist}
              onCategorySelection={onFilterByCategory}
            />
          </div>
        )}
      </Drawer>
    </StyledLeftNavContainer>
  );
}
