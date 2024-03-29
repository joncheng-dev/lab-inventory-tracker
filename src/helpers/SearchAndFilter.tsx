import { Item, ItemType } from "../types";

export const filterList = (list: ItemType[], searchQuery: string, tagsToFilter: string[]) => {
  let filteredListCopy = [...list];
  if (tagsToFilter.length > 0) {
    filteredListCopy = filteredListCopy.filter((entry) => tagsToFilter.every((tag) => entry.tags.includes(tag)));
  }
  if (searchQuery !== "") {
    filteredListCopy = filteredListCopy.filter((entry) => entry.displayName.toLowerCase().includes(searchQuery.toLowerCase()));
  }
  filteredListCopy.sort((a, b) => a.displayName.localeCompare(b.displayName));
  return filteredListCopy;
};

export const itemEntriesToDisplay = (listOfItems: Item[], listOfItemTypes: ItemType[]) => {
  if (listOfItems.length > 0 && listOfItemTypes.length > 0) {
    // Create a SET of item 'type'.
    const setOfTypes = [...new Set(listOfItems.map((entry) => entry.type))];
    // console.log("itemList - setOfTypes: ", { itemList, setOfTypes, itemTypeList });
    const filteredItemTypes = listOfItemTypes
      .filter((entry) => setOfTypes.includes(entry.type || ""))
      .filter((entry): entry is ItemType => entry !== undefined);
    // console.log("item type list updated, filteredItemTypes: ", filteredItemTypes);
    return filteredItemTypes;
  } else {
    return listOfItemTypes;
  }
};
