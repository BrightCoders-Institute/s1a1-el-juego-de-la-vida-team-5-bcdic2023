class tablero {
    constructor(filas, columnas) {
        this._filas = filas;
        this._columnas = columnas;
        this._tablero = this._crearTablero();
    }

    _crearTablero() {
        const tablero = new Array(this._filas);

        for (let i = 0; i < this._filas; i++) {
            tablero[i] = new Array(this._columnas);
            for (let j = 0; j < this._columnas; j++) {
                tablero[i][j] = Math.round(Math.random() * 1);
                //1 Vivo
                //0 Muerto
            }
        }
        return tablero;
    }

    _imprimirTablero() {
        for (let i = 0; i < this._filas; i++) {
            let linea = '';
            for (let j = 0; j < this._columnas; j++) {
                linea += this._tablero[i][j] ? ' . ' : ' * ';
                //Vivo .
                //Muerto
            }
            console.log(linea);
        }
        console.log('\n');
    }

    _reglas() {
        const nuevoTablero = new Array(this._filas);
        for (let i = 0; i < this._filas; i++) {
            nuevoTablero[i] = new Array(this._columnas);

            for (let j = 0; j < this._columnas; j++) {
                const vecinos = this._contarVecino(i, j);

                //1. Cualquier célula viva con menos de dos vecinos vivos muere, como si fuera por falta de población.
                //2. Cualquier célula viva con más de tres vecinos vivos muere, como si fuera por sobre-población.
                //3. Cualquier célula viva con dos o tres vecinos vivos sobrevive a la siguiente generación.
                if (this._tablero[i][j] == 1) {
                    nuevoTablero[i][j] = vecinos < 2 || vecinos > 3 ? 0 : 1;
                }
                else {
                    //4. Cualquier célula muerta con exactamente tres vecinos vivos se convierte en una célula viva.

                    nuevoTablero[i][j] = vecinos === 3 ? 1 : 0;
                }
            }
        }
        this._tablero = nuevoTablero;
    }

    _contarVecino(x, y) {
        let vecinos = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const filaVecino = x + i;
                const columnaVecino = y + j;
                if (filaVecino >= 0 && filaVecino < this._filas && columnaVecino >= 0 && columnaVecino < this._columnas) {
                    vecinos += this._tablero[filaVecino][columnaVecino];
                }
            }
        }
        vecinos -= this._tablero[x][y];
        return vecinos;
    }
}

let grid = new tablero(5, 5);
console.log("Primera Generacion \n")
//console.log(grid._imprimirTablero())
console.log(grid._tablero);

console.log("Segunda Generacion \n")
grid._reglas()
//console.log(grid._imprimirTablero())
console.log(grid._tablero);