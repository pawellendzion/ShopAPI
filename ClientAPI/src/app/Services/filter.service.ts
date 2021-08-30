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

  constructor(private http: HttpClient) { }

  public searchProducts = (term: string) => {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<ProductModelInterface[]>(`${this.productsUrl}/search-products-by-name?name=${term}`);
  }

  public searchStats = (stats: string) => {
    return this.http.get<string[]>(`${this.productsUrl}/search?prop=${stats}`);
  }

  public filterDefault = (filter: FilterModelInterface) => {
    const options = {
      params:
        new HttpParams()
          .set('priceFrom', filter.priceFrom)
          .set('priceTo', filter.priceTo)
    };
    return this.http.get<ProductModelInterface[]>(this.productsUrl, options);
  }

  public filterLaptop = (filter: LaptopFilterModel) => {
    const options = {
      params:
        new HttpParams()
          .set('priceFrom', filter.priceFrom)
          .set('priceTo', filter.priceTo)
          .set('cpu', filter.cpu)
          .set('graphic', filter.graphic)
          .set('screenSize', filter.screenSize)
    };
    return this.http.get<ProductModelInterface[]>(`${this.productsUrl}/laptop`, options);
  }

  public filterLaptopBag = (filter: LaptopBagFilterModel) => {
    const options = {
      params:
        new HttpParams()
          .set('priceFrom', filter.priceFrom)
          .set('priceTo', filter.priceTo)
          .set('laptopScreenSize', filter.laptopScreenSize)
    };
    return this.http.get<ProductModelInterface[]>(`${this.productsUrl}/laptopBag`, options);
  }
}
