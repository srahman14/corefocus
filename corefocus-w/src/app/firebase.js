import { initializeApp  } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { firebaseConfig } from "./firebase-config";

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);
export const db = getFirestore(app);