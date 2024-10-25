import React from 'react'
import PropTypes from 'prop-types';
import AsideAdmin from './Aside'

export default function AdminLayout({children}) {
  return (
    <div style={{display: "flex"}}> 
      <AsideAdmin/>
      {children}
      </div>
  )
}
// Agrega la validación de las props
AdminLayout.propTypes = {
  children: PropTypes.node.isRequired, // Define que 'children' es un nodo de React y es requerido
};