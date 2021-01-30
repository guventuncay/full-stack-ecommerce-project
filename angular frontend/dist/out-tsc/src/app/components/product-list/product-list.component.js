import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
let ProductListComponent = class ProductListComponent {
    constructor(productService, route, cartService) {
        this.productService = productService;
        this.route = route;
        this.cartService = cartService;
        this.products = [];
        this.currentCategoryId = 1;
        this.previousCategoryId = 1;
        this.searchMode = false;
        // pagination properties
        this.pageNumber = 1;
        this.pageSize = 10;
        this.totalElements = 0;
        this.previousKeyword = null;
    }
    ngOnInit() {
        this.route.paramMap.subscribe(() => {
            this.listProducts();
        });
    }
    // check if "id" parameter is available
    listProducts() {
        this.searchMode = this.route.snapshot.paramMap.has('keyword');
        if (this.searchMode)
            this.handleSearchProducts();
        else
            this.handleListProducts();
    }
    handleListProducts() {
        const HAS_CATEGORY_ID = this.route.snapshot.paramMap.has("id");
        if (HAS_CATEGORY_ID)
            // get the "id" param string. convert string to a number using the "+" symbol
            this.currentCategoryId = +this.route.snapshot.paramMap.get("id");
        else
            // not category id acailable ... default to category id 1
            this.currentCategoryId = 1;
        // check if we have a different category than previous
        // note: Angular will reuse a component if it is currently being viewed
        // if we have a different category id than previous
        // then set pageNumber back to 1
        if (this.previousCategoryId != this.currentCategoryId)
            this.pageNumber = 1;
        this.previousCategoryId = this.currentCategoryId;
        console.log("currentCategoryId: " + this.currentCategoryId + "pageNumber: " + this.pageNumber);
        this.productService.getProductListPaginate(this.pageNumber - 1, this.pageSize, this.currentCategoryId).subscribe(this.processResult());
    }
    processResult() {
        return data => {
            this.products = data._embedded.products;
            this.pageNumber = data.page.number + 1;
            this.pageSize = data.page.size;
            this.totalElements = data.page.totalElements;
        };
    }
    handleSearchProducts() {
        const THE_KEYWORD = this.route.snapshot.paramMap.get('keyword');
        // if we have a different keyword than previous
        // then set pageNumber to 1
        if (this.previousKeyword != THE_KEYWORD)
            this.pageNumber = 1;
        this.previousKeyword = THE_KEYWORD;
        console.log("THE_KEYWORD: " + THE_KEYWORD + "pageNumber: " + this.pageNumber);
        // search for the products using keyword
        this.productService.searchProductsPaginate(this.pageNumber - 1, this.pageSize, THE_KEYWORD).subscribe(this.processResult());
    }
    updatePageSize(pageSize) {
        this.pageSize = pageSize;
        this.pageNumber = 1;
        this.listProducts();
    }
    addToCart(product) {
        console.log("Adding to cart: " + product.name + " " + product.unitPrice);
        const THE_CART_ITEM = new CartItem(product);
        this.cartService.addToCart(THE_CART_ITEM);
    }
};
ProductListComponent = __decorate([
    Component({
        selector: 'app-product-list',
        templateUrl: './product-list-grid.component.html',
        // templateUrl: './product-list-table.component.html',
        // templateUrl: './product-list.component.html',
        styleUrls: ['./product-list.component.css']
    })
], ProductListComponent);
export { ProductListComponent };
//# sourceMappingURL=product-list.component.js.map