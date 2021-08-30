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
  public news = new Array<ProductModelInterface>();
  public url = "https://localhost:5001/";

  constructor(public userService: UserService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.userService.isAuthorizated();
    this.get();
  }

  get() {
    this.productsService.getNews(3).subscribe((data: ProductModelInterface[]) => {
      data.forEach(element => {
        element.dbPath = this.url + element.dbPath;
        this.news.unshift(element);
      })
    }, (err: any) => {
      console.log('main-page get method err: ' + err?.error);
    });
  }
}
