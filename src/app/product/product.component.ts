import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';      // Importar PrimeNG módulos
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  // El objeto que enlazamos al formulario
  producto = {
    nombre: '',
    precio: null,
    categoria: '',
    descripcion: ''
  };

  // Método que se ejecuta al enviar el formulario
  agregarProducto() {
    console.log('Producto agregado:', this.producto);

    // Aquí podrías luego llamar un servicio para guardar el producto en la base de datos
    // Ejemplo:
    // this.productoService.guardarProducto(this.producto).subscribe(...);

    // Limpiar el formulario después de agregar
    this.producto = {
      nombre: '',
      precio: null,
      categoria: '',
      descripcion: ''
    };
  }
}
