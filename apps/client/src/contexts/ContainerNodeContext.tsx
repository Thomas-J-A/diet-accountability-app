import { useState, useContext, createContext, ReactNode } from 'react';

type ContainerNodeContextType = [
  HTMLDivElement | null,
  React.Dispatch<React.SetStateAction<HTMLDivElement | null>>,
];

const ContainerNodeContext = createContext<ContainerNodeContextType | null>(
  null,
);

export const ContainerNodeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(
    null,
  );

  return (
    <ContainerNodeContext.Provider value={[containerNode, setContainerNode]}>
      {children}
    </ContainerNodeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useContainerNode = () => {
  const containerNodeTuple = useContext(ContainerNodeContext);

  if (!containerNodeTuple) {
    throw new Error('There must be a provider for this context');
  }

  return containerNodeTuple;
};
