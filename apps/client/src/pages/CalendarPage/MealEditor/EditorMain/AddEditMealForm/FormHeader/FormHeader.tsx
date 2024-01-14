import { Flex, Heading, Text, IconButton, Separator } from '@radix-ui/themes';
import { ThickArrowLeftIcon } from '@radix-ui/react-icons';
import { MealTypeEnum } from '../../../../../../__generated__/graphql';

interface FormHeaderProps {
  setFormMode: React.Dispatch<React.SetStateAction<'ADD' | 'EDIT' | null>>;
  activeTab: MealTypeEnum;
}

const FormHeader = ({ setFormMode, activeTab }: FormHeaderProps) => (
  <>
    <Flex justify="between" align="center" gap="2">
      <IconButton
        aria-label="Go back"
        onClick={() => {
          setFormMode(null);
        }}
      >
        <ThickArrowLeftIcon height="20" width="20" />
      </IconButton>
      <Heading size="5" align="center" style={{ flexGrow: '1' }}>
        Record your {activeTab.toLowerCase()}
      </Heading>
    </Flex>

    <Separator size="4" />

    <Text size={{ initial: '1', md: '2' }} weight="light">
      All fields marked with an asterisk (*) are required.
    </Text>
  </>
);

export default FormHeader;
