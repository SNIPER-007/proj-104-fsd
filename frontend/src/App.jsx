import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Stocks from './pages/Stocks'
import Watchlist from './pages/Watchlist'
import Transactions from './pages/Transactions'
import Requests from './pages/Requests'
import Market from './pages/Market'
import Admin from './pages/Admin'
import Auth from './pages/Auth'
import AuthContext from './contexts/AuthContext'

function AuthButton(){
  const { user, logout } = useContext(AuthContext)
  if(user) return <button onClick={logout}>Logout</button>
  return <Link to="/auth">Login / Sign up</Link>
}

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{padding:10,display:'flex',gap:12,alignItems:'center',background:'#0f1724',color:'#fff'}}>
        <div style={{fontWeight:700,marginRight:12}}>StockTracker</div>
        <Link to="/">Dashboard</Link>
        <Link to="/stocks">Stocks</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/requests">Requests</Link>
        <Link to="/market">Market</Link>
        <AuthButton />
        <Link to="/admin">Admin</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/market" element={<Market />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
