import { UserEntry, InventoryEntry } from "../types";
import UserItem from "./UserItem";
import Divider from "@mui/material/Divider";
import { useUser } from "./Home";

type UserInfoPanelProps = {
  user: UserEntry;
  itemsCheckedOutByUser: InventoryEntry[];
  onEntrySelection: (id: string) => void;
};

function UserInfoPanel(props: UserInfoPanelProps) {
  // const { user, itemsCheckedOutByUser, onEntrySelection } = props;
  const { itemsCheckedOutByUser, onEntrySelection } = props;
  const { currentUser } = useUser();

  // const { userEmail } = user || null;

  if (!currentUser || !currentUser.objectToStore) {
    return <div>Loading...</div>;
  }
  const { userEmail } = currentUser!.objectToStore;
  // Use the ids passed in by itemsCheckedOutByUser --> list
  // Use it to query against the database.
  // Populate a list of items with full detail.
  // Then send that to UserItem.
  // console.log(JSON.stringify(itemsCheckedOutByUser, null, 2));

  return (
    <>
      <h2>User Info. Panel</h2>
      <Divider />
      <br />
      <h4>Email: {userEmail}</h4>
      <Divider />
      {itemsCheckedOutByUser.map((entry) => (
        <UserItem itemEntry={entry} whenEntryClicked={onEntrySelection} key={entry.id} />
      ))}
    </>
  );
}

export default UserInfoPanel;
