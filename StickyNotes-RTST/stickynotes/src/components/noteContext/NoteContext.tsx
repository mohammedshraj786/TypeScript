import React, { createContext, useContext, useState } from 'react';

type NoteContextType = {
  showAddNoteButton: boolean;
  setShowAddNoteButton: (show: boolean) => void;
};

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider: React.FC<any> = ({ children }) => {
  const [showAddNoteButton, setShowAddNoteButton] = useState(true);

  return (
    <NoteContext.Provider value={{ showAddNoteButton, setShowAddNoteButton }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNoteContext must be used within a NoteProvider');
  }
  return context;
};
