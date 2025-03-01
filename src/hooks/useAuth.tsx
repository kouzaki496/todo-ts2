import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { signInWithGoogle } from '@/service/authService';

interface AuthContextType {
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {
    await signInWithGoogle();
  },
  signOut: async () => {
    await signOut(auth);
  }
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? `User: ${user.displayName}` : 'No user');
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      signIn: async () => {
        await signInWithGoogle();
      },
      signOut: async () => {
        await signOut(auth);
      }
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};