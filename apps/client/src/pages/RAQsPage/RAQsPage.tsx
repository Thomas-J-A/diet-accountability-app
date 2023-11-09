import { Box, Text } from '@radix-ui/themes';
import * as S from './RAQsPage.styled';

const RAQsPage = () => {
  return (
    <Box p="3" asChild>
      <S.RAQsPage>
        <Text>RAQs Stuff</Text>
      </S.RAQsPage>
    </Box>
  );
};

export default RAQsPage;
