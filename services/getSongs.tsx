import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import toast from 'react-hot-toast';

import { Songs } from '@/types/types';

const getSongs = async (): Promise<Songs[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    toast.error(error.message);
  }

  // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-explicit-any
  return (data as any) || [];
};
export default getSongs;
