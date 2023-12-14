import { InventoryEntryProps } from "./Types";

function InventoryEntry(props: InventoryEntryProps) {
  return (
    <>
      <h3>Name: {props.name}</h3>
      <p>Description: {props.description}</p>
      <p>Location: {props.location}</p>
      <p>Checked Out: {props.checkedOut ? "Yes" : "No"}</p>
      <p>Checked Out By: {props.checkedOut ? props.checkedOutBy : null}</p>
      <p>Date Checked Out: {props.checkedOut ? props.dateCheckedOut : null}</p>
      <ul>
        {props.tags?.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </>
  );
}

export default InventoryEntry;
