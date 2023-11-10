import { Callout } from '@radix-ui/themes';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface FieldErrorProps {
  text: string;
}

const FieldError = ({ text }: FieldErrorProps) => {
  return (
    <Callout.Root size="1" color="red" role="alert" highContrast variant="soft">
      <Callout.Icon>
        <ExclamationTriangleIcon height="14" width="14" />
      </Callout.Icon>
      <Callout.Text ml="1" size="1">
        {text}
      </Callout.Text>
    </Callout.Root>
  );
};

export default FieldError;
