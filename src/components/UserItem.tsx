import { InventoryEntry } from "./Types";

type UserItemProps = {
  itemEntry: InventoryEntry;
};

function UserItem(props: UserItemProps) {
  const { itemEntry } = props;
  const { name, dateCheckedOut } = itemEntry;

  return (
    <div>
      {/* prettier-ignore */}
      <p><strong>Name: {name}</strong></p>
      {/* prettier-ignore */}
      <p><strong>Check Out Date: {dateCheckedOut}</strong></p>
    </div>
  );
}

export default UserItem;
