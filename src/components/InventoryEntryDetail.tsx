import React from "react";
import { InventoryEntry } from "./Types";

// Typing for Inventory Entry Details component
type InventoryEntryDetailProps = {
  entry: InventoryEntry;
  onClickingCheckoutOrReturn: (id: string, task: string) => void;
  onClickingEdit: () => void;
  onClickingDelete: (id: string) => void;
  onClickingExit: () => void;
};

function InventoryEntryDetails(props: InventoryEntryDetailProps) {
  const { entry, onClickingDelete, onClickingEdit, onClickingCheckoutOrReturn, onClickingExit } = props;

  return (
    <React.Fragment>
      <h1>Inventory Entry Detail</h1>
      <hr />
      <h3>
        <strong>Name: </strong>
        {entry.name}
      </h3>
      <p>
        <strong>Location: </strong>
        {entry.location}
      </p>
      <p>
        <strong>Description: </strong>
        {entry.description}
      </p>
      <p>Checked Out: {entry.checkedOut ? "yes" : "no"}</p>
      <p>Checked Out By: {entry.checkedOutBy}</p>
      <p>Date Checked Out: {entry.dateCheckedOut}</p>
      <button onClick={() => onClickingCheckoutOrReturn(entry.id!, "check out")}>Check Out Item</button>
      <button onClick={() => onClickingCheckoutOrReturn(entry.id!, "return")}>Return Item</button>
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
