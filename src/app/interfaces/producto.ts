export interface Producto {
  id?: number;
  nombre: string;
  precio: number | null;
  categoria: string;
  descripcion: string;
  createAt?: Date; // Cambiado a Date
}

