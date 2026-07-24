import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, Auth } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, query, where, updateDoc, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'cocokin-app.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'cocokin-app',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'cocokin-app.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1234567890:web:abc123def',
};

let app;
let auth: Auth | null = null;
let db = null;

try {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch {
  auth = null;
  db = null;
}

export const firebaseService = {
  get isAvailable() {
    return Boolean(auth && db);
  },

  getAuth() {
    return auth;
  },

  getDb() {
    return db;
  },

  async signIn(email: string, password: string) {
    if (!auth) return { ok: false, reason: 'firebase-unavailable' };
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      return { ok: true, user: credential.user };
    } catch (error: any) {
      return { ok: false, reason: error?.code || 'auth-failed' };
    }
  },

  async signUp(email: string, password: string) {
    if (!auth) return { ok: false, reason: 'firebase-unavailable' };
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      return { ok: true, user: credential.user };
    } catch (error: any) {
      return { ok: false, reason: error?.code || 'auth-failed' };
    }
  },

  async signOutUser() {
    if (!auth) return;
    await signOut(auth);
  },

  async syncUserProfile(uid: string, profile: Record<string, unknown>) {
    if (!db) return { ok: false, reason: 'firebase-unavailable' };
    try {
      await setDoc(doc(db, 'users', uid), profile, { merge: true });
      return { ok: true };
    } catch (error: any) {
      return { ok: false, reason: error?.message || 'sync-failed' };
    }
  },

  async listCollection(collectionName: string) {
    if (!db) return [];
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
  },

  watchAuth(callback: (user: any) => void) {
    if (!auth) return () => {};
    return onAuthStateChanged(auth, callback);
  },
};
