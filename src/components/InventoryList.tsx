import { FormEvent } from "react";
import styled from "styled-components";
import InventoryEntry from "./InventoryEntry";
import { InventoryEntry as IEntry } from "../types";
import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

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
  gap: 2.6em;
`;

type InventoryListProps = {
  listOfEntries: IEntry[];
  onEntrySelection: (id: string) => void;
  onClickingAddEntry: () => void;
  onSearchSubmit: (queryString: string) => void;
};

interface CustomElements extends HTMLFormControlsCollection {
  searchString: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

function InventoryList(props: InventoryListProps) {
  const { listOfEntries, onEntrySelection, onClickingAddEntry, onSearchSubmit } = props;
  console.log("InventoryList: listOfEntries", listOfEntries);

  function handleSearchBarSubmit(e: FormEvent<CustomForm>) {
    e.preventDefault();
    const target = e.currentTarget.elements;

    const searchQuery = target.searchString.value.toString();
    if (searchQuery !== "") {
      onSearchSubmit(searchQuery);
    }
    console.log("Search query sent to parent: ", searchQuery);
  }

  return (
    <ListContainer>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" borderRadius="3px">
          <h2>Inventory List</h2>
        </Box>
        <Box display="flex" component="form" onSubmit={handleSearchBarSubmit} noValidate autoComplete="off">
          <TextField name="searchString" sx={{ ml: 2, flex: 1 }} />
          {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" /> */}
          <IconButton type="submit" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
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
