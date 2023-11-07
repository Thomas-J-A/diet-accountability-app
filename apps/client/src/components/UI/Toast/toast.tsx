import { toast } from 'react-toastify';
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons';

export const toastSuccess = (message: string) => {
  toast.success(message, {
    icon: <CheckCircledIcon height="20" width="20" color="green" />,
  });
};

export const toastError = (message: string) => {
  toast.error(message, {
    icon: <ExclamationTriangleIcon height="20" width="20" color="red" />,
  });
};
