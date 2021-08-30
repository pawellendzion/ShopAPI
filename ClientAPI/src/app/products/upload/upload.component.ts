import { ProductsService } from './../../Services/products.service';
import { Router } from '@angular/router';
import { ProductModelInterface } from './../../Interfaces/product-model-interface';
import { ActivatedComponentService } from './../../Services/activated-component.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  public message!: string;

  constructor(private activatedComponentService: ActivatedComponentService, private uploadService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.activatedComponentService.setComponent(this);
  }

  public uploadFile  = (files: any, stats: ProductModelInterface) => {

    this.message = 'Uploading';

    this.uploadService.uploadProduct(files, stats);
    
    this.router.navigateByUrl("main");

    window.alert("If you cannot see your product please refresh page.");
  }
}
