import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const saveViewPreference = async(
  userId: string,
  view: "card" | "table"
) => {
  const userRef = doc(db, "users", userId);
  try {
    await setDoc(
      userRef,
      { viewMode: view },
      { merge: true }
    );
  } catch (error) {
    console.error("Failed to save view preference: ", error);
  }
};