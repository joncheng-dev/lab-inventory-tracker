import { Item, ItemType } from "../types";
import { db } from "../firebase.js";
import { collection, addDoc, deleteDoc, doc, serverTimestamp, updateDoc, writeBatch } from "firebase/firestore";

export const addNewDoc = async (collectionName: string, entry: Item | ItemType) => {
  await addDoc(collection(db, collectionName), entry);
};

export const addMultipleDocs = async (collectionName: string, data: ItemType, quantity: number) => {
  const { type, displayName } = data;
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
