import { useState, useEffect } from "react";

export interface useLocalStorageProps {
  key: string;
  objectToStore: any | null;
}

// export interface UserEntry {
//   userId: string;
//   userEmail: string;
// }

function useLocalStorage({ key, objectToStore }: useLocalStorageProps) {
  // key & objectToStore are passed in correctly
  const [localState, setLocalState] = useState<any>(undefined);

  useEffect(() => {
    const localStoredObject = localStorage.getItem(key);
    if (localStoredObject === null && JSON.stringify(objectToStore) !== localStoredObject) {
      localStorage.setItem(key, JSON.stringify(objectToStore));
      setLocalState(objectToStore);
    } else {
      setLocalState(localStoredObject);
    }
  }, [key, objectToStore]);

  // console.log("useLocalStorage, localState: ", localState);
  return localState;
}

export default useLocalStorage;

// console.log("useLocalStorage, key: ", JSON.stringify(key));
// console.log("useLocalStorage, objectToStore: ", JSON.stringify(objectToStore));
