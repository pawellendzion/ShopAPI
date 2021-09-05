import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LaptopBagModel } from 'src/app/Models/ProductModels/laptop-bag.model';
import { ActivatedComponentService } from 'src/app/Services/activated-component.service';
import { UploadComponent } from '../upload.component';

@Component({
  selector: 'app-laptop-bag-form',
  templateUrl: './laptop-bag-form.component.html',
  styleUrls: ['./laptop-bag-form.component.scss']
})
export class LaptopBagFormComponent implements OnInit {
  //#region properties
  public laptopBagForm!: FormGroup;
  //#endregion

  //#region constructor
  constructor(
    private _formBuilder: FormBuilder, 
    private _service: ActivatedComponentService) { }
  //#endregion

  //#region implemented methods
  ngOnInit(): void {
    this.laptopBagForm = this._formBuilder.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      laptopScreenSize: [null, Validators.required]
    })
  }
  //#endregion

  //#region  methods
  public OnSubmit(file: any) {
    if (this.laptopBagForm.invalid || !file || file.length === 0) return;

    const stats = new LaptopBagModel(
      this.Name.value,
      this.Price.value,
      this.LaptopScreenSize.value);

    (this._service.Component as UploadComponent).UploadFile(file, stats);
  }
  //#endregion

  //#region getters
  public get Name() {
    return this.laptopBagForm.get('name')!;
  }
  public get Price() {
    return this.laptopBagForm.get('price')!;
  }
  public get LaptopScreenSize() {
    return this.laptopBagForm.get('laptopScreenSize')!;
  }
  //#endregion
}
