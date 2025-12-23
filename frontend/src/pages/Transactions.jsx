import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { auth } from '../firebase'

export default function Transactions(){
  const [txs, setTxs] = useState([])
  useEffect(()=>{
    const load = async ()=>{
      try{
        if(auth && auth.currentUser){
          const idToken = await auth.currentUser.getIdToken(true)
          const res = await api.get('/me/transactions', { headers: { Authorization: `Bearer ${idToken}` } }).catch(()=>null)
          if(res && res.data) return setTxs(res.data)
        } else {
          const idToken = localStorage.getItem('idToken')
          if(idToken){
            const res = await api.get('/me/transactions', { headers: { Authorization: `Bearer ${idToken}` } }).catch(()=>null)
            if(res && res.data) return setTxs(res.data)
          }
        }
        const res = await api.get('/stocks/transactions')
        setTxs(res.data)
      }catch(err){ console.error(err) }
    }
    load()
    const handler = ()=> load()
    window.addEventListener('dataChanged', handler)
    const poll = setInterval(load, 5000)
    return ()=>{ window.removeEventListener('dataChanged', handler); clearInterval(poll) }
  },[])

  return (
    <div style={{padding:20}}>
      <h1>Transactions</h1>
      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead>
          <tr style={{textAlign:'left',borderBottom:'1px solid #ddd'}}>
            <th>When</th>
            <th>Symbol</th>
            <th>Type</th>
            <th>Price</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {txs.map(t=> (
            <tr key={t._id || Math.random()} style={{borderBottom:'1px solid #f5f5f5'}}>
              <td>{t.date ? new Date(t.date).toLocaleString() : '—'}</td>
              <td>{t.symbol}</td>
              <td style={{textTransform:'capitalize'}}>{t.type}</td>
              <td>${t.price}</td>
              <td>{t.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
