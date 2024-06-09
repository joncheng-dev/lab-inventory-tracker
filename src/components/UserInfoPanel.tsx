import { useEffect, useState } from "react";
import { Item, ItemType } from "../types";
import UserItem from "./UserItem";
import { Divider, Grid, Tooltip, Typography } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { sharedInfo } from "../helpers/UserContext";
import { useLocation } from "react-router-dom";

type UserInfoPanelProps = {
  listOfItemTypes: ItemType[];
  itemsCheckedOutByUser: Item[];
  onEntryClick: (id: string) => void;
};

const userInfoPanelTooltipText = `List of items you have currently checked out`;

export default function UserInfoPanel(props: UserInfoPanelProps) {
  const userProvider = sharedInfo();
  const location = useLocation();
  const currentPath = location.pathname;
  const { listOfItemTypes, itemsCheckedOutByUser, onEntryClick } = props;
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});

  const uniqueTypesCheckedOut = Array.from(new Set(itemsCheckedOutByUser.map((item) => item.type)));
  const filteredItemTypes = listOfItemTypes.filter((itemType) => uniqueTypesCheckedOut.includes(itemType.type));

  useEffect(() => {
    const updatedCount: Record<string, number> = {};
    listOfItemTypes.forEach((itemType) => {
      const count = itemsCheckedOutByUser.filter((item) => item.type === itemType.type).length;
      updatedCount[itemType.type] = count;
    });
    setItemCounts(updatedCount);
  }, [itemsCheckedOutByUser, listOfItemTypes]);

  return (
    <>
      {currentPath === "/inventory" && (
        <>
          <Grid container item xs={12}>
            <Grid container item>
              <Grid item>
                <Typography variant="h4">User Info Panel</Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  title={userInfoPanelTooltipText}
                  placement="top"
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: "offset",
                        },
                      ],
                    },
                  }}
                >
                  <InfoOutlined fontSize="small" />
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <br />
          <Typography variant="h5">Logged in as:</Typography>
          <Typography variant="h6">{userProvider ? userProvider.currentUser?.email : ""}</Typography>
          <Divider />
          <Grid container pt={3}>
            <Grid item xs={8}>
              <Typography variant="body1">Item Name</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Quantity</Typography>
            </Grid>
          </Grid>
          {itemsCheckedOutByUser.length > 0 ? (
            filteredItemTypes.map((entry) => <UserItem entry={entry} count={itemCounts[entry.type]} key={entry.id} onEntryClick={onEntryClick} />)
          ) : (
            <Typography variant="body1">No items checked out</Typography>
          )}
        </>
      )}
      {currentPath === "/catalog" && (
        <>
          <Typography variant="h4">User Info Panel</Typography>
          <Typography variant="body1">Not applicable for Item Types</Typography>
        </>
      )}
    </>
  );
}
