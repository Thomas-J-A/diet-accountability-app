import { Flex, Text } from '@radix-ui/themes';
import { isSameDay } from 'date-fns';
import { DayEvent } from '../../../__generated__/graphql';
import { useDateInEditor } from '../../../contexts/DateInEditorContext';
import EditorHeader from './EditorHeader/EditorHeader';
import EditorMain from './EditorMain/EditorMain';

interface MealEditorProps {
  dayEvents: DayEvent[];
}

const MealEditor = ({ dayEvents }: MealEditorProps) => {
  const { dateInEditor } = useDateInEditor();

  // Find dayEvent for currently displayed date, if it exists
  const currentDayEvent = dayEvents.find((de) =>
    isSameDay(de.date, dateInEditor),
  );

  return (
    <Flex
      direction="column"
      gap="2"
      p="3"
      style={{ border: '1px solid var(--gray-a6)' }}
    >
      <EditorHeader />
      <EditorMain currentDayEvent={currentDayEvent} />
      <Flex
        p="3"
        justify="center"
        align="center"
        style={{ border: '1px solid var(--gray-a6' }}
      >
        <Text size="1">HealthyHabits&trade; stickers, coming soon! 🎉</Text>
      </Flex>
    </Flex>
  );
};

export default MealEditor;
