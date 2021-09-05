import { Router } from '@angular/router';
import { CommonUrls } from './../../commonUrls';
import { FilterService } from './../../Services/filter.service';
import { ActivatedComponentService } from 'src/app/Services/activated-component.service';
import { ProductModelInterface } from './../../Interfaces/product-model-interface';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  //#region properties
  public products$!: Observable<ProductModelInterface[]>;
  public productDetailsPageUrl = CommonUrls.ProductDetailsPageUrl + '/';

  private _searchTerms = new Subject<string>();
  //#endregion

  //#region constructor
  constructor(
    private _filterService: FilterService, 
    private _activated: ActivatedComponentService,
    private _router: Router) {}
  //#endregion
    
  //#region implemented methods
  ngOnInit() {
    this.products$ = this._searchTerms.pipe(
      debounceTime(300),
      
      distinctUntilChanged(),
      
      switchMap((term: string) => this._filterService.SearchProducts(term))
    );
  }
  //#endregion

  //#region methods
  public ShowProducts(term: string) {
    // This time out enable work for "routerlink" in template
    window.setTimeout(() => {
      if(!this._router.url.includes(CommonUrls.ProductDetailsPageUrl)) {
        document.getElementById('list')!.style.display = 'none';
        this._activated.Component.ShowProducts(term);
      }
    }, 250);
  }

  public SearchProducts(term: string) {
    document.getElementById('list')!.style.display = 'block';
    this._searchTerms.next(term);
  }
  //#endregion
}
