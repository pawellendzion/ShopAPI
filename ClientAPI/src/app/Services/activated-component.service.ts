import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivatedComponentService {
  private _component: any;

  public setComponent(component: any): void {
    this._component = component;
  }

  get getComponent() {
    return this._component;
  }
}
