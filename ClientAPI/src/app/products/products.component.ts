import { ProductModelInterface } from './../Interfaces/product-model-interface';
import { FilterService } from './../Services/filter.service';
import { ActivatedComponentService } from 'src/app/Services/activated-component.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products.service';
import { LaptopFilterModel } from '../Models/FilterModels/laptop-filter.model';
import { LaptopBagFilterModel } from '../Models/FilterModels/laptop-bag-filter.model';

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
    data.forEach(element => {
      element.dbPath = this.url + element.dbPath;
      this.products.push(element)
    });
  }

  constructor(
    private productsService: ProductsService,
    private activated: ActivatedComponentService,
    private filterService: FilterService) { }

  ngOnInit() {
    this.activated.setComponent(this);

    this.productsService.getAll().subscribe(p => {
      p.forEach(element => {
        element.dbPath = this.url + element.dbPath;
        this.products.push(element)
      });
    });

    // For small screen
    if(window.innerWidth < 700) document.getElementById('left')!.style.left = '-227px';
  }

  public changeFilter = (filter: any) => {
    this.currentFilter = filter;
  }

  show(term: string) {
    this.products = new Array<ProductModelInterface>();

    if (term !== "") {
      this.filterService.searchProducts(term).subscribe(p => this.addToList(p));
    }
    else {
      this.productsService.getAll().subscribe(p => this.addToList(p));
    }
  }

  apply(category: string) {
    this.products = new Array<ProductModelInterface>();

    let from: number = parseFloat((<HTMLInputElement>document.getElementById('from'))?.value);
    let to: number = parseFloat((<HTMLInputElement>document.getElementById('to'))?.value);

    if (!from) from = 0;
    if (!to) to = 0;

    if (this.currentFilter) {
      this.currentFilter.priceFrom = from;
      this.currentFilter.priceTo = to;
    }

    switch (category) {
      case 'laptop':
        this.filterService.filterLaptop(this.currentFilter).subscribe(p => this.addToList(p));
        break;
      
      case 'laptopBag':
        this.filterService.filterLaptopBag(this.currentFilter).subscribe(p => this.addToList(p));
        break;

      case '':
        this.filterService.filterDefault({ priceFrom: from, priceTo: to }).subscribe(p => this.addToList(p));
        break;
    }
  }
  // For small screen
  public sideBar = () => {
    if (window.innerWidth > 700) return;

    const bar = document.getElementById('left')!;
    if (parseInt(bar.style.left) < 0) bar.style.left = "0px";
    else bar.style.left = "-227px";
  }
}
