import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProductCategoryMenuComponent = class ProductCategoryMenuComponent {
    constructor(productService) {
        this.productService = productService;
    }
    ngOnInit() {
        this.listProductCategory();
    }
    listProductCategory() {
        this.productService.getProductCategory().subscribe(data => {
            console.log("Product Categories: " + JSON.stringify(data));
            this.productCategory = data;
        });
    }
};
ProductCategoryMenuComponent = __decorate([
    Component({
        selector: 'app-product-category-menu',
        templateUrl: './product-category-menu.component.html',
        styleUrls: ['./product-category-menu.component.css']
    })
], ProductCategoryMenuComponent);
export { ProductCategoryMenuComponent };
//# sourceMappingURL=product-category-menu.component.js.map