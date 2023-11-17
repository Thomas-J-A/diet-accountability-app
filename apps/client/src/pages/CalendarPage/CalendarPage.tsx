import { Box, Container, Text } from '@radix-ui/themes';
import Calendar from './Calendar/Calendar';

const CalendarPage = () => {
  return (
    <Box p="3" asChild>
      <main>
        <Container size="1">
          <Calendar />
          <Text>Ads here</Text>
        </Container>
      </main>
    </Box>
  );
};

export default CalendarPage;
