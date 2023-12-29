// TODO: Download photos from S3 via presigned URLs fetched from Apollo Server backend
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
  // Date object representing current day in UI
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
      style={{
        border: '1px solid var(--gray-a6)',
        borderRadius: 'var(--radius-2)',
      }}
    >
      <EditorHeader />
      <EditorMain currentDayEvent={currentDayEvent} />
      <Flex
        p="3"
        justify="center"
        align="center"
        style={{
          border: '1px solid var(--gray-a6',
          borderRadius: 'var(--radius-2)',
        }}
      >
        <Text size="1">HealthyHabits&trade; stickers, coming soon! 🎉</Text>
      </Flex>
    </Flex>
  );
};

export default MealEditor;

// Implementation for debounced queries to backend to fetch presigned URLs

// import { useState, useEffect, useCallback } from 'react';
// import { useLazyQuery } from '@apollo/client';
// import { useDebouncedCallback } from 'use-debounce';
// import { PRESIGNED_URLS_GET_QUERY } from '../../../operations/queries';
// import { toastError } from '../../../components/UI/Toast/toast';

// Extract all photo keys for any one particular day
// const extractKeys = (meals: Meal[]) => meals.flatMap((meal) => meal.photoKeys);

// List of presigned GET URLs used to download meal photos
// const [getUrlsList, setGetUrlsList] = useState<PresignedGet[]>([]);

// Fetch presigned GET URLs from Apollo Server backend
// URLs should not be cached because they have a short expiry and are intended for immediate use
// const [fetchGetUrls] = useLazyQuery(PRESIGNED_URLS_GET_QUERY, {
//   fetchPolicy: 'no-cache',
// });

// Query Apollo Server to exchange S3 keys for presigned GET URLs
// const fetchUrls = useCallback(async () => {
//   // Ensure there is data for current day
//   if (currentDayEvent) {
//     try {
//       // Extract all S3 keys relating to photos for meals on current day
//       const keys = extractKeys(currentDayEvent.meals);

//       // Ensure there is at least one photo taken on current day (photos are optional)
//       if (keys.length) {
//         // Fetch presigned URLs from backend
//         const { data, error } = await fetchGetUrls({ variables: { keys } });

//         // Ensure there were no errors
//         if (error ?? !data) {
//           throw new Error('Error fetching GET URLs');
//         }

//         // Update local state so child components can receive URLs as props and render images
//         setGetUrlsList(data.presignedUrlsGet);
//       }
//     } catch (err) {
//       console.error('Failed to fetch initial presigned URLs');
//       toastError('Unable to load meal photos 😞');
//     }
//   }
// }, [currentDayEvent, fetchGetUrls]);

// Debounce API request for presigned URLs so that if a user clicks on previous/next day buttons (or
// day in calendar UI) multiple times in succession, request is only fired after user stops clicking
// const debouncedFetchUrls = useDebouncedCallback(fetchUrls, 2000);

// Make debounced request on mount and whenever date in UI changes
// useEffect(() => {
//   // Promise is handled within function body, hence "void" keyword to satisfy linter
//   void debouncedFetchUrls();

//   // Cancel any pending debounced callback on unmount
//   return () => {
//     debouncedFetchUrls.cancel();
//   };

//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [dateInEditor, debouncedFetchUrls]);
