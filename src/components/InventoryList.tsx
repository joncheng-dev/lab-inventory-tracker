import styled from "styled-components";
import InventoryEntry from "./InventoryEntry";
import { InventoryEntry as IEntry } from "./Types";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

type InventoryListProps = {
  listOfEntries: IEntry[];
  onEntrySelection: (id: string) => void;
  onClickingAddEntry: () => void;
};

function InventoryList(props: InventoryListProps) {
  const { listOfEntries, onEntrySelection, onClickingAddEntry } = props;

  return (
    <ListContainer>
      <h1>Inventory List</h1>
      {<button onClick={onClickingAddEntry}>Add Entry</button>}
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
