import { forwardRef } from 'react';
import { Grid, Box } from '@radix-ui/themes';
import { DayEvent } from '../../../../__generated__/graphql';
import Day from '../Day/Day';
import MonthHeader from './MonthHeader/MonthHeader';

interface MonthProps {
  year: number;
  month: number;
  dayEvents: DayEvent[];
  isCurrentMonth: boolean;
}

const Month = forwardRef<HTMLDivElement, MonthProps>(
  ({ year, month, dayEvents }, ref) => {
    // Calculate total number of days in target month
    // dynamically because of leap years, etc
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Array to store data for each day
    const monthDays = [];

    // Loop to generate day data
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvent = dayEvents.find((de) => de.date.getDate() === day);

      monthDays.push({ day, date, dayEvent });
    }

    return (
      // Only current month will receive a ref
      <Box ref={ref ? ref : null}>
        <MonthHeader year={year} month={month} />
        <Grid
          columns="7"
          p="1"
          style={{ gap: '1px', background: 'var(--accent-a11)' }}
        >
          {monthDays.map(({ day, date, dayEvent }) => (
            <Day key={day} day={day} date={date} dayEvent={dayEvent} />
          ))}
        </Grid>
      </Box>
    );
  },
);

Month.displayName = 'Month';

export default Month;
