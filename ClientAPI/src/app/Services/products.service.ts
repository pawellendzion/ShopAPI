import { ProductModelInterface } from './../Interfaces/product-model-interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsUrl = "https://localhost:5001/products";

  constructor(private http: HttpClient) { }

  public getNews = (count: number) => {
    return this.http.get<ProductModelInterface[]>(`${this.productsUrl}/${count}`);
  }

  public getAll = () => {
    return this.http.get<ProductModelInterface[]>(this.productsUrl);
  }

  public getProduct = (id: number) => {
    return this.http.get<any>(`${this.productsUrl}/details/${id}`);
  }

  public uploadProduct = (files: any, stats: ProductModelInterface): void => {
    let name: number;

    this.http.post<number>(`${this.productsUrl}/upload/${stats.category}`, stats)
      .subscribe(
        (id: number) => {
          name = id;

          let fileToUpload = <File>files[0];
          const formData = new FormData();
          formData.append('file', fileToUpload, `${name}.jpg`);

          this.http.post(`${this.productsUrl}/upload/${name}`, formData).subscribe()

        }, err => console.error("Cannot create product")
      )
  }
}