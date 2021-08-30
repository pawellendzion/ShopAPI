import { FilterService } from './../../Services/filter.service';
import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LaptopBagFilterModel } from 'src/app/Models/FilterModels/laptop-bag-filter.model';

@Component({
  selector: 'app-laptop-bag-filter',
  templateUrl: './laptop-bag-filter.component.html',
  styleUrls: ['./laptop-bag-filter.component.scss']
})
export class LaptopBagFilterComponent implements OnInit {
  laptopScreenSize$!: Observable<string[]>;

  @Output() filterEvent = new EventEmitter<LaptopBagFilterModel>();

  filter = new LaptopBagFilterModel();

  modifyFilter = (property: string, value: string) => {
    switch(property) {
      case 'laptopScreenSize': this.filter.laptopScreenSize = value; break;
    }
    this.filterEvent.emit(this.filter);
  }

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.laptopScreenSize$ = this.filterService.searchStats('laptopScreenSize');
    
    this.filterEvent.emit(this.filter);
  }

}
