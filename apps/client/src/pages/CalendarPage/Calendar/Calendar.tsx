import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Flex, Box, Text, ScrollArea } from '@radix-ui/themes';
import { DayEvent } from '../../../__generated__/graphql';
import Month from './Month/Month';
import ScrollToTodayButton from './ScrollToTodayButton/ScrollToTodayButton';
import { DAY_EVENTS_QUERY } from '../../../operations/queries';

const getTwelveMonthsEarlier = (date: Date): Date => {
  // Make a copy to avoid modifying original date
  const copiedDate = new Date(date);

  // Subtract 12 months from the copied date
  // setMonth implementation handles changing the year accordingly
  copiedDate.setMonth(copiedDate.getMonth() - 12);

  // Set the day to 1 to get the first day of the month
  copiedDate.setDate(1);

  return copiedDate;
};

const WeekdayHeader = () => {
  return (
    <Grid
      columns="repeat(7, 1fr)"
      p="1"
      style={{
        borderBottom: '1px solid var(--gray-a6)',
      }}
    >
      <Text align="center">Mon</Text>
      <Text align="center">Tue</Text>
      <Text align="center">Wed</Text>
      <Text align="center">Thu</Text>
      <Text align="center">Fri</Text>
      <Text align="center">Sat</Text>
      <Text align="center">Sun</Text>
    </Grid>
  );
};

const Calendar = () => {
  const [today] = useState(new Date());
  const [startDate] = useState(getTwelveMonthsEarlier(today));

  // Used to scroll to current month on load and button click
  const currentMonthRef = useRef<HTMLDivElement>(null);

  // Fetch dayEvent data for previous twelve months
  const { loading, error, data } = useQuery(DAY_EVENTS_QUERY, {
    variables: {
      dateRange: { endDate: today, startDate },
    },
  });

  // Scroll calendar down to current month after initial data loads
  useEffect(() => {
    if (!loading && currentMonthRef.current) {
      currentMonthRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [loading]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error!</Text>;
  }

  // After previous checks data should not be undefined
  const dayEvents = data?.dayEvents as DayEvent[];

  // Number of months displayed in UI
  const monthsInCalendar = 19;

  // Array to store data for each month in UI
  const calendarMonths = [];

  // Loop to generate month data
  for (let i = 0; i < monthsInCalendar; i++) {
    // Date representing the earliest month loaded in calendar
    const currentDate = new Date(startDate);
    currentDate.setMonth(startDate.getMonth() + i);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Filter all initial dayEvents to find only those relevant to currentDate's month
    const filteredEvents = dayEvents.filter(
      (de) => de.date.getFullYear() === year && de.date.getMonth() === month,
    );

    // Helper for when I attach ref to implement scroll-to-today FAB
    const isCurrentMonth =
      today.getMonth() === month && today.getFullYear() === year;

    calendarMonths.push({
      year,
      month,
      dayEvents: filteredEvents,
      isCurrentMonth,
    });
  }

  // Generate an array of month components
  const months = calendarMonths.map((cm) => {
    return cm.isCurrentMonth ? (
      <Month key={`${cm.year}-${cm.month}`} ref={currentMonthRef} {...cm} />
    ) : (
      <Month key={`${cm.year}-${cm.month}`} {...cm} />
    );
  });

  return (
    <Box position="relative" style={{ border: '1px solid var(--gray-a6)' }}>
      <WeekdayHeader />
      <ScrollArea scrollbars="vertical" style={{ height: '400px' }}>
        <Box>
          <Flex p="2">
            <Text size="2">Who even cares what you ate here? 🤷‍♂️</Text>
          </Flex>
          {months}
          <Flex p="2">
            <Text size="2">End of the road, Eager McBeaver.</Text>
          </Flex>
        </Box>
      </ScrollArea>
      <ScrollToTodayButton ref={currentMonthRef} />
    </Box>
  );
};

export default Calendar;
