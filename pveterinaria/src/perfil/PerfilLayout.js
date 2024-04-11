import React from 'react'
import AsidePerfil from './AsidePerfil'

export default function     PerfilLayout({children}) {
  return (
    <div style={{display: "flex", marginTop:'60px'}}> 
      <AsidePerfil/>
      {children}
      </div>
  )
}
