import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "lib/firebaseConfig";
import { fetchParsedCVText, fetchUserCV } from "utils/firebaseFunctions";

interface UserType {
  email: string | null;
  uid: string | null;
  displayName: string | null;
  pdfURL: string | null;
  parsedCVText: string | null;
}

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>({
    email: null,
    uid: null,
    displayName: null,
    pdfURL: null,
    parsedCVText: null,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const googleProvider = new GoogleAuthProvider();

  const googleSignIn = async () => {
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          pdfURL: null,
          parsedCVText: null,
        });
      })
      .catch((error: any) => {
        return error.message;
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const pdfURL = await fetchUserCV(user.displayName, user.uid);
        const parsedCVText = await fetchParsedCVText(user.uid); // Fetch the parsed CV text here
        setUser({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          pdfURL: pdfURL,
          parsedCVText: parsedCVText, // Add this to the state
        });
      } else {
        setUser({
          email: null,
          uid: null,
          displayName: null,
          pdfURL: null,
          parsedCVText: null,
        }); // Make sure to reset this as well
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }
      return null;
    } catch (error: any) {
      return error.message;
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return null;
    } catch (error: any) {
      return error.message;
    }
  };

  const logOut = async () => {
    setUser({
      email: null,
      uid: null,
      displayName: null,
      pdfURL: null,
      parsedCVText: null,
    });
    await signOut(auth);
  };

  const setPDFURLToNull = () => {
    setUser((prevState) => ({
      ...prevState,
      pdfURL: null,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        logIn,
        logOut,
        googleSignIn,
        setPDFURLToNull,
        setUser,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
