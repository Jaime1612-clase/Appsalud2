class Termometro {
  constructor() {
    this.temperaturas = [];
  }

  anotarTemperatura(temp) {
    if (typeof temp !== 'number' || isNaN(temp)) {          // Añade una nueva temperatura al registro
      throw new Error('La temperatura debe ser un número válido');
    }
    this.temperaturas.push(temp);
  }

 
  convertirCelsiusAFahrenheit(temp) {
    if (typeof temp !== 'number') throw new Error('Valor inválido');     // Convierte de Celsius a Fahrenheit
    return (temp * 9) / 5 + 32;
  }

 
  convertirFahrenheitACelsius(temp) {
    if (typeof temp !== 'number') throw new Error('Valor inválido');    // Convierte de Fahrenheit a Celsius
    return ((temp - 32) * 5) / 9;
  }

 
  obtenerTemperaturaMaxima() {
    if (this.temperaturas.length === 0) return null;    // Devuelve la temperatura máxima registrada
    return Math.max(...this.temperaturas);
  }

  
  obtenerTemperaturaMinima() {
    if (this.temperaturas.length === 0) return null;    // Devuelve la temperatura mínima registrada
    return Math.min(...this.temperaturas);
  }

  
  obtenerNumeroAnotaciones() {
    return this.temperaturas.length;                        // Devuelve el número total de temperaturas anotadas
  }
}

module.exports = Termometro;
