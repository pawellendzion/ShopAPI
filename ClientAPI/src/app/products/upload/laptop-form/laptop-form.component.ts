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
  laptopForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: ActivatedComponentService) { }

  ngOnInit(): void {
    this.laptopForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      cpu: ['', Validators.required],
      graphic: ['', Validators.required],
      screenSize: [null, Validators.required]
    })
  }

  onSubmit(file: any) {
    if (this.laptopForm.invalid || !file || file.length === 0) return;

    const stats = new LaptopModel(
      this.name.value,
      this.price.value,
      this.cpu.value,
      this.graphic.value,
      this.screenSize.value);

    (this.service.getComponent as UploadComponent).uploadFile(file, stats);
  }



  get name() {
    return this.laptopForm.get('name')!;
  }

  get price() {
    return this.laptopForm.get('price')!;
  }

  get cpu() {
    return this.laptopForm.get('cpu')!;
  }

  get graphic() {
    return this.laptopForm.get('graphic')!;
  }

  get screenSize() {
    return this.laptopForm.get('screenSize')!;
  }
}
