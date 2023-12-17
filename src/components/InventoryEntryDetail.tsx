import React from "react";
import { InventoryEntry } from "./Types";

// Typing for Inventory Entry Details component
type InventoryEntryDetailProps = {
  entry: InventoryEntry;
  onClickingCheckout: () => void;
  onClickingReturn: (itemId: string) => void;
  onClickingEdit: () => void;
  onClickingDelete: (id: string) => void;
  onClickingExit: () => void;
};

function InventoryEntryDetails(props: InventoryEntryDetailProps) {
  const { entry, onClickingCheckout, onClickingReturn, onClickingEdit, onClickingDelete, onClickingExit } = props;
  // prettier-ignore
  const {
    id,
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
      <button onClick={() => onClickingCheckout()}>Check Out Item</button>
      <button onClick={() => onClickingReturn(id!)}>Return Item</button>
      <br />
      <hr />
      <button onClick={onClickingEdit}>Edit entry</button>
      <br />
      <button onClick={() => onClickingDelete(id!)}>Delete Entry</button>
      <button onClick={onClickingExit}>Exit</button>
      <hr />
    </React.Fragment>
  );
}

export default InventoryEntryDetails;
