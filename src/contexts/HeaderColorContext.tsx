"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type HeaderColorContextType = {
  headerColor: "light" | "dark";
  setHeaderColor: (color: "light" | "dark") => void;
};

const HeaderColorContext = createContext<HeaderColorContextType | undefined>(
  undefined
);

export function HeaderColorProvider({ children }: { children: ReactNode }) {
  const [headerColor, setHeaderColor] = useState<"light" | "dark">("light");

  return (
    <HeaderColorContext.Provider value={{ headerColor, setHeaderColor }}>
      {children}
    </HeaderColorContext.Provider>
  );
}

export function useHeaderColor() {
  const context = useContext(HeaderColorContext);
  if (context === undefined) {
    throw new Error("useHeaderColor must be used within a HeaderColorProvider");
  }
  return context;
}
