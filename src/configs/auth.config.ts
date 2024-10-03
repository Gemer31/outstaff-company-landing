import { AuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { doc, getDoc } from '@firebase/firestore';
import { cookies } from 'next/headers';
import firebase from 'firebase/compat';
import auth = firebase.auth;
import { db } from '@/lib/firebase-config';
import { FirestoreCollections } from '@/models/enums';

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        try {
          await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          const userDocumentSnapshot = await getDoc(
            doc(db, FirestoreCollections.USERS, credentials.email)
          );
          const userData: IUser = userDocumentSnapshot.data() as IUser;
          cookies().set(CLIENT_ID, userData.clientId);
          return userData as unknown as User;
        } catch (e) {
          return null;
          // console.error('Login failed: ', e);
        }
      },
    }),
  ],
  pages: {
    signIn: RouterPath.SIGN_IN,
  },
};
