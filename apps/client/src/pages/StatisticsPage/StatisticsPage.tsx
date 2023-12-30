import { useState, useRef } from 'react';
import { Hourglass } from 'react-loader-spinner';
import { useQuery } from '@apollo/client';
import {
  Grid,
  Flex,
  Box,
  Container,
  Heading,
  Text,
  Em,
  Separator,
} from '@radix-ui/themes';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { sub } from 'date-fns';
import { DAY_EVENTS_QUERY } from '../../operations/queries';
import { DayEvent } from '../../__generated__/graphql';
import Charts from './Charts/Charts';
import TimeframeSwitcher from './TimeframeSwitcher/TimeframeSwitcher';
import MealsRecorded from './MealsRecorded/MealsRecorded';
import AdsCarousel from '../../components/UI/AdsCarousel/AdsCarousel';

const StatisticsPage = () => {
  const [timeframe, setTimeframe] = useState<7 | 30>(7);
  const todayRef = useRef<Date>(new Date());

  // Calculate first day of requested data
  const startDate =
    timeframe === 7
      ? sub(todayRef.current, { days: 7 })
      : sub(todayRef.current, { days: 30 });

  // Current day is excluded from chart data because it's incomplete
  const endDate = sub(todayRef.current, { days: 1 });

  // Fetch all day events for last 7 or 30 days, if any exist
  const { loading, error, data } = useQuery(DAY_EVENTS_QUERY, {
    variables: {
      dateRange: { endDate, startDate },
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
                  Loading some sick charts...
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
    <Box p={{ initial: '3', md: '6' }} asChild>
      <main>
        <Container size={{ initial: '1', md: '3' }}>
          <Grid gap={{ initial: '3', md: '6' }} columns={{ md: '5fr 4fr' }}>
            <Flex direction="column" gap="3" style={{ overflow: 'hidden' }}>
              <Heading size={{ initial: '7', md: '8' }}>
                Tuck into some pie (<Em>charts</Em>)
              </Heading>

              <Text size={{ initial: '2', md: '3' }}>
                Some visual data for the curious. No pie charts, funnily enough.
              </Text>

              <Separator size="3" />

              <AdsCarousel />

              <TimeframeSwitcher
                timeframe={timeframe}
                setTimeframe={setTimeframe}
              />

              <MealsRecorded dayEvents={dayEvents} timeframe={timeframe} />
            </Flex>

            <Charts
              data={dayEvents}
              timeframe={timeframe}
              startDate={startDate}
            />
          </Grid>
        </Container>
      </main>
    </Box>
  );
};

export default StatisticsPage;
