import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
let ProductService = class ProductService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.baseUrl = 'http://localhost:8080/api/products';
        this.categoryUrl = 'http://localhost:8080/api/product-category';
    }
    getProducts(searchUrl) {
        return this.httpClient.get(searchUrl).pipe(map(response => response._embedded.products));
    }
    getProductList(categoryId) {
        // todo: need to build url based on category id
        const searchUrl = this.baseUrl + "/search/findByCategoryId?id=" + categoryId;
        return this.getProducts(searchUrl);
    }
    getProductCategory() {
        return this.httpClient.get(this.categoryUrl).pipe(map(response => response._embedded.productCategory));
    }
    searchProduct(THE_KEYWORD) {
        // todo: need to build url based on the keyword
        const searchUrl = this.baseUrl + "/search/findByNameContaining?name=" + THE_KEYWORD;
        return this.getProducts(searchUrl);
    }
    getProduct(THE_PRODUCT_ID) {
        // neet to build URL based on product id
        const PRODUCT_URL = this.baseUrl + "/" + THE_PRODUCT_ID;
        return this.httpClient.get(PRODUCT_URL);
    }
    getProductListPaginate(page, pageSize, categoryId) {
        // todo: need to build url based on category id, page, pageSize
        const searchUrl = this.baseUrl + "/search/findByCategoryId?id=" + categoryId + "&page=" + page + "&size=" + pageSize;
        return this.httpClient.get(searchUrl);
    }
    searchProductsPaginate(page, pageSize, THE_KEYWORD) {
        2;
        // todo: need to build url based on the keyword
        const searchUrl = this.baseUrl + "/search/findByNameContaining?name=" + THE_KEYWORD + "&page=" + page + "&size=" + pageSize;
        return this.httpClient.get(searchUrl);
    }
};
ProductService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProductService);
export { ProductService };
//# sourceMappingURL=product.service.js.map