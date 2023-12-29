// TODO: Refactor to use Context to avoid passing so many props
// Currently it's okay because it's only one or two levels deep and the component is pretty simple
import { useState } from 'react';
import { Box } from '@radix-ui/themes';
import { DayEvent, MealTypeEnum } from '../../../../__generated__/graphql';
import AddEditMealForm from './AddEditMealForm/AddEditMealForm';
import MealsDisplay from './MealsDisplay/MealsDisplay';

interface MainEditorProps {
  currentDayEvent: DayEvent | undefined;
}

const EditorMain = ({ currentDayEvent }: MainEditorProps) => {
  // Sets the form mode; add a new meal, or edit an existing one
  const [formMode, setFormMode] = useState<'ADD' | 'EDIT' | null>(null);

  // Sets the active tab; breakfast, lunch, or dinner
  const [activeTab, setActiveTab] = useState(MealTypeEnum.Breakfast);

  return (
    <Box
      style={{
        border: '1px solid var(--gray-a6',
        borderRadius: 'var(--radius-2)',
      }}
    >
      {formMode ? (
        <AddEditMealForm
          meal={currentDayEvent?.meals.find((m) => m.type === activeTab)}
          formMode={formMode}
          setFormMode={setFormMode}
          activeTab={activeTab}
        />
      ) : (
        <MealsDisplay
          currentDayEvent={currentDayEvent}
          setFormMode={setFormMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </Box>
  );
};

export default EditorMain;
