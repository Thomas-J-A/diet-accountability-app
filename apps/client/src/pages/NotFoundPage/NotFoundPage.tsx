import { useLocation, Link } from 'react-router-dom';
import { Flex, Heading, Text } from '@radix-ui/themes';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { useAuthContext } from '../../contexts/AuthContext';

const NotFoundPage = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();

  const authLinks = (
    <Flex direction="column" gap={{ md: '2' }}>
      <Text>Here are some helpful links:</Text>
      <Link to="/calendar">
        <Text size={{ initial: '2', md: '3' }}>Calendar</Text>
      </Link>
      <Link to="/statistics">
        <Text size={{ initial: '2', md: '3' }}>Statistics</Text>
      </Link>
      <Link to="/raqs">
        <Text size={{ initial: '2', md: '3' }}>Rarely Asked Questions</Text>
      </Link>
    </Flex>
  );
  const unauthedLinks = (
    <Text size={{ initial: '2', md: '3' }}>
      Please <Link to="/">sign in</Link> to access more features
    </Text>
  );

  // Format pathname by removing leading slash
  const formattedPathname = location.pathname.substring(1);

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gap="5"
      p="3"
      asChild
    >
      <main>
        <Flex direction="column" align="center" gap="2">
          <QuestionMarkCircledIcon height="70" width="70" />
          <Heading size={{ initial: '6', md: '8' }}>
            Oops! You seem to be lost.
          </Heading>
          <Heading
            as="h2"
            size={{ initial: '3', md: '5' }}
          >{`The path '${formattedPathname}' does not exist`}</Heading>
        </Flex>
        {isAuthenticated ? authLinks : unauthedLinks}
      </main>
    </Flex>
  );
};

export default NotFoundPage;
