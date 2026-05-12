import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCareerField, setSelectedCareerField] = useState('');

  return (
    <AppContext.Provider value={{ selectedRegion, setSelectedRegion, selectedCareerField, setSelectedCareerField }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
