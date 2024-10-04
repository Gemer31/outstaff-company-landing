import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { RouterLinks } from '@/models/enums';
import { auth } from '@/lib/firebase-config';

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {label: 'email', type: 'email', required: true},
        password: {label: 'password', type: 'password', required: true},
      },
      async authorize(credentials) {
        try {
          const res = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password,
          );
          return res;
        } catch (e) {
          return null;
          // console.error('Login failed: ', e);
        }
      },
    }),
  ],
  pages: {
    signIn: RouterLinks.SIGN_IN,
  },
};
