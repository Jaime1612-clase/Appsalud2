//HOLA PROFE
const assert = require('chai').assert;
const Bascula = require('../src/Bascula');

describe('Clase Bascula', function() {
  let bascula;

  beforeEach(function() {
    bascula = new Bascula();
  });

  it('se debe iniciar sin anotaciones', function() {
    assert.equal(bascula.ObtenerNumeroAnotaciones(), 0);
  });

  it('se necesita anotar un peso y aumentar el número de anotaciones', function() {
    bascula.anotarPeso(72, 1.80); // Usaré más reales para que cuadre mejor: una persona deportista de 72 kg y 1,80 m
    assert.equal(bascula.ObtenerNumeroAnotaciones(), 1);
  });

  it('se necesita calcular el peso máximo correctamente', function() {
    bascula.anotarPeso(72);
    bascula.anotarPeso(70);
    assert.equal(bascula.obtenerPesoMaximo(), 72);
  });

  it('se necesita calcular el peso mínimo correctamente', function() {
    bascula.anotarPeso(72);
    bascula.anotarPeso(70);
    assert.equal(bascula.obtenerPesoMinimo(), 70);
  });

  it('se necesita calcular el IMC de la última anotación correctamente', function() {
    bascula.anotarPeso(72, 1.80);
    const imc = bascula.calcularIMCO();
    assert.closeTo(imc, 22.22, 0.01); // Esto es básicamente el margen de error
  });

  it('se necesita describir el IMC de infrapeso severo', function() {
    assert.equal(bascula.describirIMC(15), 'Infrapeso (delgadez severa)');
  });

  it('se necesita describir el IMC de infrapeso moderado', function() {
    assert.equal(bascula.describirIMC(16), 'Infrapeso (delgadez moderada)');
  });

  it('se necesita describir el IMC de infrapeso aceptable', function() {
    assert.equal(bascula.describirIMC(17), 'Infrapeso (delgadez aceptable)');
  });

  it('se necesita describir el IMC de peso normal', function() {
    assert.equal(bascula.describirIMC(22), 'Peso normal');
  });

  it('se necesita describir el IMC del paciente con obesidad Tipo I', function() {
    assert.equal(bascula.describirIMC(32), 'Obeso (Tipo I)');
  });

  it('se necesita describir el IMC del paciente con obesidad Tipo II', function() {
    assert.equal(bascula.describirIMC(39), 'Obeso (Tipo II)');
  });

  it('se necesita describir el IMC del paciente Tipo III', function() {
    assert.equal(bascula.describirIMC(42), 'Obeso (Tipo III)');
  });
});
