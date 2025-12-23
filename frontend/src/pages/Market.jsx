import React, { useEffect, useState } from 'react'
import api from '../api/api'

export default function Market(){
  const [market, setMarket] = useState([])
  useEffect(()=>{
    const load = ()=> api.get('/stocks/market').then(res=> setMarket(res.data)).catch(console.error)
    load()
    const handler = ()=> load()
    window.addEventListener('dataChanged', handler)
    const poll = setInterval(load, 5000)
    return ()=>{ window.removeEventListener('dataChanged', handler); clearInterval(poll) }
  },[])

  async function addWatch(id, symbol, name){
    const idToken = localStorage.getItem('idToken')
    if(idToken){
      await api.post('/me/watch', { stockId: id, symbol, name, watch:true })
    } else {
      await api.post(`/stocks/${id}/watch`, { watch:true })
    }
    setMarket(prev => prev.map(s=> s._id===id ? { ...s, watchlisted:true } : s))
    window.dispatchEvent(new Event('dataChanged'))
    window.dispatchEvent(new Event('summaryChanged'))
  }

  async function buyOne(id, price){
    const qty = parseInt(prompt('Quantity to buy', '1')) || 0
    const p = parseFloat(prompt('Price', String(price))) || price
    if(qty <= 0) return alert('Invalid quantity')
    const idToken = localStorage.getItem('idToken')
    if(idToken){
      await api.post('/me/transactions', { stockId: id, symbol: '', name: '', type:'buy', price: p, quantity: qty })
    } else {
      await api.post(`/stocks/${id}/transactions`, { type:'buy', price: p, quantity: qty })
    }
    alert('Buy added')
    window.dispatchEvent(new Event('dataChanged'))
    window.dispatchEvent(new Event('summaryChanged'))
  }

  return (
    <div style={{padding:20}}>
      <h1>Market</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
        {market.map(s=> (
          <div key={s._id} className="card">
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <div><strong>{s.symbol}</strong><div style={{color:'#6b7280'}}>{s.name}</div></div>
              <div style={{textAlign:'right'}}>${s.currentPrice}</div>
            </div>
            <div style={{marginTop:10,display:'flex',gap:8}}>
              <button onClick={()=>buyOne(s._id, s.currentPrice)} style={{flex:1}}>Buy</button>
              <button onClick={()=>addWatch(s._id, s.symbol, s.name)} style={{flex:1}}>{s.watchlisted? 'Watchlisted' : 'Add Watch'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
