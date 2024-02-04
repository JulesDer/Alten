import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from './product.service';
import {ProductClass} from './product.class';
import {SelectItem} from 'primeng/api';
import {Table} from 'primeng/table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  @ViewChild('dt') dt: Table | undefined;

  products!: ProductClass[];
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  selectedSortOption: string;


  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data.data;
    });
    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
    ];
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
