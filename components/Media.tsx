'use client';

import Image from 'next/image';

import useLoadImage from '@/services/useLoadImage';
import { Songs } from '@/types/types';

interface MediaProps {
  item: Songs;
  onClick?: (id: string) => void;
}

const Media = ({ item, onClick }: MediaProps) => {
  const imagePath = useLoadImage(item);

  const handleClick = () => {
    if (onClick) {
      return onClick(item.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          src={imagePath || '/images/likedsong.jpeg'}
          className="object-cover"
          fill
          alt={'image'}
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{item.title}</p>
        <p className="text-white truncate">{item.author}</p>
      </div>
    </div>
  );
};

export default Media;
