const Bascula = require('./Bascula');
class Paciente {
  constructor(nombre, apellidos, fechaNacimiento) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.fechaNacimiento = fechaNacimiento;

    // Validación de fecha
    const fecha = new Date(fechaNacimiento);
    if (isNaN(fecha.getTime())) {
      throw new Error('Fecha de nacimiento inválida');
    }
    this.fechaNacimiento = fecha;

    // Se asocia una báscula por defecto
    this.bascula = new Bascula();
  }

  // Devuelve un saludo personalizado
  saludar() {
    return `Hola, soy ${this.nombre} ${this.apellidos}`;
  }

  // Métodos de nombre
  obtenerNombre() { return this.nombre; }
  modificarNombre(nombre) { this.nombre = nombre; }

  // Métodos de apellidos
  obtenerApellidos() { return this.apellidos; }
  modificarApellidos(apellidos) { this.apellidos = apellidos; }

  // Métodos de fecha de nacimiento
  obtenerFechaNacimiento() { return this.fechaNacimiento; }

  modificarFechaNacimiento(fecha) {
    const nuevaFecha = new Date(fecha);
    if (isNaN(nuevaFecha.getTime())) {
      throw new Error('Fecha de nacimiento inválida');
    }
    this.fechaNacimiento = nuevaFecha;
  }

  // Calcula la edad actual del paciente
  obtenerEdad() {
    const hoy = new Date();
    let edad = hoy.getFullYear() - this.fechaNacimiento.getFullYear();
    const m = hoy.getMonth() - this.fechaNacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < this.fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  // Asociación con la báscula
  modificarBascula(bascula) { this.bascula = bascula; }
  obtenerBascula() { return this.bascula; }

  // Calcula el IMC delegando la operación a la báscula
  calcularIMCO() {
    return this.bascula.calcularIMCO();
  }
}

module.exports = Paciente;
