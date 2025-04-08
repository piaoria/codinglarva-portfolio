"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import SkillModal from "@/components/common/SkillModal";
import ProjectModal from "@/components/common/ProjectModal";

export type ModalType = "skill" | "project";

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

interface ModalProps {
  skill: {
    skill: Skill;
  };
  project: {
    projectId: string;
  };
}

interface ModalContextType {
  modalType: ModalType | null;
  modalProps: ModalProps[keyof ModalProps] | null;
  openModal: <T extends ModalType>(type: T, props: ModalProps[T]) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalProps, setModalProps] = useState<
    ModalProps[keyof ModalProps] | null
  >(null);

  const openModal = <T extends ModalType>(type: T, props: ModalProps[T]) => {
    setModalType(type);
    setModalProps(props);
  };

  const closeModal = () => {
    setModalType(null);
    setModalProps(null);
  };

  return (
    <ModalContext.Provider
      value={{ modalType, modalProps, openModal, closeModal }}
    >
      {children}
      {modalType === "skill" && modalProps && "skill" in modalProps && (
        <SkillModal skill={modalProps.skill} onClose={closeModal} />
      )}
      {modalType === "project" && modalProps && "projectId" in modalProps && (
        <ProjectModal projectId={modalProps.projectId} onClose={closeModal} />
      )}
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
