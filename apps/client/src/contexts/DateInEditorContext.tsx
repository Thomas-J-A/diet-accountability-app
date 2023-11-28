import { useState, useContext, createContext, ReactNode } from 'react';

interface DateInEditorContextType {
  dateInEditor: Date;
  setDateInEditor: React.Dispatch<React.SetStateAction<Date>>;
}

// Initial value
// Set Date to midnight local time for consistency with app's other Date values
const today = new Date();
today.setHours(0, 0, 0, 0);

const initialValue: DateInEditorContextType = {
  dateInEditor: today,
  setDateInEditor: () => '', // Placeholder for setter function
};

const DateInEditorContext =
  createContext<DateInEditorContextType>(initialValue);

export const DateInEditorContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [dateInEditor, setDateInEditor] = useState<Date>(
    initialValue.dateInEditor,
  );

  return (
    <DateInEditorContext.Provider value={{ dateInEditor, setDateInEditor }}>
      {children}
    </DateInEditorContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDateInEditor = () => {
  return useContext(DateInEditorContext);
};
