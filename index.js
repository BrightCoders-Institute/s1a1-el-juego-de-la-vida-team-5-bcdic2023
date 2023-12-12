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
                //1 celulas vivas
                //0 celulas muertas
            }
        }
        return tablero;
    }

    _imprimirTablero() {
        for (let i = 0; i < this._filas; i++) {
            let linea = '';
            for (let j = 0; j < this._columnas; j++) {
                linea += this._tablero[i][j] ? ' . ' : ' * ';
            }
            console.log(linea);
        }
        console.log('\n');
    }

    
}

let grid = new tablero(5, 5);
console.log(grid._imprimirTablero());