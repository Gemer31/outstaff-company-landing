import { firebaseAdmin } from '@/lib/firebaseAdmin';
import { getIdToken } from '@firebase/auth';
import { auth } from '@/lib/firebaseClient';

export async function GET() {
  try {
    const token = await getIdToken(auth.currentUser);
    await firebaseAdmin.auth().verifyIdToken(token);

    return Response.json(true, {status: 401})
  } catch {
    return Response.json(false, {status: 401})
  }
}
