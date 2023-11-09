import { Box, Text } from '@radix-ui/themes';
import * as S from './CalendarPage.styled';

const CalendarPage = () => {
  return (
    <Box p="3" asChild>
      <S.CalendarPage>
        <Text>Calendar Stuff</Text>
      </S.CalendarPage>
    </Box>
  );
};

export default CalendarPage;
