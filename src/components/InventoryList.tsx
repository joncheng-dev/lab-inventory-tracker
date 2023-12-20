import styled from "styled-components";
import InventoryEntry from "./InventoryEntry";
import { InventoryEntry as IEntry } from "../types";

const ListContainer = styled.div`
  text-align: left;
  /* display: flex;
  flex-direction: column; */
`;

const ItemContainer = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 2.5em;
`;

type InventoryListProps = {
  listOfEntries: IEntry[];
  onEntrySelection: (id: string) => void;
  onClickingAddEntry: () => void;
};

function InventoryList(props: InventoryListProps) {
  const { listOfEntries, onEntrySelection, onClickingAddEntry } = props;
  console.log("InventoryList: listOfEntries", listOfEntries);

  return (
    <ListContainer>
      <h1>Inventory List</h1>
      {<button onClick={onClickingAddEntry}>Add Entry</button>}
      <br />
      <br />
      <ItemContainer>
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
      </ItemContainer>
    </ListContainer>
  );
}

export default InventoryList;
