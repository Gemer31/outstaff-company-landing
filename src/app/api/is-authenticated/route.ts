import { firebaseAdmin } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookiesFactory = await cookies();
    const token = cookiesFactory.get('token');
    await firebaseAdmin.auth().verifyIdToken(token.value);

    return Response.json(true, {status: 200})
  } catch {
    return Response.json(false, {status: 401})
  }
}
