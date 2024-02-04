import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../products/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.scss']
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: [''],
      image: [''],
      price: [0, Validators.min(0)],
      category: [''],
      quantity: [0, Validators.min(0)],
      inventoryStatus: [''],
      rating: [0, Validators.min(0)],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      this.productService.createProduct(productData).subscribe(
        (createdProduct) => {
          console.log('Product created successfully:', createdProduct);
          this.router.navigate(['/admin']);
        },

        (error) => {
          console.error('Error creating product:', error);
        }
      );

    }
  }
}
