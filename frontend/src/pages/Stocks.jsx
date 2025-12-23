import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { auth } from '../firebase'

export default function Stocks(){
  const [stocks, setStocks] = useState([])

  useEffect(()=>{
    const load = ()=> api.get('/stocks').then(res=> setStocks(res.data)).catch(console.error)
    load()
    const handler = ()=> load()
    window.addEventListener('dataChanged', handler)
    const poll = setInterval(load, 5000)
    return ()=>{ window.removeEventListener('dataChanged', handler); clearInterval(poll) }
  },[])

  return (
    <div style={{padding:20}}>
      <h1>Stocks</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:12}}>
        {stocks.map(s=> (
          <div className="card" key={s._id}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontWeight:700}}>{s.symbol}</div>
                <div style={{color:'#6b7280'}}>{s.name}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontWeight:700}}>${s.currentPrice}</div>
                <div style={{color:'#6b7280'}}>Qty {s.quantity}</div>
              </div>
            </div>
            <div style={{marginTop:10,display:'flex',gap:8}}>
              <button onClick={async ()=>{
                const qty = parseInt(prompt('Quantity to buy', '1')) || 0
                const price = parseFloat(prompt('Price', String(s.currentPrice))) || s.currentPrice
                if(qty <= 0){ return alert('Invalid quantity') }
                try{
                  if(auth && auth.currentUser){
                    // get a fresh token and include it directly in this request to avoid race conditions
                    const idToken = await auth.currentUser.getIdToken(true)
                    await api.post('/me/transactions', { stockId: s._id, symbol: s.symbol, name: s.name, type:'buy', price, quantity:qty }, { headers: { Authorization: `Bearer ${idToken}` } })
                  } else {
                    const idToken = localStorage.getItem('idToken')
                    if(idToken){
                      await api.post('/me/transactions', { stockId: s._id, symbol: s.symbol, name: s.name, type:'buy', price, quantity:qty }, { headers: { Authorization: `Bearer ${idToken}` } })
                    } else {
                      await api.post(`/stocks/${s._id}/transactions`, { type:'buy', price, quantity:qty })
                    }
                  }
                }catch(err){
                  console.error('Buy tx failed', err)
                  const msg = err?.response?.data?.message || err.message || 'Request failed'
                  return alert('Buy failed: ' + msg)
                }
                alert('Buy tx added')
                window.dispatchEvent(new Event('dataChanged'))
                window.dispatchEvent(new Event('summaryChanged'))
              }} style={{flex:1}}>Buy</button>
              <button onClick={async ()=>{
                const qty = parseInt(prompt('Quantity to sell', '1')) || 0
                const price = parseFloat(prompt('Price', String(s.currentPrice))) || s.currentPrice
                if(qty <= 0){ return alert('Invalid quantity') }
                try{
                  if(auth && auth.currentUser){
                    const idToken = await auth.currentUser.getIdToken(true)
                    await api.post('/me/transactions', { stockId: s._id, symbol: s.symbol, name: s.name, type:'sell', price, quantity:qty }, { headers: { Authorization: `Bearer ${idToken}` } })
                  } else {
                    const idToken = localStorage.getItem('idToken')
                    if(idToken){
                      await api.post('/me/transactions', { stockId: s._id, symbol: s.symbol, name: s.name, type:'sell', price, quantity:qty }, { headers: { Authorization: `Bearer ${idToken}` } })
                    } else {
                      await api.post(`/stocks/${s._id}/transactions`, { type:'sell', price, quantity:qty })
                    }
                  }
                }catch(err){
                  console.error('Sell tx failed', err)
                  const msg = err?.response?.data?.message || err.message || 'Request failed'
                  return alert('Sell failed: ' + msg)
                }
                alert('Sell tx added')
                window.dispatchEvent(new Event('dataChanged'))
                window.dispatchEvent(new Event('summaryChanged'))
              }} style={{flex:1}}>Sell</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
