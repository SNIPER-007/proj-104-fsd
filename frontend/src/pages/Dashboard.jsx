import React from 'react'
import api from '../api/api'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const [summary, setSummary] = React.useState({ portfolioValue:0, watchlistCount:0, requestsCount:0, pnl:0 })
  const [recent, setRecent] = React.useState([])

  async function load(){
    try{
      const res = await api.get('/stocks/summary')
      setSummary(res.data)
    }catch(err){ console.error(err) }
  }

  async function loadRecent(){
    try{
      const res = await api.get('/stocks/transactions')
      setRecent(res.data.slice(0,3))
    }catch(err){ console.error(err) }
  }

  React.useEffect(()=>{ 
    load()
    loadRecent()
    const summaryHandler = () => load()
    const dataHandler = () => loadRecent()
    window.addEventListener('summaryChanged', summaryHandler)
    window.addEventListener('dataChanged', dataHandler)
    const poll = setInterval(()=>{ load(); loadRecent() }, 5000)
    return ()=>{ 
      window.removeEventListener('summaryChanged', summaryHandler)
      window.removeEventListener('dataChanged', dataHandler)
      clearInterval(poll)
    }
  },[])

  return (
    <div style={{padding:20}}>
      <h1>Dashboard</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
        <div className="card">
          <h3 style={{margin:0}}>Portfolio Value</h3>
          <div style={{fontSize:24,fontWeight:700,marginTop:8}}>${summary.portfolioValue.toFixed(2)}</div>
          <div style={{color:'#6b7280',marginTop:6}}>P&L: ${summary.pnl.toFixed(2)}</div>
        </div>
        <div className="card">
          <h3 style={{margin:0}}>Watchlist</h3>
          <div style={{marginTop:8}}>{summary.watchlistCount} stocks</div>
        </div>
        <div className="card">
          <h3 style={{margin:0}}>Open Requests</h3>
          <div style={{marginTop:8}}>{summary.requestsCount} requests</div>
        </div>
      </div>

      <section style={{marginTop:20}}>
        <h2>Recent Transactions</h2>
        <div className="card" style={{marginTop:12}}>
          {recent.length === 0 && <div>No recent transactions</div>}
          {recent.map(tx => (
            <div key={tx._id} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f2f4f6'}}>
              <div>
                <div style={{fontWeight:700}}>{tx.symbol} <small style={{color:'#6b7280'}}>{tx.name}</small></div>
                <div style={{color:'#6b7280'}}>{tx.type.toUpperCase()} • Qty: {tx.quantity} • ${tx.price}</div>
              </div>
              <div style={{color:'#6b7280'}}>{tx.date ? new Date(tx.date).toLocaleString() : '—'}</div>
            </div>
          ))}
          <div style={{marginTop:8,textAlign:'right'}}><Link to="/transactions">View all</Link></div>
        </div>
      </section>
    </div>
  )
}
