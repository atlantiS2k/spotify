'use client';

import { useEffect, useState } from 'react';

import AuthModal from '@/components/Modals/AuthModal';

const ModalProvider = () => {
  const [isMountend, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMountend) {
    return null;
  }
  return <AuthModal />;
};
export default ModalProvider;
