//Hola profe voy a ir explicando un poco cada cosa para que quede mas claro
class Bascula {
  constructor() {
    // Array donde se guardan los diferentes pesajes realizados
    this.pesajes = [];
  }

  // Devuelve el número de anotaciones registradas
  ObtenerNumeroAnotaciones() {
    return this.pesajes.length;
  }
    /**
     * @param {number} peso - Peso del paciente en kg 
     * @param {number} altura - Altura en metros 
     *  @param {Date} fecha -Fecha del pesaje 
      */ 
    
 
  anotarPeso(peso, altura = 1, fecha = new Date()) {  //El 1 es po defecto
    this.pesajes.push({ peso, altura, fecha });
  }

  // Devuelve el peso máximo registrado
  obtenerPesoMaximo() {
    if (this.pesajes.length === 0) return null;
    return Math.max(...this.pesajes.map(p => p.peso));
  }

  // Devuelve el peso mínimo registrado
  obtenerPesoMinimo() {
    if (this.pesajes.length === 0) return null;
    return Math.min(...this.pesajes.map(p => p.peso));
  }

  // Calcula el IMC (Índice de Masa Corporal) del último registro
  calcularIMCO() {
    if (this.pesajes.length === 0) return null;
    const ultimo = this.pesajes[this.pesajes.length - 1];
    return ultimo.peso / (ultimo.altura ** 2);
  }

  /**
   * Devuelve la descripción textual del IMC según su rango.
   * @param {number} imc - Valor del índice de masa corporal
   */
  describirIMC(imc) {
    if (imc < 16) return 'Infrapeso (delgadez severa)';
    if (imc >= 16 && imc < 17) return 'Infrapeso (delgadez moderada)';
    if (imc >= 17 && imc < 18.5) return 'Infrapeso (delgadez aceptable)';
    if (imc >= 18.5 && imc < 25) return 'Peso normal';
    if (imc >= 25 && imc < 30) return 'Sobrepeso';
    if (imc >= 30 && imc < 35) return 'Obeso (Tipo I)';
    if (imc >= 35 && imc < 40) return 'Obeso (Tipo II)';
    return 'Obeso (Tipo III)';
  }
}

module.exports = Bascula;
