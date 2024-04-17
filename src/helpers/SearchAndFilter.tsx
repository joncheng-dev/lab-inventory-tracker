import { useEffect, useState } from "react";
import { Item, ItemType } from "../types";
import useDBHook from "../hooks/useDBHook";

export const itemEntriesToDisplay = (listOfItems: Item[], listOfItemTypes: ItemType[]) => {
  if (listOfItems.length > 0 && listOfItemTypes.length > 0) {
    // Create a SET of item 'type'.
    const setOfTypes = [...new Set(listOfItems.map((entry) => entry.type))];

    // Count the occurrences of each item type
    const typeCounts: { [key: string]: number } = {};
    listOfItems.forEach((item) => {
      if (item.type in typeCounts) {
        typeCounts[item.type]++;
      } else {
        typeCounts[item.type] = 1;
      }
    });

    // Map item types to include count
    const filteredItemTypes = listOfItemTypes
      .filter((entry) => setOfTypes.includes(entry.type || ""))
      .filter((entry): entry is ItemType => entry !== undefined)
      .map((entry) => ({
        ...entry,
        count: typeCounts[entry.type] || 0,
      }));

    // console.log("item type list updated, filteredItemTypes: ", filteredItemTypes);
    return filteredItemTypes;
  } else {
    return listOfItemTypes;
  }
};

// export const itemEntriesToDisplay = (listOfItems: Item[], listOfItemTypes: ItemType[]) => {
//   if (listOfItems.length > 0 && listOfItemTypes.length > 0) {
//     // Create a SET of item 'type'.
//     const setOfTypes = [...new Set(listOfItems.map((entry) => entry.type))];
//     // console.log("itemList - setOfTypes: ", { itemList, setOfTypes, itemTypeList });
//     const filteredItemTypes = listOfItemTypes
//       .filter((entry) => setOfTypes.includes(entry.type || ""))
//       .filter((entry): entry is ItemType => entry !== undefined);
//     // console.log("item type list updated, filteredItemTypes: ", filteredItemTypes);
//     return filteredItemTypes;
//   } else {
//     return listOfItemTypes;
//   }
// };

export const useFilterList = () => {
  const { itemList, itemTypeList, itemTypeListForForms, error } = useDBHook();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tagsToFilter, setTags] = useState<string[]>([]);
  const [filteredItemTypeList, setFilteredItemTypeList] = useState<ItemType[]>([]);

  // Miscellaneous:
  const subjectTagChecklist: string[] = ["Biology", "Chemistry", "Earth Science", "Physics", "General"];
  const purposeTagChecklist: string[] = ["Equipment", "Glassware", "Materials", "Measurement", "Models", "Safety", "Tools"];

  const handleFilterList = () => {
    if (tagsToFilter.length === 0 && searchQuery === "") {
      setFilteredItemTypeList(itemTypeList);
      return;
    }
    const filteredResult = filterListSearch(itemTypeList);
    setFilteredItemTypeList(filteredResult);
  };

  useEffect(() => {
    handleFilterList();
  }, [itemTypeList, searchQuery, tagsToFilter]);

  const onSearchInputChange = (queryString: string) => {
    setSearchQuery(queryString);
  };

  const onFilterByCategory = (arrayOfTags: string[]) => {
    setTags(arrayOfTags);
  };

  const filterListSearch = (list: ItemType[]) => {
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

  return {
    searchQuery,
    onSearchInputChange,
    tagsToFilter,
    subjectTagChecklist,
    purposeTagChecklist,
    onFilterByCategory,
    filterListSearch,
    itemList,
    itemTypeList,
    filteredItemTypeList,
    itemTypeListForForms,
  };
};
