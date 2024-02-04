import {Component, OnInit} from '@angular/core';
import {ProductService} from '../products/product.service';
import {ProductClass} from '../products/product.class';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})

export class ProductsAdminComponent implements OnInit {
  productDialog = false;
  products!: ProductClass[];
  product: ProductClass;
  submitted = false;
  statuses!: any[];

  constructor(private productService: ProductService, private router: Router, private messageService: MessageService) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data.data;
      this.statuses = [
        {label: 'INSTOCK', value: 'instock'},
        {label: 'LOWSTOCK', value: 'lowstock'},
        {label: 'OUTOFSTOCK', value: 'outofstock'}
      ];
    });
  }


  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(
      (deletedProduct) => {
        console.log('Product deleted successfully:', deletedProduct);
        // Reload the current route
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
        });
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  editProduct(product: ProductClass) {
    this.product = {...product};
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.products[this.findIndexById(this.product.id)] = this.product;
    this.submitted = true;
    this.products = [...this.products];
    this.productDialog = false;
    this.productService.updateProduct(this.product).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
