import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Footer from '../Footer/Footer';
import * as S from './Root.styled';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useContainerNode } from '../../../contexts/ContainerNodeContext';
import createApolloClient from '../../../utils/create-apollo-client';

const Root = () => {
  const { logOut } = useAuthContext();
  const [, setContainerNode] = useContainerNode();

  // Create client with all Apollo Links and settings configured
  const client = createApolloClient(logOut);

  // When node inserted into DOM tree, update context so that
  // Drawer can use node as a portal target immediately
  const updateContext = useCallback((node: HTMLDivElement | null) => {
    setContainerNode(node);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // S.Root is a portal target for Drawer component
  return (
    <ApolloProvider client={client}>
      <S.Root ref={updateContext} rows="1fr auto">
        <Outlet />
        <Footer />
      </S.Root>
    </ApolloProvider>
  );
};

export default Root;
