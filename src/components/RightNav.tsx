import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Item, ItemType } from "../types";
import { Drawer, useMediaQuery, useTheme } from "@mui/material/";
import { sharedInfo } from "../helpers/UserContext.tsx";
import { tokens } from "../themes";
import MoreVert from "@mui/icons-material/MoreVert";
import { StyledIconButton } from "../style/styles.tsx";
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
