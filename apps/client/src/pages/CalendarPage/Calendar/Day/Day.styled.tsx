import styled, { css } from 'styled-components';
import { Flex } from '@radix-ui/themes';

export const Day = styled(Flex)<{
  $gridColumn?: number;
  $isToday?: boolean;
  $isFuture?: boolean;
  $averageRating?: number;
}>`
  cursor: pointer;
  background: var(--gray-12);
  outline: 1px solid var(--gray-1);
  box-shadow: var(--shadow-1);

  /* First day of month must be placed in correct column representing weekday */
  ${(props) => props.$gridColumn && `grid-column: ${props.$gridColumn};`}

  /* Grid cell representing today should be distinct from surrounding days */
  ${(props) => props.$isToday && 'box-shadow: none;'}

  /* Future dates should be styled differently to show that user cannot interact with them */
  ${(props) => props.$isFuture && 'cursor: initial; background: var(--gray-11)'}

  /* Allows user to see at a glance how healthily they've been eating on any given day */
  ${(props) =>
    props.$averageRating &&
    css`
      background-image: linear-gradient(
        to right,
        green 0%,
        green ${props.$averageRating * 10}%,
        white ${props.$averageRating * 13}%,
        white 100%
      );
    `}
`;
