"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

    const logout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      console.log("Logging out successfully");
      router.push("/")
    } catch(error) {
      console.log("Error signing out: ", error)
    }
  };

  const signUpWithEmail = async (email, password) => {
    setLoading(true);
    setAuthError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          completedSteps: false,
          createdAt: new Date(),
      });

      return userCredential;

    } catch (error) {
      console.log("errorCode:", error.code, "errorMessage:", error.message);
      setAuthError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email, password) => {
    setLoading(true);
    setAuthError(null);

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        return userCredential.user;
      } catch (error) {
        console.log("Sign in error:", error.code, error.message);
        setAuthError("Sign in error: Credential(s) entered invalid")
        throw error;
      } finally {
        setLoading(false);
      }
  };

  const value = {
    currentUser, 
    userData,
    logout,
    authError,
    loading,
    signInWithEmail,
    signUpWithEmail,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
