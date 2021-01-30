import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CartDetailsComponent = class CartDetailsComponent {
    constructor(cartService) {
        this.cartService = cartService;
        this.cartItems = [];
        this.totalPrice = 0;
        this.totalQuantity = 0;
    }
    ngOnInit() {
        this.listCartDetails();
    }
    listCartDetails() {
        // get a handle to the cart items
        this.cartItems = this.cartService.cartItems;
        // subscribe to the cart totalPrice and totalQuantity
        this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
        this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
        // compute cart total price and quantity
        this.cartService.computeCartTotals();
    }
    incrementQuality(cartItem) {
        this.cartService.addToCart(cartItem);
    }
    decrementQuantity(cartItem) {
        this.cartService.decrementQuantity(cartItem);
    }
    remove(cartItem) {
        this.cartService.remove(cartItem);
    }
};
CartDetailsComponent = __decorate([
    Component({
        selector: 'app-cart-details',
        templateUrl: './cart-details.component.html',
        styleUrls: ['./cart-details.component.css']
    })
], CartDetailsComponent);
export { CartDetailsComponent };
//# sourceMappingURL=cart-details.component.js.map