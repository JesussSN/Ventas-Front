import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';

import { Producto } from '../interfaces/producto';
import { ProductoService } from '../servicios/producto.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    ConfirmDialogModule,
    FormsModule,
    InputTextModule,
    DropdownModule
  ],
  providers: [ProductoService, ConfirmationService],
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  filtroNombre: string = '';
  filtroCategoria: string = '';
  categorias: SelectItem[] = [];

  constructor(
    private productoService: ProductoService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productoService.listar().subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = [...this.productos]; // Copia para filtrar

        // Crear lista de categorías únicas para el dropdown
        const categoriasUnicas = Array.from(new Set(data.map(p => p.categoria)));
        this.categorias = categoriasUnicas.map(cat => ({ label: cat, value: cat }));
      },
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  filtrarProductos(): void {
    const filtroNombre = this.filtroNombre.toLowerCase().trim();
    this.productosFiltrados = this.productos.filter(producto => {
      const cumpleNombre = producto.nombre.toLowerCase().includes(filtroNombre);
      const cumpleCategoria = this.filtroCategoria ? producto.categoria === this.filtroCategoria : true;
      return cumpleNombre && cumpleCategoria;
    });
  }

  editarProducto(producto: Producto): void {
    this.router.navigate(['/product', producto.id]);
  }

  eliminarProducto(id: number): void {
    this.confirmationService.confirm({
      message: '¿Desea eliminar el producto?',
      accept: () => {
        this.productoService.eliminar(id).subscribe({
          next: () => {
            this.productos = this.productos.filter(p => p.id !== id);
            this.filtrarProductos(); // Actualiza también la lista filtrada
            console.log('Producto eliminado con éxito');
          },
          error: (err) => console.error('Error al eliminar el producto', err)
        });
      }
    });
  }
}
