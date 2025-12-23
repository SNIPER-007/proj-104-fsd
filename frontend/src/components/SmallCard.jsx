import React from 'react'
export default function SmallCard({title, value, muted}){
  return (
    <div className="card">
      <h3 style={{margin:0}}>{title}</h3>
      <div style={{fontSize:20,fontWeight:700,marginTop:8}}>{value}</div>
      {muted && <div style={{color:'#6b7280',marginTop:6}}>{muted}</div>}
    </div>
  )
}
