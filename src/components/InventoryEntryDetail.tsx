import React from "react";
import { InventoryEntry } from "./Types";

// Typing for Inventory Entry Details component
type InventoryEntryDetailProps = {
  entry: InventoryEntry;
  onClickingCheckoutOrReturn: (task: string) => void;
  onClickingEdit: () => void;
  onClickingDelete: (id: string) => void;
  onClickingExit: () => void;
};

function InventoryEntryDetails(props: InventoryEntryDetailProps) {
  const { entry, onClickingDelete, onClickingEdit, onClickingCheckoutOrReturn, onClickingExit } = props;
  // prettier-ignore
  const {
    name,
    description,
    location,
    isCheckedOut,
    checkedOutBy,
    dateCheckedOut,
    tags,
  } = entry;

  return (
    <React.Fragment>
      <h1>Inventory Entry Detail</h1>
      <hr />
      <h3>Name: {name}</h3>
      <p>Description: {description}</p>
      <p>Location: {location}</p>
      <p>Is Checked Out: {isCheckedOut ? "Yes" : "No"}</p>
      <p>Checked Out By: {isCheckedOut ? checkedOutBy : null}</p>
      <p>Date Checked Out: {isCheckedOut ? dateCheckedOut : null}</p>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
      <button onClick={() => onClickingCheckoutOrReturn("check out item")}>Check Out Item</button>
      <button onClick={() => onClickingCheckoutOrReturn("return item")}>Return Item</button>
      <br />
      <hr />
      <button onClick={onClickingEdit}>Edit entry</button>
      <br />
      <button onClick={() => onClickingDelete(entry.id!)}>Delete Entry</button>
      <button onClick={onClickingExit}>Exit</button>
      <hr />
    </React.Fragment>
  );
}

export default InventoryEntryDetails;
