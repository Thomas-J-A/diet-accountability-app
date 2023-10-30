import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@radix-ui/themes';
import { HamburgerMenuIcon, PersonIcon } from '@radix-ui/react-icons';
import * as S from './DrawerToggleButton.styled';

const DrawerToggleButton = ({ isAuthed }: { isAuthed: boolean }) => {
  if (isAuthed) {
    return (
      <Dialog.Trigger asChild>
        <S.HamburgerButton size="1" variant="ghost">
          <HamburgerMenuIcon height="30" width="30" />
        </S.HamburgerButton>
      </Dialog.Trigger>
    );
  }

  return (
    <Dialog.Trigger asChild>
      <Button>
        <PersonIcon /> Sign In
      </Button>
    </Dialog.Trigger>
  );
};

export default DrawerToggleButton;

// TODO: Remove the following
// Kept as implementation example for when you need to use asChild on a custom component
// (not Radix Theme components which already accept all correct props and ref)

// import { forwardRef, ComponentPropsWithRef } from 'react';
// import { IconButton, Button } from '@radix-ui/themes';
// import { HamburgerMenuIcon, PersonIcon } from '@radix-ui/react-icons';

// interface IDrawerToggleButton extends ComponentPropsWithRef<typeof Button> {
//   isAuthed: boolean;
// }

// // This component is rendered as a result of a polymorphic Radix
// // Primitive, so ref is forwarded and props are spread
// const DrawerToggleButton = forwardRef<HTMLButtonElement, IDrawerToggleButton>(
//   ({ isAuthed, ...rest }, ref) => {
//     if (isAuthed) {
//       return (
//         <IconButton {...rest} ref={ref} size="1" variant="ghost">
//           <HamburgerMenuIcon height="30" width="30" />
//         </IconButton>
//       );
//     }

//     return (
//       <Button {...rest} ref={ref}>
//         <PersonIcon /> Sign In
//       </Button>
//     );
//   },
// );

// // forwardRef call causes ESLint error because main component is wrapped inside function
// DrawerToggleButton.displayName = 'DrawerToggleButton';

// export default DrawerToggleButton;
