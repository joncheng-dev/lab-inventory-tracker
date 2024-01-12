import React, { useContext } from "react";
import { UserEntry, InventoryEntry } from "../types";
import UserItem from "./UserItem";
import Divider from "@mui/material/Divider";
import { UserContext } from "../helpers/UserContext";

type UserInfoPanelProps = {
  // user: UserEntry;
  itemsCheckedOutByUser: InventoryEntry[];
  onEntrySelection: (id: string) => void;
};

export default function UserInfoPanel(props: UserInfoPanelProps) {
  const currentUser = useContext(UserContext);
  console.log("UserInfoPanel, currentUser exists: ", currentUser!);
  // const { user, itemsCheckedOutByUser, onEntrySelection } = props;
  const { itemsCheckedOutByUser, onEntrySelection } = props;

  return (
    <>
      <h2>User Info. Panel</h2>
      <Divider />
      <br />
      <h4>Email: {currentUser ? currentUser.userEmail : ""}</h4>
      <Divider />
      {itemsCheckedOutByUser.map((entry) => (
        <UserItem itemEntry={entry} whenEntryClicked={onEntrySelection} key={entry.id} />
      ))}
    </>
  );
}
