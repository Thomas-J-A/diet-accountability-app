import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import * as S from './Root.styled';
import { useContainerNode } from '../../../contexts/ContainerNodeContext';
import { AuthContextProvider } from '../../../contexts/AuthContext';

const Root = () => {
  const [, setContainerNode] = useContainerNode();

  // When node inserted into DOM tree, update context so that
  // Drawer can use node as a portal target immediately
  const updateContext = useCallback((node: HTMLDivElement | null) => {
    setContainerNode(node);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // S.Root is a portal target for Drawer component
    <S.Root ref={updateContext} rows="1fr auto">
      <AuthContextProvider>
        <Outlet />
        <Footer />
      </AuthContextProvider>
    </S.Root>
  );
};

export default Root;
