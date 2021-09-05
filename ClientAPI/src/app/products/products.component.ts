import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ProductModelInterface } from './../Interfaces/product-model-interface';
import { FilterService } from './../Services/filter.service';
import { ActivatedComponentService } from 'src/app/Services/activated-component.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  //#region properties
  public products = new Array<ProductModelInterface>();
  
  private _url = "https://localhost:5001/";
  private _currentFilter: any = null;
  //#endregion

  //#region constructor
  constructor(
    private _productsService: ProductsService,
    private _activated: ActivatedComponentService,
    private _filterService: FilterService,
    private _router: Router) { }
  //#endregion

  //#region implemented methods
  ngOnInit() {
    this._activated.Component = this;
    
    this._filterService.GetFilteredProducts().pipe(take(1)).subscribe(p => this.AddToList(p));

    // For small screen
    if(window.innerWidth < 700) document.getElementById('left')!.style.left = '-227px';
  }
  //#endregion

  //#region methods
  private AddToList(data: ProductModelInterface[]) {
    this.products = new Array<ProductModelInterface>();
    data.forEach(element => {
      element.dbPath = this._url + element.dbPath;
      this.products.push(element)
    });
  }

  public ChangeFilter(filter: any) {
    this._currentFilter = filter;
  }

  public ShowProducts(term: string) {
    if (term !== "") {
      this._filterService.SearchProducts(term).pipe(take(1)).subscribe(p => this.AddToList(p));
    }
    else {
      this._productsService.GetAllProducts().pipe(take(1)).subscribe(p => this.AddToList(p));
    }
  }

  public ApplyFilter(category: string) {

    let from: number = parseFloat((<HTMLInputElement>document.getElementById('from'))?.value);
    let to: number = parseFloat((<HTMLInputElement>document.getElementById('to'))?.value);

    if (!from) from = 0;
    if (!to) to = 0;

    if (this._currentFilter) {
      this._currentFilter.priceFrom = from;
      this._currentFilter.priceTo = to;
    }

    let params!: HttpParams;
    switch (category) {
      case 'laptop':
        params = this._filterService.LaptopQueryParams(this._currentFilter);
        break;
      
      case 'laptopBag':
        params = this._filterService.LaptopBagQueryParams(this._currentFilter);
        break;

      case '':
        params = this._filterService.DefaultQueryParams({priceFrom: from, priceTo: to});
        break;
    }

    this._router.navigateByUrl("products?" + params.toString()).then(() => 
          this._filterService.GetFilteredProducts().pipe(take(1)).subscribe(p => this.AddToList(p)));
  }

  public ClearFilter(select: HTMLSelectElement) {
    select.value = '';
    this._router.navigateByUrl("products").then(() => this._filterService.GetFilteredProducts().pipe(take(1)).subscribe(p => this.AddToList(p)));
  }

  //#region For small screen
  public SideBar() {
    if (window.innerWidth > 700) return;

    const bar = document.getElementById('left')!;
    if (parseInt(bar.style.left) < 0) bar.style.left = "0px";
    else bar.style.left = "-227px";
  }
  //#endregion
  //#endregion
}
