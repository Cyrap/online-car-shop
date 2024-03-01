import React from "react";
import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  const firebaseConfig = {
    apiKey: "AIzaSyDwEtxBLrs7mN6CNm4ch3Kb-AXAvDZYibQ",
    authDomain: "project-2357184398957753308.firebaseapp.com",
    projectId: "project-2357184398957753308",
    storageBucket: "project-2357184398957753308.appspot.com",
    messagingSenderId: "301131305457",
    appId: "1:301131305457:web:5661b8143aca9f97b67450",
    measurementId: "G-6M28CSGXKX"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const db = getFirestore(app);
  const storage = getStorage(app);

  return (
    <FirebaseContext.Provider value={{ app, auth, googleProvider, db, storage }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export default FirebaseProvider;
