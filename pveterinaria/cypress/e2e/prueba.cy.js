describe('Página de inicio', () => {
    it('debería cargar correctamente la página principal', () => {
      cy.visit('http://localhost:3000'); // Reemplaza con la URL de tu app
      cy.contains('Se bienvenido!'); // Verifica que contenga el texto 'Bienvenido'
    });
  });