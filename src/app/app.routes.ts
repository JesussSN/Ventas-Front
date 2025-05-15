import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductComponent } from './product/product.component';
import { ListProductsComponent } from './list-products/list-products.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/registro/registro.component').then(m => m.RegistroComponent)
  },
  {
    path: 'restablecer',
    loadComponent: () =>
      import('./pages/restablecer-contrasena/restablecer-contrasena.component').then(m => m.RestablecerContrasenaComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'product', component: ProductComponent },
      { path: 'product/:id', component: ProductComponent },
      { path: 'listProducts', component: ListProductsComponent },
    ]
  },

  { path: '**', redirectTo: '/login' }
];
