import { createContext, useContext, useEffect, useState } from 'react'
import { auth, googleProvider } from '../firebase'
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signInWithRedirect, getRedirectResult, updateProfile, updateCurrentUser } from 'firebase/auth'

const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Handle Google sign-in redirect result (for mobile)
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          setUser(result.user);
        }
      })
      .catch(() => {});
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    // Force reload user profile to get latest displayName
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setUser({ ...auth.currentUser });
    }
    return cred;
  }
  const register = async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (name) await updateProfile(cred.user, { displayName: name })
    return cred
  }
  const loginWithGoogle = () => {
    // Use redirect on mobile, popup on desktop
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop|Mobile/i.test(navigator.userAgent);
    if (isMobile) {
      return signInWithRedirect(auth, googleProvider);
    } else {
      return signInWithPopup(auth, googleProvider);
    }
  }
  const logout = () => signOut(auth)


  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext)
