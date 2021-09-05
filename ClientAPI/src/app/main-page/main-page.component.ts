import { take } from 'rxjs/operators';
import { ProductModelInterface } from './../Interfaces/product-model-interface';
import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products.service';
import { registerLocaleData } from '@angular/common';
import * as cur from '@angular/common/locales/pl'

registerLocaleData(cur.default);

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  //#region properties
  public news = new Array<ProductModelInterface>();
  
  private _url = "https://localhost:5001/";
  //#endregion

  //#region constructor
  constructor(
    private _userService: UserService, 
    private _productsService: ProductsService) { }
  //#endregion

  //#region implemented methods
  ngOnInit(): void {
    this.GetNews();
  }
  //#endregion

  //#region methods
  private GetNews(): void {
    this._productsService.GetNews(3).pipe(take(1)).subscribe(
      (data: ProductModelInterface[]) => {
        data.forEach(element => {
          element.dbPath = this._url + element.dbPath;
          this.news.unshift(element);
        })
      }, 
      (err: any) => {
        console.log('main-page get method err: ' + err?.error);
      }
    );
  }
  //#endregion
}
