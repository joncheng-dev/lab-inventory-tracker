import React from "react";
import InventoryEntry from "./InventoryEntry";
import { InventoryEntry as IEntry } from "./Types";

type InventoryListProps = {
  listOfEntries: IEntry[];
  onEntrySelection: (id: string) => void;
  onClickingAddEntry: () => void;
};

function InventoryList(props: InventoryListProps) {
  const { listOfEntries, onEntrySelection, onClickingAddEntry } = props;

  return (
    <React.Fragment>
      <h1>Inventory List</h1>
      {<button onClick={onClickingAddEntry}>Add Entry</button>}
      {listOfEntries.map((entry) => (
        <InventoryEntry
          whenEntryClicked={onEntrySelection}
          name={entry.name}
          location={entry.location}
          description={entry.description}
          isCheckedOut={entry.isCheckedOut}
          checkedOutBy={entry.checkedOutBy}
          dateCheckedOut={entry.dateCheckedOut}
          tags={entry.tags}
          id={entry.id!}
          key={entry.id}
        />
      ))}
    </React.Fragment>
  );
}

export default InventoryList;
