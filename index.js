class Tablero { // Clase que representa un tablero para el Juego de la Vida
    //se cambio la t por una T segun Codacy
    constructor(filas, columnas) { // Constructor que inicializa el tablero con el número de filas y columnas especificado
        this._filas = filas
        this._columnas = columnas
        this._tablero = this._crearTablero()
    }

    _crearTablero() { // Método privado que crea un tablero con celdas aleatorias vivas o muertas
        const tablero = new Array(this._filas)

        for (let i = 0; i < this._filas; i++) {
            tablero[i] = new Array(this._columnas)
            for (let j = 0; j < this._columnas; j++) {
                tablero[i][j] = Math.round(Math.random() * 1)
                // 1 Vivo
                // 0 Muerto
            }
        }
        return tablero
    }

    _imprimirTablero() {
        for (let i = 0; i < this._filas; i++) {
            let linea = ''
            for (let j = 0; j < this._columnas; j++) {
                linea += this._tablero[i][j] ? ' . ' : ' * '
                // Vivo .
                // Muerto
            }
            console.log(linea)
        }
        console.log('\n')
    }

    _reglas() {
        const nuevoTablero = new Array(this._filas)
        for (let i = 0; i < this._filas; i++) {
            nuevoTablero[i] = new Array(this._columnas)

            for (let j = 0; j < this._columnas; j++) {
                const vecinos = this._contarVecino(i, j)
                // Aplica las reglas del Juego de la Vida
                // 1. Cualquier célula viva con menos de dos vecinos vivos muere, como si fuera por falta de población.
                // 2. Cualquier célula viva con más de tres vecinos vivos muere, como si fuera por sobre-población.
                // 3. Cualquier célula viva con dos o tres vecinos vivos sobrevive a la siguiente generación.
                if (this._tablero[i][j] === 1) { //se cambio un doble igual por un triple, segun Codacy
                    nuevoTablero[i][j] = vecinos < 2 || vecinos > 3 ? 0 : 1
                } else {
                    // 4. Cualquier célula muerta con exactamente tres vecinos vivos se convierte en una célula viva.
                    nuevoTablero[i][j] = vecinos === 3 ? 1 : 0
                }
            }
        }
        this._tablero = nuevoTablero
    }

    _contarVecino(x, y) { // Método privado que cuenta el número de vecinos vivos alrededor de una celda
        let vecinos = 0

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const filaVecino = x + i
                const columnaVecino = y + j
                if (
                    filaVecino >= 0 &&
                    filaVecino < this._filas &&
                    columnaVecino >= 0 &&
                    columnaVecino < this._columnas
                ) {
                    vecinos += this._tablero[filaVecino][columnaVecino]
                }
            }
        }
        vecinos -= this._tablero[x][y]
        return vecinos
    }
}
// Ejemplo de uso
const grid = new Tablero(5, 5)
console.log('Primera Generacion \n')
console.log(grid._imprimirTablero())

console.log('Segunda Generacion \n')
grid._reglas()
console.log(grid._imprimirTablero())

module.exports = Tablero
