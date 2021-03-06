import { Component, OnInit } from '@angular/core';

import { ProductService } from './product.service';
import { IProduct } from './product';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  title = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }
  products: IProduct[];
  filteredProducts: IProduct[];
  errorMessage: string;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: (msg) => (this.errorMessage = msg),
    });
  }
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) > -1
    );
  }
  onRatingClicked(message: string): void {
    this.title = 'Product List: ' + message;
  }
}
