import { InventoryEntry } from "./Types";

type UserItemProps = {
  itemEntry: InventoryEntry;
  whenEntryClicked: (id: string) => void;
};

function UserItem(props: UserItemProps) {
  const { itemEntry, whenEntryClicked } = props;
  const { id, name, dateCheckedOut } = itemEntry;

  return (
    <div onClick={() => whenEntryClicked(id!)}>
      {/* prettier-ignore */}
      <p><strong>Name: {name}</strong></p>
      {/* prettier-ignore */}
      <p><strong>Check Out Date: {dateCheckedOut}</strong></p>
    </div>
  );
}

export default UserItem;
