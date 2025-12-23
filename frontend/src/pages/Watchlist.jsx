import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { auth } from '../firebase'

export default function Watchlist(){
  const [list, setList] = useState([])
  useEffect(()=>{
    const load = async ()=>{
      try{
        const idToken = localStorage.getItem('idToken')
        if(idToken){
          const res = await api.get('/me/watchlist').catch(()=>null)
          if(res && res.data) return setList(res.data)
        }
        const res = await api.get('/stocks/watchlist')
        setList(res.data)
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
      <h1>Watchlist</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:12}}>
        {list.map(s=> {
          const sid = s._id || s.stockId
          return (
            <div key={sid} className="card">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <strong>{s.symbol}</strong>
                <span style={{color:'#6b7280'}}>${s.currentPrice}</span>
              </div>
              <div style={{marginTop:8,color:'#333'}}>{s.name}</div>
              <div style={{marginTop:12,display:'flex',justifyContent:'space-between'}}>
                <small>Qty: {s.quantity}</small>
                <small>{s.transactions?.length || 0} tx</small>
              </div>
              <div style={{marginTop:10,display:'flex',gap:8}}>
                <button onClick={async()=>{
                  try{
                    if(auth && auth.currentUser){
                      const idToken = await auth.currentUser.getIdToken(true)
                      await api.post('/me/transactions', { stockId: sid, symbol: s.symbol, name: s.name, type:'buy', price: s.currentPrice, quantity:1 }, { headers: { Authorization: `Bearer ${idToken}` } })
                    } else {
                      const idToken = localStorage.getItem('idToken')
                      if(idToken){
                        await api.post('/me/transactions', { stockId: sid, symbol: s.symbol, name: s.name, type:'buy', price: s.currentPrice, quantity:1 }, { headers: { Authorization: `Bearer ${idToken}` } })
                      } else {
                        await api.post(`/stocks/${sid}/transactions`, { type:'buy', price: s.currentPrice, quantity:1 })
                      }
                    }
                    alert('Buy added')
                    window.dispatchEvent(new Event('dataChanged'))
                    window.dispatchEvent(new Event('summaryChanged'))
                  }catch(err){
                    console.error('Buy failed', err)
                    const msg = err?.response?.data?.message || err.message || 'Request failed'
                    alert('Buy failed: ' + msg)
                  }
                }} style={{flex:1}}>Buy</button>
                <button onClick={async()=>{
                  try{
                    if(auth && auth.currentUser){
                      const idToken = await auth.currentUser.getIdToken(true)
                      await api.post('/me/transactions', { stockId: sid, symbol: s.symbol, name: s.name, type:'sell', price: s.currentPrice, quantity:1 }, { headers: { Authorization: `Bearer ${idToken}` } })
                    } else {
                      const idToken = localStorage.getItem('idToken')
                      if(idToken){
                        await api.post('/me/transactions', { stockId: sid, symbol: s.symbol, name: s.name, type:'sell', price: s.currentPrice, quantity:1 }, { headers: { Authorization: `Bearer ${idToken}` } })
                      } else {
                        await api.post(`/stocks/${sid}/transactions`, { type:'sell', price: s.currentPrice, quantity:1 })
                      }
                    }
                    alert('Sell added')
                    window.dispatchEvent(new Event('dataChanged'))
                    window.dispatchEvent(new Event('summaryChanged'))
                  }catch(err){
                    console.error('Sell failed', err)
                    const msg = err?.response?.data?.message || err.message || 'Request failed'
                    alert('Sell failed: ' + msg)
                  }
                }} style={{flex:1}}>Sell</button>
              </div>
              <div style={{marginTop:10,display:'flex',justifyContent:'center'}}>
                <button onClick={async()=>{
                  try{
                    if(auth && auth.currentUser){
                      const idToken = await auth.currentUser.getIdToken(true)
                      await api.post('/me/watch', { stockId: sid, symbol: s.symbol, name: s.name, watch:false }, { headers: { Authorization: `Bearer ${idToken}` } })
                    } else {
                      const idToken = localStorage.getItem('idToken')
                      if(idToken){
                        await api.post('/me/watch', { stockId: sid, symbol: s.symbol, name: s.name, watch:false }, { headers: { Authorization: `Bearer ${idToken}` } })
                      } else {
                        await api.post(`/stocks/${sid}/watch`, { watch:false })
                      }
                    }
                    setList(prev => prev.filter(x=> (x._id || x.stockId) !== sid))
                    window.dispatchEvent(new Event('dataChanged'))
                    window.dispatchEvent(new Event('summaryChanged'))
                  }catch(err){
                    console.error('Remove failed', err)
                    const msg = err?.response?.data?.message || err.message || 'Request failed'
                    alert('Remove failed: ' + msg)
                  }
                }} style={{background:'#fff',border:'1px solid #e6e6e6'}}>Remove</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
