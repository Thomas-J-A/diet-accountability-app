// TODO: Add proxy, custom-styled upload button and visually hide default file input
import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Flex, Text } from '@radix-ui/themes';
import { FormInputType } from '../AddEditMealForm';
import * as S from './PhotoUploadInput.styled';

interface FileInputProps {
  register: UseFormRegister<FormInputType>;
}

const FileInput = ({ register }: FileInputProps) => {
  // Ref for the (visually hidden) file input element
  // const fileInputRef = useRef<HTMLInputElement>(null);

  // List of selected files including file metadata and their preview URL
  const [filePreviews, setFilePreviews] = useState<
    { file: File; url: string }[]
  >([]);

  // Handle change when a file is selected
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      // Update local state with enough info to display previews
      const filePreviews = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

      setFilePreviews(filePreviews);
    }
  };

  // Invoked when user clicks proxy upload button
  // const handleUploadButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   // Prevents form validation from running (should only happen after first submission)
  //   e.preventDefault();

  //   // Trigger click event of hidden file input programmatically
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  const renderPhotoPreviews = () => (
    <Flex direction="column" gap="2">
      {filePreviews.map(({ file, url }) => (
        <Flex key={file.name}>
          <img
            src={url}
            alt={file.name}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-2)',
            }}
          />

          <Flex direction="column" justify="between" ml="1">
            <Text weight="light">{file.name}</Text>
            <Text weight="light">{`${(file.size / 1024).toFixed(2)} KB`}</Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );

  return (
    <Flex direction="column" gap="2" mt={{ initial: '1', md: '2' }}>
      <S.StyledFileInput
        type="file"
        {...register('rating')} // TODO: Temp value, change to 'photos'
        onChange={handleFileChange}
        // aria-invalid={}
        multiple
        accept="image/*"
      />
      {/* <Button
        onClick={handleUploadButtonClick}
        size={{ initial: '1', md: '2' }}
        variant="soft"
      >
        <UploadIcon width="15" height="15" />
        Upload
      </Button> */}

      {filePreviews.length > 0 && renderPhotoPreviews()}
    </Flex>
  );
};

export default FileInput;
