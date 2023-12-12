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
            for(let j = 0; j < this._columnas; j++){
                tablero[i][j] = Math.round(Math.random() * 1);
            }
        }
        return tablero;
    }
}

let grid = new tablero(5, 5);

console.log(grid._crearTablero());