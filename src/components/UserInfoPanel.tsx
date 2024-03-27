import { useContext, useEffect, useState } from "react";
import { Item, ItemType } from "../types";
import UserItem from "./UserItem";
import { Divider, Grid, Tooltip } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { sharedInfo } from "../helpers/UserContext";

type UserInfoPanelProps = {
  itemsCheckedOutByUser: Item[];
  listOfItemTypes: ItemType[];
  onEntryClick: (id: string) => void;
};

const userInfoPanelTooltipText = `List of items you have currently checked out`;

export default function UserInfoPanel(props: UserInfoPanelProps) {
  const userProvider = sharedInfo();
  // const [user] = useAuthState(auth);
  const { itemsCheckedOutByUser, listOfItemTypes, onEntryClick } = props;
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
      <Grid container item xs={12}>
        <Grid container item>
          <Grid item>
            <h3>User Info Panel</h3>
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
                      options: {
                        // offset: [0, -24],
                      },
                    },
                  ],
                },
              }}
            >
              <div>
                <InfoOutlined />
              </div>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <br />
      <h5>Logged in as:</h5>
      <h6>{userProvider ? userProvider.currentUser?.email : ""}</h6>
      <Divider />
      <Grid container pt={3}>
        <Grid item xs={8}>
          <p>Item Name</p>
        </Grid>
        <Grid item xs={4}>
          Quantity
        </Grid>
      </Grid>
      {itemsCheckedOutByUser.length > 0 ? (
        filteredItemTypes.map((entry) => <UserItem entry={entry} count={itemCounts[entry.type]} key={entry.id} onEntryClick={onEntryClick} />)
      ) : (
        <p>No items checked out</p>
      )}
    </>
  );
}
