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
  laptopBagForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: ActivatedComponentService) { }

  ngOnInit(): void {
    this.laptopBagForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      laptopScreenSize: [null, Validators.required]
    })
  }

  onSubmit(file: any) {
    if (this.laptopBagForm.invalid || !file || file.length === 0) return;

    const stats = new LaptopBagModel(
      this.name.value,
      this.price.value,
      this.laptopScreenSize.value);

    (this.service.getComponent as UploadComponent).uploadFile(file, stats);
  }



  get name() {
    return this.laptopBagForm.get('name')!;
  }

  get price() {
    return this.laptopBagForm.get('price')!;
  }

  get laptopScreenSize() {
    return this.laptopBagForm.get('laptopScreenSize')!;
  }

}
