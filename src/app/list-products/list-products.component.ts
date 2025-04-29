import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {
  productos = [
    {
      nombre: 'Laptop Dell',
      precio: 1200,
      categoria: 'Electrónica',
      descripcion: 'Laptop con 16GB RAM y 512GB SSD'
    },
    {
      nombre: 'Silla ergonómica',
      precio: 350,
      categoria: 'Muebles',
      descripcion: 'Silla con soporte lumbar ajustable'
    },
    {
      nombre: 'Auriculares Bluetooth',
      precio: 89.99,
      categoria: 'Accesorios',
      descripcion: 'Auriculares con cancelación de ruido'
    }
  ];

  editarProducto(producto: any) {
    console.log('Editar producto:', producto);
    // Aquí podrías abrir un diálogo o navegar a un formulario
  }
  
  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
    this.productos = [...this.productos]; // Forzar actualización en la tabla
  }
  
}
