import { useState, useContext, createContext, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { User } from '../__generated__/graphql';
import { toastSuccess } from '../components/UI/Toast/toast';
import ToastMessages from '../constants/toast-messages';

interface LogIn {
  type: 'SIGN_UP' | 'SIGN_IN';
  currentUser: User;
  accessToken: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  logIn: (args: LogIn) => void;
  logOut: () => void;
}

interface LocationState {
  from: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Wrap around app to allow components to view/update user's auth status
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const locationState = useLocation().state as LocationState | undefined;
  const client = useApolloClient();

  // Rehydrate local state after refreshing page to ensure user isn't signed out
  // This will be null on initial page load
  const currentUserJson = localStorage.getItem('currentUser');

  const [currentUser, setCurrentUser] = useState<User | null>(
    currentUserJson ? (JSON.parse(currentUserJson) as User) : null,
  );

  // Helper function to auth user into app after registering
  const logIn = ({ type, currentUser, accessToken }: LogIn) => {
    // Add user details to localStorage for rehydrating on refresh
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Set local state. A value here indicates an authenticated user
    setCurrentUser(currentUser);

    // Add tokens to localStorage for Apollo Client to
    // retrieve when sending authenticated requests
    localStorage.setItem('accessToken', accessToken);
    // localStorage.setItem('refreshToken', refreshToken);

    // Redirect to referer, or default /calendar
    const from = locationState?.from ?? '/calendar';
    navigate(from, { replace: true });

    // Display successful sign up/in notification
    const message =
      type === 'SIGN_UP'
        ? ToastMessages.SIGNED_UP_SUCCESSFULLY
        : ToastMessages.SIGNED_IN_SUCCESSFULLY;

    toastSuccess(message);
  };

  const logOut = () => {
    // Remove references to authed user
    localStorage.removeItem('currentUser');
    setCurrentUser(null);

    // Remove tokens so user can't make any more authenticated requests
    localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');

    // Reset Apollo Client cache so there is no authed data remaining
    void client.resetStore();

    // Navigate back to landing page
    navigate('/', { replace: true });

    // Display successful sign out notification
    toastSuccess(ToastMessages.SIGNED_OUT_SUCCESSFULLY);
  };

  // Quick check for auth status
  const isAuthenticated = !!currentUser;

  // Provider value, extracted for cleaner code
  const value = {
    currentUser,
    isAuthenticated,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('There must be a provider for this context');
  }

  return authContext;
};
