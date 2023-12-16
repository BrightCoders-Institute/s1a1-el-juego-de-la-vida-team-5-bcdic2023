const Tablero = require('./index')

test('Se crea un tablero correctamente', () => {
  const grid = new Tablero(5, 5)
  expect(grid).toBeInstanceOf(Tablero)
  expect(grid._filas).toBe(5)
  expect(grid._columnas).toBe(5)
})

test('verifica que el método _contarVecino cuente correctamente los vecinos', () => {
  const grid = new Tablero(3, 3)
  grid._tablero = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1]
  ]

  expect(grid._contarVecino(1, 1)).toBe(4) // El centro debería tener 4 vecinos
  expect(grid._contarVecino(0, 0)).toBe(1) // La esquina superior izquierda debería tener 1 vecino
  // Agrega más expectativas según tus necesidades
})

describe('Regla 1 : Cualquier célula viva con menos de dos vecinos vivos muere', () => {
  test('Una célula viva con menos de dos vecinos muere en la siguiente generación', () => {
    // Configuración inicial con una célula viva y menos de dos vecinos vivos
    const estadoInicial = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]

    const grid = new Tablero(5, 5)
    grid._tablero = estadoInicial

    // Aplicar las reglas para la siguiente generación
    grid._reglas()

    // Verificar que la célula viva ha muerto en la siguiente generación
    expect(grid._tablero[2][2]).toBe(0) // La célula central debe estar muerta (0)
  })

  describe('Regla 2: Cualquier célula viva con más de tres vecinos vivos muere', () => {
    test('Una célula viva con más de tres vecinos muere en la siguiente generación', () => {
      // Configuración inicial con una célula viva y más de tres vecinos vivos
      const estadoInicial = [
        [1, 1, 1, 0, 0],
        [1, 1, 1, 0, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ]

      const grid = new Tablero(5, 5)
      grid._tablero = estadoInicial

      // Aplicar las reglas para la siguiente generación
      grid._reglas()

      // Verificar que la célula viva ha muerto en la siguiente generación
      expect(grid._tablero[2][2]).toBe(0) // La célula central debe estar muerta (0)
    })
  })
})

describe('Regla 3: Cualquier célula viva con dos o tres vecinos vivos sobrevive', () => {
  test('Una célula viva con dos vecinos sobrevive en la siguiente generación', () => {
    // Configuración inicial con una célula viva y dos vecinos vivos
    const estadoInicial = [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]

    const grid = new Tablero(5, 5)
    grid._tablero = estadoInicial

    // Aplicar las reglas para la siguiente generación
    grid._reglas()

    // Verificar que la célula viva ha sobrevivido en la siguiente generación
    expect(grid._tablero[1][1]).toBe(1) // La célula central debe estar viva (1)
  })

  test('Una célula viva con tres vecinos sobrevive en la siguiente generación', () => {
    // Configuración inicial con una célula viva y tres vecinos vivos
    const estadoInicial = [
      [1, 1, 1, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]

    const grid = new Tablero(5, 5)
    grid._tablero = estadoInicial

    // Aplicar las reglas para la siguiente generación
    grid._reglas()

    // Verificar que la célula viva ha sobrevivido en la siguiente generación
    expect(grid._tablero[1][2]).toBe(1) // La célula central debe estar viva (1)
  })
})

describe('Regla 4: Cualquier célula muerta con exactamente tres vecinos vivos se convierte en una célula viva', () => {
  test('Una célula muerta con tres vecinos vivos se convierte en viva en la siguiente generación', () => {
    // Configuración inicial con una célula muerta y tres vecinos vivos
    const estadoInicial = [
      [0, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]

    const grid = new Tablero(5, 5)
    grid._tablero = estadoInicial

    // Aplicar las reglas para la siguiente generación
    grid._reglas()

    // Verificar que la célula muerta se ha convertido en viva en la siguiente generación
    expect(grid._tablero[0][0]).toBe(1) // La célula central debe estar viva (1)
  })
})
