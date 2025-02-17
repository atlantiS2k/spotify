import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Songs } from '@/types/types';

const getSongsUserId = async (): Promise<Songs[]> => {
  const supabase = createClientComponentClient({
    cookieOptions: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any) || [];
};
export default getSongsUserId;
