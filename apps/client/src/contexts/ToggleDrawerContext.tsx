import { useState, useContext, createContext } from 'react';

type ToggleDrawerContextType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
];

const ToggleDrawerContext = createContext<ToggleDrawerContextType | null>(null);

export const ToggleDrawerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ToggleDrawerContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </ToggleDrawerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToggleDrawer = () => {
  const toggleDrawerTuple = useContext(ToggleDrawerContext);

  if (!toggleDrawerTuple) {
    throw new Error('There must be a provider for this context');
  }

  return toggleDrawerTuple;
};
