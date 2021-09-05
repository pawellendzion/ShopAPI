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
  //#region properties
  public laptopScreenSize$!: Observable<string[]>;
  
  @Output() filterEvent = new EventEmitter<LaptopBagFilterModel>();
  
  private _filter = new LaptopBagFilterModel();
  //#endregion
  
  //#region constructor
  constructor(
    private _filterService: FilterService) { }
  //#endregion

  //#region implemented methods
  ngOnInit(): void {
    this.laptopScreenSize$ = this._filterService.SearchStats('laptopScreenSize');
    
    this.filterEvent.emit(this._filter);
  }
  //#endregion

  //#region methods
  public ModifyFilter(property: string, value: string) {
    switch(property) {
      case 'laptopScreenSize': this._filter.laptopScreenSize = value; break;
    }
    this.filterEvent.emit(this._filter);
  }
  //#endregion
}
