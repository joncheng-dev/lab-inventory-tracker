import { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { collection, onSnapshot } from "firebase/firestore";
import { Item, ItemType } from "../types/index.js";

function useDBHook() {
  const [itemList, setItemList] = useState<Item[]>([]);
  const [itemTypeList, setItemTypeList] = useState<ItemType[]>([]);
  const [itemTypeListForForms, setItemTypeListForForms] = useState<ItemType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "items"),
      (collectionSnapshot) => {
        const entries: Item[] = [];
        collectionSnapshot.forEach((entry) => {
          entries.push({
            id: entry.id,
            type: entry.data().type,
            displayName: entry.data().displayName,
            isCheckedOut: entry.data().isCheckedOut,
            checkedOutBy: entry.data().checkedOutBy,
            dateCheckedOut: entry.data().dateCheckedOut,
          });
        });
        // console.log("db", entries);
        setItemList(entries);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "itemTypes"),
      (collectionSnapshot) => {
        const entries: ItemType[] = [];
        collectionSnapshot.forEach((entry) => {
          entries.push({
            id: entry.id,
            displayName: entry.data().displayName,
            location: entry.data().location,
            description: entry.data().description,
            tags: entry.data().tags,
            type: entry.data().type,
            image: entry.data().image,
          });
        });
        setItemTypeList(entries);
        setItemTypeListForForms(entries);
        // console.log("InventoryControl, entries: ", entries);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  return {
    itemList,
    itemTypeList,
    itemTypeListForForms,
    error,
  };
}

export default useDBHook;
