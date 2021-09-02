import { ProductsService } from './products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LaptopFilterModel } from './../Models/FilterModels/laptop-filter.model';
import { ProductModelInterface } from './../Interfaces/product-model-interface';
import { FilterModelInterface } from './../Interfaces/filter-model-intreface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { LaptopBagFilterModel } from '../Models/FilterModels/laptop-bag-filter.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  productsUrl = "https://localhost:5001/products/filter";

  constructor(private http: HttpClient, 
    private route: ActivatedRoute, 
    private router: Router,
    private productsService: ProductsService) { }

  public searchProducts = (term: string) => {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<ProductModelInterface[]>(`${this.productsUrl}/search-products-by-name?name=${term}`);
  }

  public searchStats = (stats: string) => {
    return this.http.get<string[]>(`${this.productsUrl}/search?prop=${stats}`);
  }

  public defaultQueryParams = (filter: FilterModelInterface) => {
    const params = new HttpParams()
      .set('priceFrom', filter.priceFrom)
      .set('priceTo', filter.priceTo)
      .set('category', '');

    return params;
  }

  public laptopQueryParams = (filter: LaptopFilterModel) => {
    const params = new HttpParams()
      .set('priceFrom', filter.priceFrom)
      .set('priceTo', filter.priceTo)
      .set('cpu', filter.cpu)
      .set('graphic', filter.graphic)
      .set('screenSize', filter.screenSize)
      .set('category', 'laptop');
    
    return params;
  }

  public laptopBagQueryParams = (filter: LaptopBagFilterModel) => {
    const params = new HttpParams()
      .set('priceFrom', filter.priceFrom)
      .set('priceTo', filter.priceTo)
      .set('laptopScreenSize', filter.laptopScreenSize)
      .set('category', 'laptopBag');

    return params;
  }

  public get = () => {
    if (this.route.snapshot.queryParamMap.keys.length === 0) {
      return this.productsService.getAll();
    }

    const params = this.router.url.slice(this.router.url.indexOf('?'));
    let category = this.route.snapshot.queryParamMap.get("category");

    if (category !== '') {
      category = '/' + category;
    }

    return this.http.get<ProductModelInterface[]>(`${this.productsUrl}${category}${params}`);
  }
}
