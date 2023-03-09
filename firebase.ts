import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAA_20Awpdt9VuULchLtx3dwYo-u7tNglQ",
  authDomain: "brightdata--scraper-47e78.firebaseapp.com",
  projectId: "brightdata--scraper-47e78",
  storageBucket: "brightdata--scraper-47e78.appspot.com",
  messagingSenderId: "397670082221",
  appId: "1:397670082221:web:44e8ec4cf20b88a55b8824",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
