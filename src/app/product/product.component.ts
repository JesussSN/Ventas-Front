import { Component, EventEmitter, Output, OnInit } from '@angular/core';
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
import { Producto } from '../interfaces/producto';
import { ActivatedRoute, Router } from '@angular/router';

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
  providers: [ProductoService, MessageService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  categorias = [
    { label: 'Producto de belleza', value: 'Belleza' },
    { label: 'Producto electrónico', value: 'Electronica' },
    { label: 'Producto deportivo', value: 'Deportes' }
  ];

  producto: Producto = this.nuevoProducto();
  modoEdicion: boolean = false;
  @Output() productoActualizado = new EventEmitter<void>();

  constructor(
    private productoService: ProductoService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productoId = this.route.snapshot.paramMap.get('id');
    if (productoId) {
      this.modoEdicion = true;
      this.cargarProducto(Number(productoId));
    }
  }

  cargarProducto(id: number): void {
    this.productoService.listar().subscribe({
      next: (productos) => {
        this.producto = productos.find(p => p.id === id) || this.nuevoProducto();
      },
      error: (error) => console.error('Error al cargar el producto:', error)
    });
  }

  agregarProducto() {
    this.producto.id = null;
    this.productoService.crear(this.producto).subscribe({
      next: () => {
        this.mostrarMensaje('Se agregó un nuevo producto al inventario');
        this.limpiarFormulario();
        this.productoActualizado.emit();
        
        setTimeout(() => {
          this.router.navigate(['/listProducts']);
        }, 1000); 
      },
      error: (error) => console.error('Error al crear el producto:', error)
    });
  }

  actualizarProducto() {
    this.productoService.actualizar(this.producto).subscribe({
    next: () => {
      this.mostrarMensaje('Producto actualizado correctamente');
      this.modoEdicion = false;
      this.limpiarFormulario();
      this.productoActualizado.emit();

        setTimeout(() => {
          this.router.navigate(['/listProducts']);
        }, 1000); 
      },
      error: (error) => console.error('Error al actualizar el producto:', error)
    });
  }


  limpiarFormulario() {
    this.producto = this.nuevoProducto();
  }

  mostrarMensaje(mensaje: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: mensaje
    });
  }

  private nuevoProducto(): Producto {
    return {
      id: 0,
      nombre: '',
      precio: 0,
      categoria: '',
      descripcion: '',
      createAt: new Date(),
      stock: 0
    };
  }
}
