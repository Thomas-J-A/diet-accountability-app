import { useState } from 'react';
import { Hourglass } from 'react-loader-spinner';
import { useQuery } from '@apollo/client';
import { Grid, Flex, Box, Container, Text } from '@radix-ui/themes';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import MealEditor from './MealEditor/MealEditor';
import Calendar from './Calendar/Calendar';
import { DateInEditorContextProvider } from '../../contexts/DateInEditorContext';
import useMediaQuery from '../../hooks/useMediaQuery';
import { DAY_EVENTS_QUERY } from '../../operations/queries';
import getTwelveMonthsEarlier from '../../utils/get-twelve-months-earlier';
import { DayEvent } from '../../__generated__/graphql';

const CalendarPage = () => {
  const [today] = useState(new Date());
  const [startDate] = useState(getTwelveMonthsEarlier(today));
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Fetch dayEvent data for previous twelve months
  const { loading, error, data } = useQuery(DAY_EVENTS_QUERY, {
    variables: {
      dateRange: { endDate: today, startDate },
    },
  });

  // Display helpful loading and error states in UI
  if (loading || error) {
    return (
      <Flex p="3" asChild justify="center" align="center">
        <main>
          <Flex direction="column" gap="4" align="center">
            {loading ? (
              <>
                <Hourglass
                  visible={true}
                  height="70"
                  width="70"
                  ariaLabel="hourglass-loading"
                  colors={['#67ffded2', '#eeeeee']}
                />
                <Text size={{ initial: '4', md: '6' }}>
                  Hold on one second...
                </Text>
              </>
            ) : (
              <>
                <ExclamationTriangleIcon height="70" width="70" />
                <Text size={{ initial: '4', md: '6' }}>
                  Internal server error
                </Text>
              </>
            )}
          </Flex>
        </main>
      </Flex>
    );
  }

  // After previous checks data should not be undefined
  const dayEvents = data?.dayEvents as DayEvent[];

  return (
    <DateInEditorContextProvider>
      <Box p={{ initial: '3', md: '6' }} asChild>
        <main>
          <Container size={{ initial: '1', md: '3' }}>
            <Grid gap={{ initial: '3', md: '6' }} columns={{ md: '5fr 4fr' }}>
              {!isDesktop && (
                <Box height="9" style={{ background: 'red' }}>
                  Ads
                </Box>
              )}
              <Calendar
                today={today}
                startDate={startDate}
                dayEvents={dayEvents}
              />
              <Flex direction="column" gap={{ initial: '3', md: '6' }}>
                {isDesktop && (
                  <Box height="9" style={{ background: 'red' }}>
                    Ads
                  </Box>
                )}
                <MealEditor dayEvents={dayEvents} />
              </Flex>
            </Grid>
          </Container>
        </main>
      </Box>
    </DateInEditorContextProvider>
  );
};

export default CalendarPage;
