const { expect } = require('chai');
const Termometro = require('../src/Termometro'); //El no poner bien las subcarpetas me daba muchos errores, vaya dolor de cabeza medio y solo tenia que poner "/src/"
const mostrarDiagramaTermometro = require('../mostrarTermometro');

describe('Clase Termometro', () => {
  before(() => {
   
    mostrarDiagramaTermometro();    // Mostrar el diagrama antes de ejecutar las pruebas
  });

  let termometro;

  beforeEach(() => {
    termometro = new Termometro();
  });

  it('Tiene que iniciar con una lista vacía de temperaturas', () => {
    expect(termometro.obtenerNumeroAnotaciones()).to.equal(0);
  });

  it(' Tiene que permitir anotar una temperatura', () => {
    termometro.anotarTemperatura(37.5);
    expect(termometro.obtenerNumeroAnotaciones()).to.equal(1);
  });
});
