import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
let ProductDetailsComponent = class ProductDetailsComponent {
    constructor(ProductService, route, cartService) {
        this.ProductService = ProductService;
        this.route = route;
        this.cartService = cartService;
        this.product = new Product(); // fix race condition
    }
    ngOnInit() {
        this.route.paramMap.subscribe(() => {
            this.handleProductDetails();
        });
    }
    handleProductDetails() {
        // get the "id" param string, convert string to a number using the "+" symbol.
        const THE_PRODUCT_ID = +this.route.snapshot.paramMap.get("id");
        this.ProductService.getProduct(THE_PRODUCT_ID).subscribe(data => {
            this.product = data;
        });
    }
    addToCart(product) {
        console.log("Adding to cart: " + product.name + " " + product.unitPrice);
        const THE_CART_ITEM = new CartItem(product);
        this.cartService.addToCart(THE_CART_ITEM);
    }
};
ProductDetailsComponent = __decorate([
    Component({
        selector: 'app-product-details',
        templateUrl: './product-details.component.html',
        styleUrls: ['./product-details.component.css']
    })
], ProductDetailsComponent);
export { ProductDetailsComponent };
//# sourceMappingURL=product-details.component.js.map