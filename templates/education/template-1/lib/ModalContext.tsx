'use client';

import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isRegisterOpen: boolean;
  isBranchOpen: boolean;
  selectedProgram: string | null;
  openRegister: (program?: string) => void;
  closeRegister: () => void;
  openBranch: () => void;
  closeBranch: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const openRegister = (program?: string) => {
    if (program) setSelectedProgram(program);
    setIsRegisterOpen(true);
  };

  const closeRegister = () => {
    setIsRegisterOpen(false);
    setSelectedProgram(null);
  };

  const openBranch = () => setIsBranchOpen(true);
  const closeBranch = () => setIsBranchOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isRegisterOpen,
        isBranchOpen,
        selectedProgram,
        openRegister,
        closeRegister,
        openBranch,
        closeBranch,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
