const Tablero = require("./index")

test('Se crea un tablero correctamente', () => {
    const grid = new Tablero(5, 5);
    expect(grid).toBeInstanceOf(Tablero);
    expect(grid._filas).toBe(5);
    expect(grid._columnas).toBe(5);
  });

test('verifica que el método _contarVecino cuente correctamente los vecinos', () => {
    const grid = new Tablero(3, 3);
    grid._tablero = [
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
    ];

    expect(grid._contarVecino(1, 1)).toBe(4); // El centro debería tener 4 vecinos
    expect(grid._contarVecino(0, 0)).toBe(1); // La esquina superior izquierda debería tener 1 vecino
    // Agrega más expectativas según tus necesidades
});

describe('Regla: Cualquier célula viva con menos de dos vecinos vivos muere', () => {
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

  describe('Regla 2: Cualquier célula viva con más de tres vecinos vivos muere', () => {
    test('Una célula viva con más de tres vecinos muere en la siguiente generación', () => {
    // Configuración inicial con una célula viva y más de tres vecinos vivos
    const estadoInicial = [
    [1, 1, 1, 0, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 1, 1, 0],
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
});


