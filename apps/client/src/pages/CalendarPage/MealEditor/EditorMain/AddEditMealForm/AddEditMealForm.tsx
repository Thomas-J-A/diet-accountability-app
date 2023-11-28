/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Flex,
  Heading,
  Text,
  TextArea,
  Select,
  Slider,
  Button,
  IconButton,
  Separator,
} from '@radix-ui/themes';
import { ThickArrowLeftIcon } from '@radix-ui/react-icons';
import {
  LocationEnum,
  MealTypeEnum,
  Meal,
} from '../../../../../__generated__/graphql';
import { useDateInEditor } from '../../../../../contexts/DateInEditorContext';
import {
  CREATE_MEAL_MUTATION,
  UPDATE_MEAL_MUTATION,
} from '../../../../../operations/mutations';
import { DAY_EVENTS_QUERY } from '../../../../../operations/queries';
import adjustDateForUTC from '../../../../../utils/adjust-date-for-utc';
import FieldError from '../../../../../components/UI/FieldError/FieldError';
import {
  toastSuccess,
  toastError,
} from '../../../../../components/UI/Toast/toast';

interface AddEditMealFormProps {
  meal: Meal | undefined;
  formMode: 'ADD' | 'EDIT' | null;
  setFormMode: React.Dispatch<React.SetStateAction<'ADD' | 'EDIT' | null>>;
  activeTab: MealTypeEnum;
}

// Schema validation for add/edit meal form
const formInputSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, { message: 'Description must not be empty' })
    .max(60, {
      message: 'Description must not contain more than 60 characters',
    }),
  location: z.nativeEnum(LocationEnum),
  rating: z
    .number()
    .min(1, { message: 'Rating must be greater than or equal to 1' })
    .max(10, { message: 'Rating must be less than or equal to 10' }),
});

// Generate form input type from Zod schema
type FormInputType = z.infer<typeof formInputSchema>;

const AddEditMealForm = ({
  meal,
  formMode,
  setFormMode,
  activeTab,
}: AddEditMealFormProps) => {
  // If adding new meal, date is required by server to look up a corresponding DayEvent
  const { dateInEditor } = useDateInEditor();

  // Set up react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    control,
  } = useForm<FormInputType>({
    defaultValues: {
      description: meal ? meal.description : '',
      location: meal ? meal.location : LocationEnum.Home,
      rating: meal ? meal.rating : 6,
    },
    delayError: 150,
    resolver: zodResolver(formInputSchema),
  });

  // Handle successful or failing form submission (adding new meal)
  const [createMeal, { loading: loadingCreate }] = useMutation(
    CREATE_MEAL_MUTATION,
    {
      onCompleted: () => {
        // Remove form component and show new meal data in UI
        setFormMode(null);

        // Display success message
        toastSuccess('Meal added successfully 🎉');
      },
      onError: () => {
        // If normal use of app (no changing client code, etc), there are no expected errors
        // Display generic error message
        toastError('Meal creation not successful 😞');
      },
      // TODO: Update cache manually so that when a new DayEvent is returned
      // in payload which isn't currently in Query.dayEvents, it is appended
      // Currently, both existing and new DayEvents trigger a costly refetch
      refetchQueries: [DAY_EVENTS_QUERY],
    },
  );

  // Handle successful or failing form submission (updating existing meal)
  const [updateMeal, { loading: loadingUpdate }] = useMutation(
    UPDATE_MEAL_MUTATION,
    {
      onCompleted: () => {
        // Remove form component and show updated meal data in UI
        setFormMode(null);

        // Display success message
        toastSuccess('Meal updated successfully 🎉');
      },
      onError: () => {
        // Show generic error since none are expected
        toastError('Meal update not successful 😞');
      },
    },
  );

  // Submit handler after passing form validation
  const onSubmit: SubmitHandler<FormInputType> = async (formData) => {
    if (formMode === 'ADD') {
      // User is adding a new meal

      // Adjust date value to account for any timezone offset when apollo-link-scalars serializes value to UTC,
      // thus preventing a value representing previous/following day from being sent in request
      const adjustedDate = adjustDateForUTC(dateInEditor);

      await createMeal({
        variables: {
          mealData: {
            date: adjustedDate,
            description: formData.description,
            location: formData.location,
            rating: formData.rating,
            type: activeTab,
          },
        },
      });
    } else {
      // User is updating an existing meal
      // If existing meal is not given to component (a mistake, tampering?), do nothing
      if (!meal) {
        return;
      }

      // Find only the updated form fields
      const updatedFields = Object.keys(dirtyFields).reduce<
        Partial<FormInputType>
      >(
        (acc, currentField) => ({
          ...acc,
          [currentField]: formData[currentField as keyof FormInputType],
        }),
        {},
      );

      // Call mutate function to send query to backend
      await updateMeal({
        variables: {
          id: meal.id,
          updatedMealData: updatedFields,
        },
      });
    }
  };

  return (
    <Flex direction="column" gap="3" p="3">
      <Flex justify="between" align="center" gap="2">
        <IconButton
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap={{ initial: '2', md: '4' }}>
          <Flex direction="column" gap="2">
            <Text as="label" size={{ initial: '1', md: '2' }} weight="bold">
              Description*
              <TextArea
                {...register('description')}
                aria-invalid={errors.description ? true : false}
                variant="soft"
                placeholder="Tofu, soy sauce, and green tea"
                size={{ initial: '1', md: '2' }}
                mt={{ initial: '1', md: '2' }}
              />
            </Text>
            {errors.description && (
              <FieldError text={errors.description.message!} />
            )}
          </Flex>

          <Flex direction="column" gap="2">
            <Text as="label" size={{ initial: '1', md: '2' }} weight="bold">
              Location*
              <Controller
                name="location"
                control={control}
                render={({ field: { value, onChange, onBlur, ref } }) => (
                  <Select.Root
                    value={value}
                    onValueChange={onChange}
                    onOpenChange={onBlur}
                    size={{ initial: '1', md: '2' }}
                  >
                    <Select.Trigger
                      ref={ref}
                      aria-invalid={errors.location ? true : false}
                      variant="soft"
                      placeholder="Choose a location..."
                      mt={{ initial: '1', md: '2' }}
                      style={{ display: 'flex', width: '50%' }}
                    />
                    <Select.Content>
                      <Select.Item value="HOME">Home</Select.Item>
                      <Select.Item value="RESTAURANT">Restaurant</Select.Item>
                      <Select.Item value="WORK">Work</Select.Item>
                      <Select.Item value="OUTDOORS">Outdoors</Select.Item>
                      <Select.Item value="TRAVEL">Travel</Select.Item>
                      <Select.Item value="OTHER">Other</Select.Item>
                    </Select.Content>
                  </Select.Root>
                )}
              ></Controller>
            </Text>
            {errors.location && <FieldError text={errors.location.message!} />}
          </Flex>

          <Flex direction="column" gap="2">
            <Text as="label" size={{ initial: '1', md: '2' }} weight="bold">
              Rating*{' '}
              <Text size="1" weight="light">
                (1 = unhealthy, 10 = healthy)
              </Text>
              <Controller
                name="rating"
                control={control}
                render={({ field: { value, onChange, onBlur, ref } }) => (
                  <Slider
                    value={[value]}
                    onValueChange={(newValue) => {
                      // react-hook-form (via Zod schema) is expecting type number
                      // Slider API passes number[], so pass first value
                      // #thankyoutypescript
                      onChange(newValue[0]);
                    }}
                    onValueCommit={onBlur}
                    ref={ref}
                    aria-invalid={errors.rating ? true : false}
                    variant="soft"
                    mt={{ initial: '1', md: '2' }}
                    min={1}
                    max={10}
                  />
                )}
              />
            </Text>
            {errors.rating && <FieldError text={errors.rating.message!} />}
          </Flex>

          <Button
            type="submit"
            style={{ width: '100%' }}
            disabled={loadingCreate || loadingUpdate || !isDirty}
          >
            {loadingCreate || loadingUpdate ? 'Saving...' : 'Save'}
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default AddEditMealForm;
