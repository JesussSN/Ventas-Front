export interface Producto {
  id?: number | null;
  nombre: string;
  precio: number | null;
  categoria: string;
  descripcion: string;
  createAt?: Date;
  stock?: number;
}

