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
  //#region properties
  private _productsUrl = "https://localhost:5001/products/filter";
  //#endregion

  //#region constructor
  constructor(
    private _http: HttpClient, 
    private _route: ActivatedRoute, 
    private _router: Router,
    private _productsService: ProductsService) { }
  //#endregion

  //#region methods

  //#region get query params
  public DefaultQueryParams(filter: FilterModelInterface) {
    const params = new HttpParams()
      .set('priceFrom', filter.priceFrom)
      .set('priceTo', filter.priceTo)
      .set('category', '');

    return params;
  }

  public LaptopQueryParams(filter: LaptopFilterModel) {
    const params = new HttpParams()
      .set('priceFrom', filter.priceFrom)
      .set('priceTo', filter.priceTo)
      .set('cpu', filter.cpu)
      .set('graphic', filter.graphic)
      .set('screenSize', filter.screenSize)
      .set('category', 'laptop');
    
    return params;
  }

  public LaptopBagQueryParams(filter: LaptopBagFilterModel) {
    const params = new HttpParams()
      .set('priceFrom', filter.priceFrom)
      .set('priceTo', filter.priceTo)
      .set('laptopScreenSize', filter.laptopScreenSize)
      .set('category', 'laptopBag');

    return params;
  }
  //#endregion

  public SearchProducts(term: string) {
    if (!term.trim()) {
      return of([]);
    }
    return this._http.get<ProductModelInterface[]>(`${this._productsUrl}/search-products-by-name?name=${term}`);
  }

  public SearchStats(stats: string) {
    return this._http.get<string[]>(`${this._productsUrl}/search?prop=${stats}`);
  }
  
  /**
   * @returns If filter not applied returns all products 
   * otherwise filtered
   */
  public GetFilteredProducts() {
    if (this._route.snapshot.queryParamMap.keys.length === 0) {
      return this._productsService.GetAllProducts();
    }

    const params = this._router.url.slice(this._router.url.indexOf('?'));
    let category = this._route.snapshot.queryParamMap.get("category");

    if (category !== '') {
      category = '/' + category;
    }

    return this._http.get<ProductModelInterface[]>(`${this._productsUrl}${category}${params}`);
  }
  //#endregion
}
