/* eslint-disable @typescript-eslint/no-non-null-assertion */
// TODO: Extract form inputs into reusable FormGroup component with label and errors
// TODO: Add file upload capability (commented out due to failing implementation elsewhere)
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Flex,
  Text,
  TextArea,
  Select,
  Slider,
  Button,
  Em,
} from '@radix-ui/themes';
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
import FormHeader from './FormHeader/FormHeader';

interface AddEditMealFormProps {
  meal: Meal | undefined;
  formMode: 'ADD' | 'EDIT' | null;
  setFormMode: React.Dispatch<React.SetStateAction<'ADD' | 'EDIT' | null>>;
  activeTab: MealTypeEnum;
}

// Maximum size of image upload
// const MAX_FILE_SIZE_MB = 10485760; // 10MB

// List of accepted image MIME types
// const VALID_MIME_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

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
  // photos: z
  //   .any()
  //   .refine((files: FileList) => files.length <= 2, {
  //     message: 'Maximum of two photos',
  //   })
  //   .refine(
  //     (files: FileList) =>
  //       Array.from(files).every((file) => file.size < MAX_FILE_SIZE_MB),
  //     { message: 'Photos must be less than 10MB' },
  //   )
  //   .refine(
  //     (files: FileList) =>
  //       Array.from(files).every((file) => VALID_MIME_TYPES.includes(file.type)),
  //     { message: 'Photos must be a .jpg, .jpeg, .png, or .webp file' },
  //   )
  //   .optional(),
});

// Generate form input type from Zod schema
export type FormInputType = z.infer<typeof formInputSchema>;

// When in edit mode photos cannot be updated, so remove from type
// type FormInputWithoutPhotos = Omit<FormInputType, 'photos'>;

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
    formState: { errors, isDirty, dirtyFields, isSubmitting },
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

  // Handle success/failure upon adding new meal
  const [createMeal] = useMutation(CREATE_MEAL_MUTATION, {
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
  });

  // Handle success/failure upon updating existing meal
  const [updateMeal] = useMutation(UPDATE_MEAL_MUTATION, {
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
  });

  // Fetch presigned POST URLs from Apollo Server backend
  // const [fetchPostUrls] = useLazyQuery(PRESIGNED_URLS_POST_QUERY);

  // Uploads selected photos to S3 via presigned POST URLs
  // const uploadPhotosToS3 = async (files: FileList): Promise<string[]> => {
  //   // Create an actual array from FileList type
  //   const photos = Array.from(files);

  //   // Ensure the caller has provided at least one file
  //   if (!photos.length) {
  //     throw new Error('You must provide a file to upload');
  //   }

  //   // Collect necessary data from each selected file
  //   const fileData = photos.map((photo) => ({
  //     filename: photo.name,
  //     contentType: photo.type,
  //   }));

  //   try {
  //     // Perform Apollo Client query operation to fetch presigned POST URLs and related data
  //     const { data, error } = await fetchPostUrls({ variables: { fileData } });

  //     // Ensure there were no errors
  //     if (error ?? !data) {
  //       throw new Error('Error fetching POST URLs');
  //     }

  //     // Upload each file to S3
  //     const postUrlsList = data.presignedUrlsPost;
  //     const promises = postUrlsList.map(async ({ key, url, fields }, i) => {
  //       const formData = new FormData();

  //       // Append each form field to formData object
  //       Object.entries(fields).forEach(([field, value]) => {
  //         formData.append(field, value as string);
  //       });

  //       // Append corresponding photo as last form field as required by S3 API
  //       const photo = photos[i];
  //       formData.append('file', photo);

  //       // Upload photo to S3
  //       const res = await fetch(url, { method: 'POST', body: formData });

  //       if (!res.ok) {
  //         throw new Error(`Error uploading file ${photo.name}`);
  //       }

  //       // Return bucket key so photo can be referenced later
  //       return key;
  //     });

  //     const keys = await Promise.all(promises);

  //     return keys;
  //   } catch (err) {
  //     console.error(err);
  //     throw new Error('Failed to upload photos');
  //   }
  // };

  // Handler for when user has added a new meal
  const createNewMeal = async (formData: FormInputType) => {
    // An array of keys representing location of uploads in S3 bucket
    // let photoKeys: string[] = [];

    // Check if user has uploaded photos along with their meal data
    // 'photos' is typed as any because it facilitates Zod validation (File types aren't natively handled with Zod)
    // const hasPhotos = Array.from(formData.photos as FileList).length;

    // If photos have been selected, upload them to S3 before sending all data to backend
    // if (hasPhotos) {
    //   try {
    //     photoKeys = await uploadPhotosToS3(formData.photos as FileList);
    //   } catch (err) {
    //     toastError('Failed to upload photos 😞');
    //     return;
    //   }
    // }

    // Adjust date value to account for any timezone offset when apollo-link-scalars serializes value to UTC,
    // thus preventing a value representing previous/following day from being sent in request
    const adjustedDate = adjustDateForUTC(dateInEditor);

    // Perform Apollo Client mutation to save meal data in database
    await createMeal({
      variables: {
        mealData: {
          date: adjustedDate,
          description: formData.description,
          location: formData.location,
          rating: formData.rating,
          type: activeTab,
          photoKeys: [],
        },
      },
    });
  };

  // Handler for when user has updated an existing meal
  const updateExistingMeal = async (formData: FormInputType) => {
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

    // Call mutate function to send mutation to backend
    await updateMeal({
      variables: {
        id: meal.id,
        updatedMealData: updatedFields,
      },
    });
  };

  // Submit handler after passing form validation
  const onSubmit: SubmitHandler<FormInputType> = async (formData) => {
    formMode === 'ADD'
      ? await createNewMeal(formData)
      : await updateExistingMeal(formData);
  };

  return (
    <Flex direction="column" gap="3" p="3">
      <FormHeader setFormMode={setFormMode} activeTab={activeTab} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap="4">
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

          {formMode === 'ADD' && (
            // Temporary message in UI
            <Text size="1">
              <Em>Photo uploads will return shortly 📸</Em>
            </Text>
          )}

          <Button
            type="submit"
            style={{ width: '100%' }}
            disabled={isSubmitting || !isDirty}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default AddEditMealForm;

// // File upload field
// {
//   formMode === 'ADD' && (
//     <Flex direction="column" gap="2">
//       <Text as="label" size={{ initial: '1', md: '2' }} weight="bold">
//         Photos{' '}
//         <Text size="1" weight="light">
//           (Note: cannot be changed later)
//         </Text>
//         <PhotoUploadInput register={register} />
//       </Text>

//       {/* File inputs seem to have a different error type */}
//       {errors.photos && (
//         <FieldError text={errors.photos.message as string} />
//       )}
//     </Flex>
//   );
// }
