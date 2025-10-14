import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

//Create a context
const AuthContext = createContext();

//Provider component
export function AuthProvider({ children }) {
  //states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  //functions for Authentication

  //Creates a new account using email and password.
  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  //Logs in an existing user.
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  //Logs out the user.
  const logout = () => signOut(auth);

  //Value Shared to App
  const value = { user, register, login, logout };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
//Custom hook for easy acces
export const useAuth = () => useContext(AuthContext); //You can now access user, login(), register(), and logout() anywhere via useAuth().
