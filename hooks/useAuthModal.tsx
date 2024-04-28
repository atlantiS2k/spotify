import { atom, useAtom } from 'jotai';

interface AuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const isOpenAtom = atom(false);

export const useAuthModal = (): AuthModalStore => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return {
    isOpen,
    onClose,
    onOpen,
  };
};
