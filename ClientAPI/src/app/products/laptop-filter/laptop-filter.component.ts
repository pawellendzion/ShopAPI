import { LaptopFilterModel } from './../../Models/FilterModels/laptop-filter.model';
import { FilterService } from './../../Services/filter.service';
import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-laptop-filter',
  templateUrl: './laptop-filter.component.html',
  styleUrls: ['./laptop-filter.component.scss']
})
export class LaptopFilterComponent implements OnInit {
  cpu$!: Observable<string[]>;
  graphic$!: Observable<string[]>;
  screenSize$!: Observable<string[]>;

  @Output() filterEvent = new EventEmitter<LaptopFilterModel>();

  filter = new LaptopFilterModel();

  modifyFilter = (property: string, value: string) => {
    switch(property) {
      case 'cpu': this.filter.cpu = value; break;
      case 'graphic': this.filter.graphic = value; break;
      case 'screenSize': this.filter.screenSize = value; break;
    }
    this.filterEvent.emit(this.filter);
  }

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.cpu$ = this.filterService.searchStats('cpu');
    this.graphic$ = this.filterService.searchStats('graphic');
    this.screenSize$ = this.filterService.searchStats('screenSize');

    this.filterEvent.emit(this.filter);
  }

}
