import { ProductsService } from './../../Services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  //#region properites
  public product: any;
  
  private _url = "https://localhost:5001/";
  //#endregion

  //#region constructor
  constructor(
    private _productsService: ProductsService, 
    private _route: ActivatedRoute) { }
  //#endregion

  //#region implemented methods
  ngOnInit(): void {
    this.GetProduct();
  }
  //#endregion

  //#region methods
  public GetProduct() {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    return this._productsService.GetProduct(id).pipe(take(1)).subscribe(p => {
      p.dbPath = this._url + p.dbPath;
      this.product = p;
    });
  }
  //#endregion
}
