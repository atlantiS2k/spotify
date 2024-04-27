'use client';

import { MyUserContextProvider } from '@/hooks/useUser';

interface UseProviderProps {
  children: React.ReactNode;
}

const UseProvider = ({ children }: UseProviderProps) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UseProvider;
