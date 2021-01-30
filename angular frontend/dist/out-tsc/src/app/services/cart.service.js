import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let CartService = class CartService {
    constructor() {
        this.cartItems = [];
        this.totalPrice = new Subject();
        this.totalQuantity = new Subject();
    }
    addToCart(cartItem) {
        // check if we already have the item in our cart
        let alreadyExsistInCart = false;
        let existingCartItem = undefined;
        if (this.cartItems.length > 0) {
            // find the item in the cart based on item i
            existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id);
            // check if we foun it
            alreadyExsistInCart = (existingCartItem != undefined);
        }
        if (alreadyExsistInCart)
            existingCartItem.quantity++;
        else
            this.cartItems.push(cartItem);
        this.computeCartTotals();
    }
    computeCartTotals() {
        let totalPriceValue = 0;
        let totalQuantityValue = 0;
        for (let currentCartItem of this.cartItems) {
            totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
            totalQuantityValue += currentCartItem.quantity;
        }
        // publish the new values ... all subscribers will receive the new data
        this.totalPrice.next(totalPriceValue);
        this.totalQuantity.next(totalQuantityValue);
        // log cart data just for debugging purposes
        this.logCartData(totalPriceValue, totalQuantityValue);
    }
    logCartData(totalPriceValue, totalQuantityValue) {
        console.log("Contents of the cart");
        for (let temp of this.cartItems) {
            const SUB_TOTAL_PRICE = temp.quantity * temp.unitPrice;
            console.log("name: " + temp.name + " quantity: " + temp.quantity + " unitPrice: " + temp.unitPrice + " SUB_TOTAL_PRICE: " + SUB_TOTAL_PRICE);
        }
        console.log("totalPrice: " + totalPriceValue.toFixed(2) + " totalQuantity: " + totalQuantityValue);
        console.log("<><><><><><>");
    }
    decrementQuantity(cartItem) {
        cartItem.quantity--;
        if (cartItem.quantity === 0)
            this.remove(cartItem);
        else
            this.computeCartTotals();
    }
    remove(cartItem) {
        // get index of item in the array
        const ITEM_INDEX = this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItem.id);
        // if found, remove the item from the array at given index
        if (ITEM_INDEX > -1)
            this.cartItems.splice(ITEM_INDEX, 1);
        this.computeCartTotals();
    }
};
CartService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CartService);
export { CartService };
//# sourceMappingURL=cart.service.js.map