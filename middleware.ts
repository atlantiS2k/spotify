import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supaBase = createMiddlewareClient({
    req,
    res,
  });

  await supaBase.auth.getSession();
  return res;
}
