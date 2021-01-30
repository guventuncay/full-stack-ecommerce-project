import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();// fix race condition

  constructor(private ProductService: ProductService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  handleProductDetails() {

    // get the "id" param string, convert string to a number using the "+" symbol.
    const THE_PRODUCT_ID: number = +this.route.snapshot.paramMap.get("id");

    this.ProductService.getProduct(THE_PRODUCT_ID).subscribe(
      data => {
        this.product = data;
      }
    )

  }

  addToCart(product: Product) {
    console.log("Adding to cart: " + product.name + " " + product.unitPrice);

    const THE_CART_ITEM = new CartItem(product);

    this.cartService.addToCart(THE_CART_ITEM);
  }
}
