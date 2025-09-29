import React, { createContext, useContext, useState } from "react";

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

  return (
    <PreferencesContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </PreferencesContext.Provider>
  );
};