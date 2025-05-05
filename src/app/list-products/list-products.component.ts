import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { Producto } from '../interfaces/producto';
import { ProductoService } from '../servicios/producto.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    HttpClientModule
  ],
  providers: [ProductoService], // <- AÑADIR ESTO
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.listar().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  editarProducto(producto: Producto) {
    console.log('Editar producto:', producto);
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
    this.productos = [...this.productos];
  }
}
