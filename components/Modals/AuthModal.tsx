'use client';

import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';

import Modal from './Modal';
import { useAuthModal } from '@/hooks/useAuthModal';

const AuthModal = () => {
  const supaBaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if(!isOpen) 
    

  }
  return (
    <Modal
      title="Wellcome back"
      decsription="login to your accoiunt"
      isOpen
      onChange={() => {}}
    >
      <Auth
        theme="dark"
        magicLink
        providers={['github', 'google', 'gitlab', 'discord']}
        supabaseClient={supaBaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e',
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
