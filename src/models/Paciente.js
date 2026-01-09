const Bascula = require('./Bascula');
class Paciente {
  constructor(id, nombre, apellidos, fechaNacimiento, peso = null, temperatura = null) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.miBascula = null;
    this.peso = peso !== undefined ? peso : null;
    this.temperatura = temperatura !== undefined ? temperatura : null;

    // Parsing de fecha - acepta strings y objetos Date
    let fecha = null;
    if (fechaNacimiento) {
      try {
        if (typeof fechaNacimiento === 'string') {
          fecha = new Date(fechaNacimiento + 'T00:00:00Z');
          if (isNaN(fecha.getTime())) {
            const parts = fechaNacimiento.split('-');
            if (parts.length === 3) {
              fecha = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
            }
          }
        } else {
          fecha = new Date(fechaNacimiento);
        }
        // Validación básica
        if (isNaN(fecha.getTime())) {
          fecha = null;
        }
      } catch (e) {
        fecha = null;
      }
    }
    this.fechaNacimiento = fecha;

    // Se asocia una báscula por defecto
    this.bascula = new Bascula();
  }

  // Devuelve un saludo personalizado
  saludar() {
    return `Hola, soy ${this.nombre} ${this.apellidos}`;
  }

  
  obtenerNombre() { return this.nombre; }
  modificarNombre(nombre) { this.nombre = nombre; }

 
  obtenerApellidos() { return this.apellidos; }
  modificarApellidos(apellidos) { this.apellidos = apellidos; }

 
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

  calcularIMC() {
    // Si tienes una instancia de Bascula asociada
    if (this.miBascula && typeof this.miBascula.calcularIMC === 'function') {
      return this.miBascula.calcularIMC();
    }
    // Si usas el modelo Bascula directamente
    return Bascula.calcularIMC();
  }
}

module.exports = Paciente;
