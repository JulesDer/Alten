import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {ProductsAdminComponent} from './products-admin/products-admin.component';
import {ProductCreateComponent} from './product-create/product-create.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'admin', component: ProductsAdminComponent },
  { path: 'admin/create', component: ProductCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})

export class AppRoutingModule {}
