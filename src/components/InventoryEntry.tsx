import { InventoryEntryProps } from "./Types";

function InventoryEntry(props: InventoryEntryProps) {
  // prettier-ignore
  const {
    whenEntryClicked,
    name,
    description,
    location,
    checkedOut,
    checkedOutBy,
    dateCheckedOut,
    tags
  } = props;

  return (
    <>
      <div onClick={() => whenEntryClicked(id!)}>
        <h3>Name: {name}</h3>
        <p>Description: {description}</p>
        <p>Location: {location}</p>
        <p>Checked Out: {checkedOut ? "Yes" : "No"}</p>
        <p>Checked Out By: {checkedOut ? checkedOutBy : null}</p>
        <p>Date Checked Out: {checkedOut ? dateCheckedOut : null}</p>
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default InventoryEntry;
