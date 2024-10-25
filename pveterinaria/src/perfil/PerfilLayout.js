import React from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes para la validación de props
import AsidePerfil from './AsidePerfil';

export default function PerfilLayout({ children }) {
  return (
    <div style={{ display: "flex", marginTop: '60px' }}>
      <AsidePerfil />
      {children}
    </div>
  );
}

// Validación de las propiedades con PropTypes
PerfilLayout.propTypes = {
  children: PropTypes.node.isRequired, // Define que children debe ser un nodo y es requerido
};
