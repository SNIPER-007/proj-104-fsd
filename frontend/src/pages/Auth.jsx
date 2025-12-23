import React from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function Auth(){
  const [mode, setMode] = React.useState('signin')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const authAvailable = !!auth

  async function submit(e){
    e.preventDefault()
    if(!authAvailable){
      alert('Firebase Auth is not configured. Please set the VITE_FIREBASE_* env vars and restart the dev server.')
      return
    }

    try{
      if(mode === 'signin'){
        await signInWithEmailAndPassword(auth, email, password)
        alert('Signed in')
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
        alert('Account created')
      }
      window.dispatchEvent(new Event('dataChanged'))
      window.dispatchEvent(new Event('summaryChanged'))
    }catch(err){ console.error(err); alert(err.message) }
  }

  return (
    <div style={{padding:20}}>
      <h1>{mode === 'signin' ? 'Sign in' : 'Sign up'}</h1>
      {!authAvailable && (
        <div style={{marginBottom:12,padding:8,background:'#fffbeb',border:'1px solid #f4e1b6'}}>
          <strong>Firebase Auth is not configured.</strong>
          <div style={{fontSize:12}}>Set the VITE_FIREBASE_* env variables (see <code>.env.example</code>) and restart the dev server.</div>
        </div>
      )}
      <form onSubmit={submit} style={{maxWidth:420}}>
        <div style={{marginBottom:8}}>
          <input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} style={{width:'100%'}} disabled={!authAvailable} />
        </div>
        <div style={{marginBottom:8}}>
          <input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{width:'100%'}} disabled={!authAvailable} />
        </div>
        <div style={{display:'flex',gap:8}}>
          <button type="submit" disabled={!authAvailable}>{mode === 'signin' ? 'Sign in' : 'Create account'}</button>
          <button type="button" onClick={()=> setMode(mode === 'signin' ? 'signup' : 'signin')}>{mode === 'signin' ? 'Need an account?' : 'Have an account?'}</button>
        </div>
      </form>
    </div>
  )
}
