const Tablero = require("./index")

test('Se crea un tablero correctamente', () => {
    const grid = new Tablero(5, 5);
    expect(grid).toBeInstanceOf(Tablero);
    expect(grid._filas).toBe(5);
    expect(grid._columnas).toBe(5);
  });

test('Regla 1: Cualquier célula viva con menos de dos vecinos vivos muere', () => {
  test('Una célula viva con menos de dos vecinos muere en la siguiente generación', () => {
    // Configuración inicial con una célula viva y menos de dos vecinos vivos
    const estadoInicial = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    const grid = new Tablero(5, 5);
    grid._tablero = estadoInicial;

    // Aplicar las reglas para la siguiente generación
    grid._reglas();

    // Verificar que la célula viva ha muerto en la siguiente generación
    expect(grid._tablero[2][2]).toBe(0); // La célula central debe estar muerta (0)
  });
});


