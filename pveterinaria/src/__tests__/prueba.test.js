// Ejemplo de la función a probar
function miFuncion() {
    return true;
  }
  
  // Prueba unitaria con Jest
  test('miFuncion debería retornar true', () => {
    const resultado = miFuncion();
    expect(resultado).toBe(true);
  });
  