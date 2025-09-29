import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { sharedInfo } from "./UserContext";

interface PreferencesContextType {
  viewMode: "card" | "table";
  setViewMode: (mode: "card" | "table") => void;
}

const PreferencesContext = createContext<PreferencesContextType | null>(null);

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("usePreferences must be used within PreferencesProvider");
  return context;
};

export const PreferencesProvider = ({ children }: { children: React.ReactNode }) => {
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [isLoading, setIsLoading] = useState(false);
  const userProvider = sharedInfo();
  const { currentUser } = userProvider ?? {};

  useEffect(() => {
    const fetchPreference = async () => {
      if (!currentUser?.uid) {
        setViewMode("card");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const userRef = doc(db, "users", currentUser.uid);
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.viewMode === "card" || data.viewMode === "table") {
            setViewMode(data.viewMode);
          } else {
            setViewMode("card"); // fallback default
          }
        } else {
          setViewMode("card"); // fallback default
        }
      } catch (error) {
        console.error("Failed to fetch view preference", error);
        setViewMode("card"); // fallback default on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreference();
  }, [currentUser?.uid]);

  return (
    <PreferencesContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </PreferencesContext.Provider>
  );
};