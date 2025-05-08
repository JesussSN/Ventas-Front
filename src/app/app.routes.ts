import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './layout/layout.component';  // Importa el LayoutComponent
import { ProductComponent } from './product/product.component';
import { ListProductsComponent } from './list-products/list-products.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'product', component: ProductComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'listProducts', component: ListProductsComponent },
  ] },
  { path: '**', redirectTo: '/login' }
];
