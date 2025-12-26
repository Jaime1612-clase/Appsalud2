const AsciiTable = require('ascii-table');    //Este a sido de los comandos que mas me ha costado descubrirlo y entenderlo pero ha funcionado que es lo importante

function mostrarDiagramaTermometro() {
  const table = new AsciiTable('Termometro');

  table
    .setHeading('Métodos / Atributos')
    .addRow('- temperaturas: Array<Number>')
    .addRow('+ constructor()')
    .addRow('+ anotarTemperatura(temp: Number)')
    .addRow('+ convertirCelsiusAFahrenheit(temp: Number): Number')
    .addRow('+ convertirFahrenheitACelsius(temp: Number): Number')
    .addRow('+ obtenerTemperaturaMaxima(): Number')
    .addRow('+ obtenerTemperaturaMinima(): Number')
    .addRow('+ obtenerNumeroAnotaciones(): Number');

  console.log(table.toString());
}

module.exports = mostrarDiagramaTermometro;
