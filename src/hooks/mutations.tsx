import { ItemType } from "../types";
import { db } from "../firebase.js";
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export const addNewDoc = async (collectionName: string, entry: ItemType) => {
  await addDoc(collection(db, collectionName), entry);
};

export const editExistingDoc = async (collectionName: string, entry: ItemType) => {
  const entryRef = doc(db, collectionName, entry.id!);
  const data: Partial<ItemType> = {
    name: entry.name,
    description: entry.description,
    location: entry.location,
    tags: entry.tags || [],
  };
  await updateDoc(entryRef, data);
};

export const deleteExistingDoc = async (collectionName: string, id: string) => {
  await deleteDoc(doc(db, collectionName, id));
};
