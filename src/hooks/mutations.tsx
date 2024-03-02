import { AddItemsForm, Item, ItemType } from "../types";
import { db } from "../firebase.js";
import { collection, addDoc, deleteDoc, doc, getDoc, serverTimestamp, updateDoc, writeBatch } from "firebase/firestore";

export const addNewDoc = async (collectionName: string, entry: Item | ItemType) => {
  await addDoc(collection(db, collectionName), entry);
};

export const addMultipleDocs = async (collectionName: string, data: AddItemsForm) => {
  const { type, displayName, quantity } = data;
  const batch = writeBatch(db);

  for (let i = 0; i < quantity; i++) {
    const newDocRef = await addDoc(collection(db, collectionName), {
      type,
      displayName,
      dateAdded: serverTimestamp(),
      isCheckedOut: false,
      checkedOutBy: null,
      dateCheckedOut: null,
    });
    const newEntry = {
      id: newDocRef.id,
      type,
      displayName,
      dateAdded: serverTimestamp(),
      isCheckedOut: false,
      checkedOutBy: null,
      dateCheckedOut: null,
    };
    batch.set(newDocRef, newEntry);
  }

  await batch.commit();
};

export const editExistingDoc = async (collectionName: string, entry: ItemType) => {
  const entryRef = doc(db, collectionName, entry.id!);
  const data: Partial<ItemType> = {
    displayName: entry.displayName,
    description: entry.description,
    location: entry.location,
    tags: entry.tags || [],
    type: entry.type,
  };
  await updateDoc(entryRef, data);
};

export const deleteExistingDoc = async (collectionName: string, id: string) => {
  await deleteDoc(doc(db, collectionName, id));
};

export const checkOutUpdateDocs = async (collectionName: string, userEmail: string | undefined, selectedIds: string[]) => {
  const batch = writeBatch(db);

  for (const itemId of selectedIds) {
    const itemRef = doc(db, collectionName, itemId);
    const itemDoc = await getDoc(itemRef);
    const currentItemData = itemDoc.data();

    const updateObject = {
      ...currentItemData,
      checkedOutBy: userEmail,
      dateCheckedOut: serverTimestamp(),
      isCheckedOut: true,
    };
    batch.update(itemRef, updateObject);
  }
  await batch.commit();
};

const sampleItemList = [
  {
    id: "0cDzBIvubDfVgZs240fS",
    type: "bunsen-burner-2013-std",
    displayName: "Bunsen Burner",
    isCheckedOut: false,
    checkedOutBy: null,
    dateCheckedOut: null,
  },
  {
    id: "BRZYAu1ImMfU61EvLcmN",
    type: "magnifying-glass-2014",
    displayName: "Magnifying Glass",
    isCheckedOut: false,
    checkedOutBy: null,
    dateCheckedOut: null,
  },
  {
    id: "CLLqVvAYW10Ddk7pGgwo",
    type: "dice-six-sided-2008",
    displayName: "Dice",
    isCheckedOut: false,
    checkedOutBy: null,
    dateCheckedOut: null,
  },
  {
    id: "Noar5Kr0xUABoiYZ8CnQ",
    type: "dice-six-sided-2008",
    displayName: "Dice",
    isCheckedOut: false,
    checkedOutBy: null,
    dateCheckedOut: null,
  },
  {
    id: "RodcUqyhwJN9pPTxs1hg",
    type: "bunsen-burner-2013-std",
    displayName: "Bunsen Burner",
    isCheckedOut: false,
    checkedOutBy: null,
    dateCheckedOut: null,
  },
  {
    id: "V8nYVc1mg6jFdOYFeWgv",
    type: "magnifying-glass-2014",
    displayName: "Magnifying Glass",
    isCheckedOut: false,
    checkedOutBy: null,
    dateCheckedOut: null,
  },
  {
    id: "VI6OwVjE1WLwusg8eg8c",
    type: "dice-six-sided-2008",
    displayName: "Dice",
    isCheckedOut: false,
    checkedOutBy: null,
    dateCheckedOut: null,
  },
  {
    id: "Xv8mJ13dyDQqBk921cfW",
    type: "bunsen-burner-2013-std",
    displayName: "Bunsen Burner",
    isCheckedOut: false,
    checkedOutBy: null,
    dateCheckedOut: null,
  },
  {
    id: "YEjjFIZYyCaxA6qukQtH",
    type: "safety-goggles-student-2015",
    displayName: "Safety Goggles",
    isCheckedOut: false,
    checkedOutBy: null,
    dateCheckedOut: null,
  },
  {
    id: "bmE07gJCZHWAKVwRIgk4",
    type: "dice-six-sided-2008",
    displayName: "Dice",
    isCheckedOut: false,
    checkedOutBy: null,
    dateCheckedOut: null,
  },
  {
    id: "eZOfdESzR8FQzZRPLvZy",
    type: "dice-six-sided-2008",
    displayName: "Dice",
    isCheckedOut: false,
    checkedOutBy: null,
    dateCheckedOut: null,
  },
  {
    id: "scwXmrAhoGL7qyZZjKT5",
    type: "safety-goggles-student-2015",
    displayName: "Safety Goggles",
    isCheckedOut: false,
    checkedOutBy: null,
    dateCheckedOut: null,
  },
];
