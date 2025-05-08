import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProductoService } from '../servicios/producto.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DropdownModule,
    HttpClientModule,
    ToastModule
  ],
  providers: [ProductoService,MessageService],
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
    descripcion: '',
    createAt: new Date() // Asegúrate que el backend lo requiere
  };

  constructor(private productoService: ProductoService,  private messageService: MessageService) {}

  agregarProducto() {
    this.productoService.crear(this.producto).subscribe({
      next: (respuesta) => {
        console.log('Producto creado con éxito:', respuesta);
  
        // Mostrar mensaje de éxito
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Se agregó un nuevo producto al inventario'
        });
  
        // Resetear formulario
        this.producto = {
          nombre: '',
          precio: null,
          categoria: '',
          descripcion: '',
          createAt: new Date()
        };
      },
      error: (error) => {
        console.error('Error al crear el producto:', error);
      }
    });
  }
  
}
