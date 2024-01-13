import { useContext } from "react";
import { InventoryEntry } from "../types";
import UserItem from "./UserItem";
import Divider from "@mui/material/Divider";
import { UserContext } from "../helpers/UserContext";

type UserInfoPanelProps = {
  itemsCheckedOutByUser: InventoryEntry[];
  onEntryClick: (id: string) => void;
};

export default function UserInfoPanel(props: UserInfoPanelProps) {
  const currentUser = useContext(UserContext);
  console.log("UserInfoPanel, currentUser exists: ", currentUser!);
  const { itemsCheckedOutByUser, onEntryClick } = props;

  return (
    <>
      <h2>User Info. Panel</h2>
      <Divider />
      <br />
      <h4>Email: {currentUser ? currentUser.userEmail : ""}</h4>
      <Divider />
      {itemsCheckedOutByUser.map((entry) => (
        <UserItem entry={entry} onEntryClick={onEntryClick} key={entry.id} />
      ))}
    </>
  );
}
