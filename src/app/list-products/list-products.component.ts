import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';  // Importar Router

import { Producto } from '../interfaces/producto';
import { ProductoService } from '../servicios/producto.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    ConfirmDialogModule
  ],
  providers: [ProductoService, ConfirmationService],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent implements OnInit {
  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private confirmationService: ConfirmationService,
    private router: Router  // Inyectar Router
  ) {}

  ngOnInit(): void {
    this.productoService.listar().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  editarProducto(producto: Producto) {
    // Navegar a la ruta de edición con el id del producto
    this.router.navigate(['/product', producto.id]);
  }

  eliminarProducto(id: number) {
    this.confirmationService.confirm({
      message: '¿Desea eliminar el producto?',
      accept: () => {
        this.productoService.eliminar(id).subscribe({
          next: () => {
            this.productos = this.productos.filter(p => p.id !== id);
            console.log('Producto eliminado con éxito');
          },
          error: (err) => console.error('Error al eliminar el producto', err)
        });
      }
    });
  }
}
