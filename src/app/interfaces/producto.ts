export interface Producto {
  id?: number; // Opcional (lo puede generar el backend)
  nombre: string;
  precio: number | null;
  categoria: string;
  descripcion: string;
}

