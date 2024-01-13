import React, { useContext } from "react";
import { UserEntry, InventoryEntry } from "../types";
import UserItem from "./UserItem";
import Divider from "@mui/material/Divider";
import { UserContext } from "../helpers/UserContext";

type UserInfoPanelProps = {
  // user: UserEntry;
  itemsCheckedOutByUser: InventoryEntry[];
  onEntryClick: (id: string) => void;
  // InventoryEntryDetail
  onClickingEdit: () => void;
  onClickingCheckout: () => void;
  onClickingReturn: (itemId: string) => void;
  onClickingDelete: (id: string) => void;
  onClickingExit: () => void;
};

export default function UserInfoPanel(props: UserInfoPanelProps) {
  const currentUser = useContext(UserContext);
  console.log("UserInfoPanel, currentUser exists: ", currentUser!);
  // const { user, itemsCheckedOutByUser, onEntrySelection } = props;
  // prettier-ignore
  const {
    itemsCheckedOutByUser,
    onEntryClick,
    // For InventoryEntryDetail
    onClickingEdit,
    onClickingCheckout,
    onClickingReturn,
    onClickingDelete,
    onClickingExit,
  } = props;

  return (
    <>
      <h2>User Info. Panel</h2>
      <Divider />
      <br />
      <h4>Email: {currentUser ? currentUser.userEmail : ""}</h4>
      <Divider />
      {itemsCheckedOutByUser.map((entry) => (
        <UserItem
          entry={entry}
          onEntryClick={onEntryClick}
          onClickingEdit={onClickingEdit}
          onClickingCheckout={onClickingCheckout}
          onClickingReturn={onClickingReturn}
          onClickingDelete={onClickingDelete}
          onClickingExit={onClickingExit}
          key={entry.id}
        />
      ))}
    </>
  );
}
