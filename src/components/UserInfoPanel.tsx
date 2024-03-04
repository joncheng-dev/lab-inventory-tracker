import { useContext, useEffect, useState } from "react";
import { Item, ItemType } from "../types";
import UserItem from "./UserItem";
import Divider from "@mui/material/Divider";
import { UserContext } from "../helpers/UserContext";

type UserInfoPanelProps = {
  itemsCheckedOutByUser: Item[];
  listOfItemTypes: ItemType[];
  onEntryClick: (id: string) => void;
};

export default function UserInfoPanel(props: UserInfoPanelProps) {
  const currentUser = useContext(UserContext);
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
      <h2>User Info. Panel</h2>
      <Divider />
      <br />
      <h4>Email: {currentUser ? currentUser.userEmail : ""}</h4>
      <Divider />
      {filteredItemTypes.map((entry) => (
        <UserItem entry={entry} count={itemCounts[entry.type]} key={entry.id} onEntryClick={onEntryClick} />
      ))}
    </>
  );
}
