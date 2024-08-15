import { Viewer } from 'cesium';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewerService {

  viewer$ = new BehaviorSubject<any>(null);

  constructor() { }

  get viewer() {
    return this.viewer$.value;
  }

  set viewer(viewer : Viewer){
    this.viewer$.next(viewer);
  }
}
