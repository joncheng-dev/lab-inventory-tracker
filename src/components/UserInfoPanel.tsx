import { UserEntry, InventoryEntry } from "./Types";
import UserItem from "./UserItem";

type UserInfoPanelProps = {
  user: UserEntry;
  itemsCheckedOutByUser: InventoryEntry[];
};

function UserInfoPanel(props: UserInfoPanelProps) {
  const { user, itemsCheckedOutByUser } = props;
  const { userId, userEmail } = user || null;

  // Use the ids passed in by itemsCheckedOutByUser --> list
  // Use it to query against the database.
  // Populate a list of items with full detail.
  // Then send that to UserItem.

  return (
    <>
      <h1>User Information</h1>
      <h3>User Id: {userId}</h3>
      <h3>User Email: {userEmail}</h3>
      {itemsCheckedOutByUser.map((entry) => (
        <UserItem itemEntry={entry} />
      ))}
    </>
  );
}

export default UserInfoPanel;
