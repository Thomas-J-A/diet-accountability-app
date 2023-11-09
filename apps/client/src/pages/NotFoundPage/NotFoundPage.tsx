import { useLocation } from 'react-router-dom';
import { Flex, Heading, Text } from '@radix-ui/themes';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { useAuthContext } from '../../contexts/AuthContext';
import * as S from './NotFoundPage.styled';

const NotFoundPage = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();

  const authLinks = (
    <Flex direction="column">
      <Text>Here are some helpful links:</Text>
      <S.StyledLink to="/calendar">
        <Text size="2">Calendar</Text>
      </S.StyledLink>
      <S.StyledLink to="/statistics">
        <Text size="2">Statistics</Text>
      </S.StyledLink>
      <S.StyledLink to="/raqs">
        <Text size="2">Rarely Asked Questions</Text>
      </S.StyledLink>
    </Flex>
  );
  const unauthedLinks = (
    <Text>
      Please <S.StyledLink to="/">sign in</S.StyledLink> to access more features
    </Text>
  );

  // Format pathname by removing leading slash
  const formattedPathname = location.pathname.substring(1);

  return (
    <Flex direction="column" justify="center" align="center" gap="6" p="3">
      <Flex direction="column" align="center" gap="2">
        <QuestionMarkCircledIcon height="70" width="70" />
        <Heading>Oops! You seem to be lost.</Heading>
        <Heading
          as="h2"
          size="3"
        >{`The path '${formattedPathname}' does not exist`}</Heading>
      </Flex>
      {isAuthenticated ? authLinks : unauthedLinks}
    </Flex>
  );
};

export default NotFoundPage;
