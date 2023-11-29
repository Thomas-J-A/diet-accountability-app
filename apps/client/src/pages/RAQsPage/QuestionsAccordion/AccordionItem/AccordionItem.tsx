import { ReactNode } from 'react';
import { Text } from '@radix-ui/themes';
import * as S from './AccordionItem.styled';

interface AccordionItemProps {
  value: string;
  triggerText: string;
  children: ReactNode;
}

const AccordionItem = ({
  value,
  triggerText,
  children,
}: AccordionItemProps) => {
  return (
    <S.StyledItem value={value}>
      <S.StyledHeader>
        <S.StyledTrigger>
          <Text size="3" weight="bold">
            {triggerText}
          </Text>
          <S.StyledChevron />
        </S.StyledTrigger>
      </S.StyledHeader>
      <S.StyledContent>{children}</S.StyledContent>
    </S.StyledItem>
  );
};

export default AccordionItem;
