import { Box, Text } from '@radix-ui/themes';
import * as S from './StatisticsPage.styled';

const StatisticsPage = () => {
  return (
    <Box p="3" asChild>
      <S.StatisticsPage>
        <Text>Statistics Stuff</Text>
      </S.StatisticsPage>
    </Box>
  );
};

export default StatisticsPage;
