import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "@/lib/firebase";
import { Props } from "next/script";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { ProgressSpinner } from "primereact/progressspinner";
import { ProgressBar } from "primereact/progressbar";

interface AuthContextProps {
  user: User | null;
  userRoles: string[] | null;
}

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

export const AuthContext = createContext<AuthContextProps>({ user: null, userRoles: null });

export const useAuthContext = (): AuthContextProps => useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthLoading = () => {
  return (
    <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>

  )
}

export const AuthContextProvider = ({
  children,
}: AuthContextProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [userRoles, setUserRoles] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get the user from the database
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserRoles(docSnap.data()?.roles);
        }
        setUser(user);

      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userRoles }}>
      {loading ? <AuthLoading /> : children}
    </AuthContext.Provider>
  );
};
