import { getIdToken, signInWithEmailAndPassword } from '@firebase/auth';
import { RouterLinks } from '@/models/enums';
import { auth } from '@/lib/firebaseClient';
import Credentials from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';

export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {label: 'email', type: 'email', required: true},
        password: {label: 'password', type: 'password', required: true},
      },
      async authorize(credentials): Promise<any> {
        try {
          const res = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password,
          );
          const token = await getIdToken(res.user);

          const cookiesFactory = await cookies();
          cookiesFactory.set('token', token);

          return res as any;
        } catch {
          return null as any;
        }
      },
    }),
  ],
  pages: {
    signIn: RouterLinks.SIGN_IN,
  },
};
