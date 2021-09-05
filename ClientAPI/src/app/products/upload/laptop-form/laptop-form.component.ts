import { LaptopModel } from './../../../Models/ProductModels/laptop.model';
import { ActivatedComponentService } from './../../../Services/activated-component.service';
import { UploadComponent } from './../upload.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laptop-form',
  templateUrl: './laptop-form.component.html',
  styleUrls: ['./laptop-form.component.scss']
})
export class LaptopFormComponent implements OnInit {
  //#region properties
  public laptopForm!: FormGroup;
  //#endregion
  
  //#region constructor
  constructor(
    private _formBuilder: FormBuilder, 
    private _service: ActivatedComponentService) { }
  //#endregion

  //#region implemented methods
  ngOnInit(): void {
    this.laptopForm = this._formBuilder.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      cpu: ['', Validators.required],
      graphic: ['', Validators.required],
      screenSize: [null, Validators.required]
    })
  }
  //#endregion

  //#region methods
  public OnSubmit(file: any) {
    if (this.laptopForm.invalid || !file || file.length === 0) return;

    const stats = new LaptopModel(
      this.Name.value,
      this.Price.value,
      this.Cpu.value,
      this.Graphic.value,
      this.ScreenSize.value);

    (this._service.Component as UploadComponent).UploadFile(file, stats);
  }
  //#endregion

  //#region getters
  public get Name() {
    return this.laptopForm.get('name')!;
  }

  public get Price() {
    return this.laptopForm.get('price')!;
  }

  public get Cpu() {
    return this.laptopForm.get('cpu')!;
  }

  public get Graphic() {
    return this.laptopForm.get('graphic')!;
  }

  public get ScreenSize() {
    return this.laptopForm.get('screenSize')!;
  }
  //#endregion
}
