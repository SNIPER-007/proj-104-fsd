import React from 'react'
import { onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth'
import { auth } from '../firebase'
import api from '../api/api'

const AuthContext = React.createContext({ user: null, token: null })

export function AuthProvider({ children }){
  const [user, setUser] = React.useState(null)
  const [token, setToken] = React.useState(null)

  React.useEffect(()=>{
    if(!auth){
      // Firebase auth not initialized (env missing) — restore token from storage only
      const stored = localStorage.getItem('idToken')
      if(stored) api.defaults.headers.common['Authorization'] = `Bearer ${stored}`
      return
    }

    const unsub = onAuthStateChanged(auth, async (u)=>{
      if(u){
        setUser(u)
        const idToken = await u.getIdToken()
        setToken(idToken)
        api.defaults.headers.common['Authorization'] = `Bearer ${idToken}`
        localStorage.setItem('idToken', idToken)
      } else {
        setUser(null)
        setToken(null)
        delete api.defaults.headers.common['Authorization']
        localStorage.removeItem('idToken')
      }
    })
    // if token in storage, set header (helps on refresh)
    const stored = localStorage.getItem('idToken')
    if(stored) api.defaults.headers.common['Authorization'] = `Bearer ${stored}`
    return ()=> unsub()
  },[])

  async function logout(){
    if(auth) await fbSignOut(auth)
    // cleanup
    delete api.defaults.headers.common['Authorization']
    localStorage.removeItem('idToken')
    window.dispatchEvent(new Event('dataChanged'))
    window.dispatchEvent(new Event('summaryChanged'))
  }

  return (
    <AuthContext.Provider value={{ user, token, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
