// lib/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@kuwaitindiadriving.com';

const AuthContext = createContext({
  currentUser: null,
  isAdmin: false,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamically import firebase auth only in browser
    // This completely avoids the SSR/build-time crash
    let unsubscribe = () => {};

    import('../lib/firebase').then(({ auth }) => {
      if (!auth) {
        setLoading(false);
        return;
      }
      unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setIsAdmin(user?.email === ADMIN_EMAIL);
        setLoading(false);
      });
    }).catch(() => {
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { auth } = await import('../lib/firebase');
    if (!auth) throw new Error('Firebase not initialized');
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (result.user.email !== ADMIN_EMAIL) {
      await signOut(auth);
      throw new Error('Unauthorized: Not an admin user');
    }
    return result;
  };

  const logout = async () => {
    const { auth } = await import('../lib/firebase');
    if (auth) return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAdmin, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}