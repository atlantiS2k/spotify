'use client';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';

import { useAuthModal } from '@/hooks/useAuthModal';
import { useUploadModal } from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import { Songs } from '@/types/types';
interface LibraryProps {
  songs: Songs[];
}
const Library = ({ _songs }: LibraryProps) => {
  const autModal = useAuthModal();
  const uploadModal = useUploadModal();

  const { user } = useUser();

  const onClick = () => {
    if (!user) {
      return autModal.onOpen();
    }

    return uploadModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md">Your library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">List of song</div>
    </div>
  );
};

export default Library;
