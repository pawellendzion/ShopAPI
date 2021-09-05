import { take } from 'rxjs/operators';
import { ProductModelInterface } from './../Interfaces/product-model-interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //#region properties
  public uploaded$ = new BehaviorSubject<boolean>(false);
  
  private _productsUrl = "https://localhost:5001/products";
  //#endregion

  //#region constructor
  constructor(
    private _http: HttpClient) { }
  //#endregion
  
  //#region methods
  public GetNews(count: number) {
    return this._http.get<ProductModelInterface[]>(`${this._productsUrl}/${count}`);
  }

  public GetAllProducts() {
    return this._http.get<ProductModelInterface[]>(this._productsUrl);
  }

  public GetProduct(id: number) {
    return this._http.get<any>(`${this._productsUrl}/details/${id}`);
  }

  public UploadProduct(files: any, stats: ProductModelInterface) {
    let name: number;

    this._http.post<number>(`${this._productsUrl}/upload/${stats.category}`, stats)
    .pipe(take(1))
    .subscribe(
      (id: number) => {
        name = id;

        let fileToUpload = <File>files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, `${name}.jpg`);

        this._http.post(`${this._productsUrl}/upload/${name}`, formData).pipe(take(1)).subscribe(() => this.uploaded$.next(true));

      }, err => console.error("Cannot create product")
    )
  }
  //#endregion
}