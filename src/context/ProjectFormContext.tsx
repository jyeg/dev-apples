'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ProjectFormContextType {
  lastSuccessfulProjectCode: string | null;
  setLastSuccessfulProjectCode: (code: string | null) => void;
  resetForm: () => void;
}

const ProjectFormContext = createContext<ProjectFormContextType | undefined>(
  undefined,
);

export const ProjectFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lastSuccessfulProjectCode, setLastSuccessfulProjectCode] = useState<
    string | null
  >(null);

  const resetForm = () => {
    setLastSuccessfulProjectCode(null);
  };

  return (
    <ProjectFormContext.Provider
      value={{
        lastSuccessfulProjectCode,
        setLastSuccessfulProjectCode,
        resetForm,
      }}
    >
      {children}
    </ProjectFormContext.Provider>
  );
};

export const useProjectFormContext = () => {
  const context = useContext(ProjectFormContext);
  if (context === undefined) {
    throw new Error(
      'useProjectFormContext must be used within a ProjectFormProvider',
    );
  }
  return context;
};
