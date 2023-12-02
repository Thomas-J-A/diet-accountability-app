import { Flex, Heading } from '@radix-ui/themes';
import { ReactNode } from 'react';

interface ChartWrapperProps {
  heading: string;
  children: ReactNode;
}

const ChartWrapper = ({ heading, children }: ChartWrapperProps) => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gap="3"
      style={{
        border: '1px solid var(--gray-a6)',
        borderRadius: 'var(--radius-2)',
      }}
      p="2"
    >
      <Heading as="h2" size="5">
        {heading}
      </Heading>
      {children}
    </Flex>
  );
};

export default ChartWrapper;
