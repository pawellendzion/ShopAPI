import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivatedComponentService {
  private _component: any;

  public set Component(component: any) {
    this._component = component;
  }

  public get Component() {
    return this._component;
  }
}
