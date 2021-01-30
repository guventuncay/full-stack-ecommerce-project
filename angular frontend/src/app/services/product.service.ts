import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductList(categoryId: number): Observable<Product[]> {

    // todo: need to build url based on category id
    const searchUrl = this.baseUrl + "/search/findByCategoryId?id=" + categoryId;

    return this.getProducts(searchUrl);
  }

  getProductCategory(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProduct(THE_KEYWORD: string): Observable<Product[]> {

    // todo: need to build url based on the keyword
    const searchUrl = this.baseUrl + "/search/findByNameContaining?name=" + THE_KEYWORD;

    return this.getProducts(searchUrl);
  }

  getProduct(THE_PRODUCT_ID: number): Observable<Product> {

    // neet to build URL based on product id
    const PRODUCT_URL = this.baseUrl + "/" + THE_PRODUCT_ID;

    return this.httpClient.get<Product>(PRODUCT_URL);
  }

  getProductListPaginate(page: number, pageSize: number, categoryId: number): Observable<GetResponseProduct> {

    // todo: need to build url based on category id, page, pageSize
    const searchUrl = this.baseUrl + "/search/findByCategoryId?id=" + categoryId + "&page=" + page + "&size=" + pageSize;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  searchProductsPaginate(page: number, pageSize: number, THE_KEYWORD: string): Observable<GetResponseProduct> {
2
    // todo: need to build url based on the keyword
    const searchUrl = this.baseUrl + "/search/findByNameContaining?name=" + THE_KEYWORD + "&page=" + page + "&size=" + pageSize;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
