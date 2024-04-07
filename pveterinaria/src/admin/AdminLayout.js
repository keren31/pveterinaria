import React from 'react'
import AsideAdmin from './Aside'

export default function AdminLayout({children}) {
  return (
    <div style={{display: "flex"}}> 
      <AsideAdmin/>
      {children}
      </div>
  )
}
