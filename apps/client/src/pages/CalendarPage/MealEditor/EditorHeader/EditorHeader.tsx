import { Flex, IconButton, Heading, Text } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import {
  format,
  isBefore,
  isToday,
  isYesterday,
  isTomorrow,
  isAfter,
  subDays,
  addDays,
} from 'date-fns';
import { useDateInEditor } from '../../../../contexts/DateInEditorContext';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import getTwelveMonthsEarlier from '../../../../utils/get-twelve-months-earlier';

const EditorHeader = () => {
  const { dateInEditor, setDateInEditor } = useDateInEditor();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Dynamic text to be shown above current date in UI
  const relativeDateText = isToday(dateInEditor)
    ? 'Today'
    : isYesterday(dateInEditor)
    ? 'Yesterday'
    : isTomorrow(dateInEditor)
    ? 'Tomorrow'
    : null;

  // Format longer date for desktop screens, shorter for mobile
  const formattedDate = isDesktop
    ? format(dateInEditor, 'EEEE do LLLL')
    : format(dateInEditor, 'EEE do LLL');

  // Calculate various values for previous/following day buttons
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const previousDay = subDays(dateInEditor, 1);
  const isPreviousDayBeforeEarliestDate = isBefore(
    previousDay,
    getTwelveMonthsEarlier(today), // 12 months from today, i.e. beginning of calendar in UI
  );

  const followingDay = addDays(dateInEditor, 1);
  const isFollowingDayFuture = isAfter(followingDay, today);

  return (
    <Flex
      align="center"
      p="3"
      style={{
        border: '1px solid var(--gray-a6',
        borderRadius: 'var(--radius-2)',
      }}
    >
      <IconButton
        style={{ cursor: 'pointer' }}
        disabled={isPreviousDayBeforeEarliestDate}
        onClick={() => {
          setDateInEditor(previousDay);
        }}
      >
        <ChevronLeftIcon height="30" width="30" />
      </IconButton>
      <Flex direction="column" grow="1" align="center">
        <Text size="1">{relativeDateText}</Text>
        <Heading size="4" weight="light">
          {formattedDate}
        </Heading>
      </Flex>
      <IconButton
        style={{ cursor: 'pointer' }}
        disabled={isFollowingDayFuture}
        onClick={() => {
          setDateInEditor(followingDay);
        }}
      >
        <ChevronRightIcon height="30" width="30" />
      </IconButton>
    </Flex>
  );
};

export default EditorHeader;
