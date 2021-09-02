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
  public products = new Array<ProductModelInterface>();
  public url = "https://localhost:5001/";

  private currentFilter: any = null;

  addToList = (data: ProductModelInterface[]) => {
    this.products = new Array<ProductModelInterface>();
    data.forEach(element => {
      element.dbPath = this.url + element.dbPath;
      this.products.push(element)
    });
  }

  constructor(
    private productsService: ProductsService,
    private activated: ActivatedComponentService,
    private filterService: FilterService,
    private router: Router) { }

  ngOnInit() {
    this.activated.setComponent(this);
    
    this.filterService.get().subscribe(p => this.addToList(p));

    // For small screen
    if(window.innerWidth < 700) document.getElementById('left')!.style.left = '-227px';
  }

  public changeFilter = (filter: any) => {
    this.currentFilter = filter;
  }

  show(term: string) {
    if (term !== "") {
      this.filterService.searchProducts(term).subscribe(p => this.addToList(p));
    }
    else {
      this.productsService.getAll().subscribe(p => this.addToList(p));
    }
  }

  apply(category: string) {

    let from: number = parseFloat((<HTMLInputElement>document.getElementById('from'))?.value);
    let to: number = parseFloat((<HTMLInputElement>document.getElementById('to'))?.value);

    if (!from) from = 0;
    if (!to) to = 0;

    if (this.currentFilter) {
      this.currentFilter.priceFrom = from;
      this.currentFilter.priceTo = to;
    }

    let params!: HttpParams;
    switch (category) {
      case 'laptop':
        params = this.filterService.laptopQueryParams(this.currentFilter);
        break;
      
      case 'laptopBag':
        params = this.filterService.laptopBagQueryParams(this.currentFilter);
        break;

      case '':
        params = this.filterService.defaultQueryParams({priceFrom: from, priceTo: to});
        break;
    }

    this.router.navigateByUrl("products?" + params.toString()).then(() => 
          this.filterService.get().subscribe(p => this.addToList(p)));
  }

  public clear = (select: HTMLSelectElement) => {
    select.value = '';
    this.router.navigateByUrl("products").then(() => this.filterService.get().subscribe(p => this.addToList(p)));
  }

  // For small screen
  public sideBar = () => {
    if (window.innerWidth > 700) return;

    const bar = document.getElementById('left')!;
    if (parseInt(bar.style.left) < 0) bar.style.left = "0px";
    else bar.style.left = "-227px";
  }
}
