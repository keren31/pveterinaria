import React from 'react'

import AdminLayout from './AdminLayout'

import PedidosGeneral from './Pedidos_Admin'



function HomeAdmin() {
  return (
    <AdminLayout>
            <PedidosGeneral /> {/* Incluye PedidosGeneral dentro del AdminLayout */}

      
    </AdminLayout>
  )
}

export default HomeAdmin
