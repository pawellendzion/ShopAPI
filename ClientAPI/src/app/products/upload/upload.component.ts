import { CommonUrls } from './../../commonUrls';
import { ProductsService } from './../../Services/products.service';
import { Router } from '@angular/router';
import { ProductModelInterface } from './../../Interfaces/product-model-interface';
import { ActivatedComponentService } from './../../Services/activated-component.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnDestroy {
  //#region properties
  public message!: string;

  private _unsubscribe$ = new Subject<void>();
  //#endregion
  
  //#region constructor
  constructor(
    private _activatedComponentService: ActivatedComponentService, 
    private _uploadService: ProductsService, 
    private _router: Router) { }
  //#endregion

  //#region implemented methods
  ngOnInit(): void {
    this._activatedComponentService.Component = this;
  }
  
  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
  //#endregion

  //#region methods
  public UploadFile(files: any, stats: ProductModelInterface) {

    this.message = 'Uploading';

    this._uploadService.UploadProduct(files, stats);
    this._uploadService.uploaded$.pipe(takeUntil(this._unsubscribe$)).subscribe(isUploaded => {
      if (isUploaded === true) {
        this._router.navigateByUrl(CommonUrls.MainPageUrl);
      }
    });
  }
  //#endregion
}
