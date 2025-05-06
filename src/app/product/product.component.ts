import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';      // Importar PrimeNG módulos
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DropdownModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  categorias = [
    { label: 'Producto de belleza', value: 'Producto de belleza' },
    { label: 'Producto electrónico', value: 'Producto electrónico' },
    { label: 'Producto deportivo', value: 'Producto deportivo' }
  ];
  
  producto = {
    nombre: '',
    precio: null,
    categoria: '',
    descripcion: ''
  };

  // Método que se ejecuta al enviar el formulario
  agregarProducto() {
    console.log('Producto agregado:', this.producto);
    
    this.producto = {
      nombre: '',
      precio: null,
      categoria: '',
      descripcion: ''
    };
  }
}
