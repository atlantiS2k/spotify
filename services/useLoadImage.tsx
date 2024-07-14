import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Songs } from '@/types/types';

const useLoadImage = (song: Songs) => {
  const supaBaseClient = useSupabaseClient();
  if (!song) {
    return null;
  }

  const { data: imageData } = supaBaseClient.storage
    .from('images')
    .getPublicUrl(song.imagePath);

  return imageData.publicUrl;
};

export default useLoadImage;
