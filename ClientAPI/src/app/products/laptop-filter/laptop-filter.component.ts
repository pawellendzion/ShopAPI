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
  //#region properties
  public cpu$!: Observable<string[]>;
  public graphic$!: Observable<string[]>;
  public screenSize$!: Observable<string[]>;

  @Output() filterEvent = new EventEmitter<LaptopFilterModel>();

  private _filter = new LaptopFilterModel();
  //#endregion

  //#region constructor
  constructor(
    private _filterService: FilterService) { }
  //#endregion

  //#region implemented methods
  ngOnInit(): void {
    this.cpu$ = this._filterService.SearchStats('cpu');
    this.graphic$ = this._filterService.SearchStats('graphic');
    this.screenSize$ = this._filterService.SearchStats('screenSize');
    
    this.filterEvent.emit(this._filter);
  }
  //#endregion
  
  //#region methods
  public ModifyFilter = (property: string, value: string) => {
    switch(property) {
      case 'cpu': this._filter.cpu = value; break;
      case 'graphic': this._filter.graphic = value; break;
      case 'screenSize': this._filter.screenSize = value; break;
    }
    this.filterEvent.emit(this._filter);
  }
  //#endregion
}
