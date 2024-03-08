import React from "react";
import { ItemType } from "../types";

export const filterList = (list: ItemType[], searchQuery: string, tagsToFilter: string[]) => {
  let filteredListCopy = [...list];
  if (tagsToFilter.length > 0) {
    filteredListCopy = filteredListCopy.filter((entry) => tagsToFilter.every((tag) => entry.tags.includes(tag)));
  }
  if (searchQuery !== "") {
    filteredListCopy = filteredListCopy.filter((entry) => entry.displayName.toLowerCase().includes(searchQuery.toLowerCase()));
  }
  return filteredListCopy;
};
