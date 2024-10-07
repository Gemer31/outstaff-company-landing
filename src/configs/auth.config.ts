import { signInWithEmailAndPassword } from '@firebase/auth';
import { RouterLinks } from '@/models/enums';
import { auth } from '@/lib/firebase-config';
import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {label: 'email', type: 'email', required: true},
        password: {label: 'password', type: 'password', required: true},
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<any> {
        try {
          const res = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password,
          );
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
