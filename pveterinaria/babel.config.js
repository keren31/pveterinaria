// babel.config.js
module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-private-methods',
      '@babel/plugin-proposal-private-property-in-object', // Agregar si es necesario
      '@babel/plugin-proposal-class-properties'
    ]
  };