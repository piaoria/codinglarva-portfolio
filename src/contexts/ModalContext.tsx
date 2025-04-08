"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Skill {
  name: string;
  icon: string;
  darkIcon?: string;
  description: string;
  level: number;
  experience: string;
  projects: number;
  proficiency: number;
  tag: string;
}

interface ModalContextType {
  selectedSkill: Skill | null;
  setSelectedSkill: (skill: Skill | null) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <ModalContext.Provider value={{ selectedSkill, setSelectedSkill }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
