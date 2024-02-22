import { ItemType } from "../types";

export const filterList = (list: ItemType[], searchQuery: string, tagsToFilter: string[]) => {
  let filteredListCopy = [...list];
  if (tagsToFilter.length > 0) {
    filteredListCopy = filteredListCopy.filter((entry) => tagsToFilter.some((tag) => entry.tags.includes(tag)));
  }
  if (searchQuery !== "") {
    filteredListCopy = filteredListCopy.filter((entry) => entry.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }
  return filteredListCopy;
};
