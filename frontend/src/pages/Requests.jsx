import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { auth } from '../firebase'

export default function Requests(){
  const [requests, setRequests] = useState([])
  useEffect(()=>{
    const load = async ()=>{
      try{
        if(auth && auth.currentUser){
          const idToken = await auth.currentUser.getIdToken(true)
          const res = await api.get('/me/requests', { headers: { Authorization: `Bearer ${idToken}` } }).catch(()=>null)
          if(res && res.data) return setRequests(res.data)
        } else {
          const idToken = localStorage.getItem('idToken')
          if(idToken){
            const res = await api.get('/me/requests', { headers: { Authorization: `Bearer ${idToken}` } }).catch(()=>null)
            if(res && res.data) return setRequests(res.data)
          }
        }
        const res = await api.get('/stocks/requests')
        setRequests(res.data)
      }catch(err){ console.error(err) }
    }
    load()
    const handler = ()=> load()
    window.addEventListener('dataChanged', handler)
    const poll = setInterval(load, 5000)
    return ()=>{ window.removeEventListener('dataChanged', handler); clearInterval(poll) }
  },[])

  async function cancelRequest(sId, rId){
    try{
      if(auth && auth.currentUser){
        const idToken = await auth.currentUser.getIdToken(true)
        await api.delete(`/me/requests/${rId}`, { headers: { Authorization: `Bearer ${idToken}` } })
      } else {
        const idToken = localStorage.getItem('idToken')
        if(idToken){
          await api.delete(`/me/requests/${rId}`, { headers: { Authorization: `Bearer ${idToken}` } })
        } else {
          await api.delete(`/stocks/${sId}/requests/${rId}`)
        }
      }
      setRequests(prev => prev.filter(p=> String(p._id) !== String(rId)))
      window.dispatchEvent(new Event('dataChanged'))
      window.dispatchEvent(new Event('summaryChanged'))
      alert('Request cancelled')
    }catch(err){ console.error(err); const msg = err?.response?.data?.message || err.message || 'Cancel failed'; alert('Cancel failed: ' + msg) }
  }

  return (
    <div style={{padding:20}}>
      <h1>Purchase Requests</h1>
      <ul>
        {requests.map((r,idx)=> (
          <li key={r._id || idx}>
            {r.symbol} — {r.name} — Price: ${r.price} — Qty: {r.quantity} — {r.requestedAt ? new Date(r.requestedAt).toLocaleString() : '—'}
            <button style={{marginLeft:12}} onClick={async()=>{ await cancelRequest(r.stockId, r._id); window.dispatchEvent(new Event('summaryChanged')) }}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
