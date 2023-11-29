import {
  Container,
  Grid,
  Flex,
  Box,
  Heading,
  Text,
  Em,
  Separator,
} from '@radix-ui/themes';
import QuestionsAccordion from './QuestionsAccordion/QuestionsAccordion';

const RAQsPage = () => {
  return (
    <Box p={{ initial: '3', md: '6' }} asChild>
      <main>
        <Container size={{ initial: '1', md: '3' }}>
          <Grid gap="3" columns={{ md: '5fr 4fr' }}>
            <Flex direction="column" gap={{ initial: '2', md: '3' }}>
              <Heading size={{ initial: '7', md: '8' }}>
                Rarely Asked Questions
              </Heading>
              <Text size={{ initial: '2', md: '3' }}>
                Welcome to our RAQs section. Nobody asked,{' '}
                <Em>but here are the answers anyway.</Em>
              </Text>
              <Separator size="3" />
            </Flex>

            <Box height="9" style={{ background: 'red' }}>
              Ads
            </Box>

            <QuestionsAccordion />
          </Grid>
        </Container>
      </main>
    </Box>
  );
};

export default RAQsPage;
