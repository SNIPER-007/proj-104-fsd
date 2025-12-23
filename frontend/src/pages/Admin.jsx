import React, { useState } from 'react'
import { seed, health } from '../api/admin'

export default function Admin(){
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [status, setStatus] = useState(null)

  async function doSeed(){
    setLoading(true)
    try{
      const res = await seed()
      setMsg('Seed started')
      // wait a moment then refresh summary
      setTimeout(()=> window.dispatchEvent(new Event('summaryChanged')), 1500)
    }catch(err){
      setMsg('Seed failed')
    }finally{ setLoading(false) }
  }

  async function check(){
    try{
      const res = await health()
      setStatus(res.data)
    }catch(err){
      setStatus({ error: err?.response?.data || err.message })
    }
  }

  return (
    <div style={{padding:20}}>
      <h1>Admin</h1>
      <div style={{display:'flex',gap:8}}>
        <button onClick={doSeed} disabled={loading}>{loading? 'Seeding...' : 'Run Seed Data'}</button>
        <button onClick={check}>Check Health</button>
      </div>
      {msg && <div style={{marginTop:12}}>{msg}</div>}
      {status && (
        <pre style={{marginTop:12,background:'#fff',padding:12}}>{JSON.stringify(status, null, 2)}</pre>
      )}
    </div>
  )
}
