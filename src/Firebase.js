import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAXvcMKdtx89S5otJXWDvMWPA05J_HUS4s',
  authDomain: 'wbws-1.firebaseapp.com',
  projectId: 'wbws-1',
  storageBucket: 'wbws-1.appspot.com',
  messagingSenderId: '26149876784',
  appId: '1:26149876784:web:5174aab82715fd1fd7e9f5',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const auth = getAuth();
