const assert = require('chai').assert;
const Paciente = require('../src/Paciente');
const Bascula = require('../src/Bascula');

describe('Clase Paciente', function() {
  let paciente;

  beforeEach(function() {
    paciente = new Paciente('Jaime', 'Carrasco', '1990-05-15');
  });

  it('se debe saludar correctamente', function() {
    assert.equal(paciente.saludar(), 'Hola, soy Jaime Carrasco');
  });

  it('se necesita obtener el nombre correctamente', function() {
    assert.equal(paciente.obtenerNombre(), 'Jaime');
  });

  it('se necesita modificar el nombre correctamente', function() {
    paciente.modificarNombre('Carlos');
    assert.equal(paciente.obtenerNombre(), 'Carlos');
  });

  it('se necesita obtener los apellidos correctamente', function() {
    assert.equal(paciente.obtenerApellidos(), 'Carrasco');
  });

  it('se necesita modificar los apellidos correctamente', function() {
    paciente.modificarApellidos('Gómez');
    assert.equal(paciente.obtenerApellidos(), 'Gómez');
  });

  it('se necesita obtener la fecha de nacimiento correctamente', function() {
    assert.deepEqual(paciente.obtenerFechaNacimiento(), new Date('1990-05-15'));
  });

  it('se necesita modificar la fecha de nacimiento correctamente', function() {
    paciente.modificarFechaNacimiento('2000-01-01');
    assert.deepEqual(paciente.obtenerFechaNacimiento(), new Date('2000-01-01'));
  });

  it('se necesita asociar una báscula correctamente', function() {
    const bascula = new Bascula();
    paciente.modificarBascula(bascula);
    assert.equal(paciente.obtenerBascula(), bascula);
  });

  it('se necesita calcular correctamente la edad actual del paciente', function() {
    const edad = paciente.obtenerEdad();
    const hoy = new Date();
    const fechaNac = new Date('1990-05-15');
    let edadEsperada = hoy.getFullYear() - fechaNac.getFullYear();
    const m = hoy.getMonth() - fechaNac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
      edadEsperada--;
    }
    assert.equal(edad, edadEsperada);
  });

  it('se necesita que la edad sea un número mayor que 0', function() {
    const edad = paciente.obtenerEdad();
    assert.isAbove(edad, 0);
  });

  it('se necesita actualizar la edad si se cambia la fecha de nacimiento', function() {
    paciente.modificarFechaNacimiento('2005-11-06');
    const edad = paciente.obtenerEdad();

    const hoy = new Date();
    const fechaNac = new Date('2005-11-06');
    let edadEsperada = hoy.getFullYear() - fechaNac.getFullYear();
    const m = hoy.getMonth() - fechaNac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
      edadEsperada--;
    }

    assert.equal(edad, edadEsperada);
  });

  it('se necesita manejar correctamente pacientes nacidos el mismo día y mes que hoy', function() {
    const hoy = new Date();
    const añoNacimiento = hoy.getFullYear() - 25;
    const fecha = `${añoNacimiento}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
    const p = new Paciente('María', 'López', fecha);
    assert.equal(p.obtenerEdad(), 25);
  });

  it('se necesita lanzar un error si la fecha de nacimiento es inválida', function() {
    assert.throws(() => new Paciente('Luis', 'Santos', 'fecha-invalida'), Error);
  });

  it('se necesita calcular correctamente el IMCO del paciente', function() {
    const bascula = new Bascula();
    bascula.anotarPeso(72, 1.80);
    paciente.modificarBascula(bascula);
    const imco = paciente.calcularIMCO();
    assert.closeTo(imco, 22.22, 0.01);
  });
});
