import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { Cartesian3, Cartographic, Color, EllipsoidSurfaceAppearance, GeometryInstance, Material, Primitive, Rectangle, RectangleGeometry, ScreenSpaceEventType } from 'cesium';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CesiumDirective } from './cesium.directive';
import { ViewerService } from './viewer.service';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, CesiumDirective,
     DialogModule, DropdownModule, ButtonModule, InputTextModule],
  templateUrl: 'app.component.html',

})
export class AppComponent implements AfterViewInit,OnInit {
  addUserVisable = false
  currentLoc = ''
  currentName = ''
  selectedType = ''
  constructor(private viewerService: ViewerService,private http: HttpClient, private cdref: ChangeDetectorRef) {
  }
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    //get all location

    this.viewerService.viewer.screenSpaceEventHandler.setInputAction((input: any) => {
      const cartesian = this.viewerService.viewer.scene.pickPosition(input.position);

      const latLonPoint = Cartographic.fromCartesian(cartesian);


      this.currentLoc = `${latLonPoint.longitude},${latLonPoint.latitude}`
      console.log(latLonPoint)
      this.addUserVisable = true;
    }, ScreenSpaceEventType.RIGHT_DOWN);

    this.http.get('http://localhost:3002/api/getAll').subscribe((places: any) =>
      {
      console.log(places)
      places?.forEach((p: any) => console.log(p));
      places?.forEach((place: any) => {
        const location = place.location.split(',');
        this.viewerService.viewer.entities.add({
          id: place.ID,
          position:  Cartesian3.fromDegrees(parseFloat(location[0]), parseFloat(location[1]), 0),
          ellipse : {
              semiMinorAxis : 122,
              semiMajorAxis : 222,
              fill : true,
              outline: true,
              material : Color.RED,
              outlineColor : Color.RED,
              outlineWidth : 22
          }
        });
      })
      //hide loading when finishing
    })

  }


  addPlace() {
    this.addUserVisable = false
    // send post to service with all properties
    //start loading
    this.http.post('http://localhost:3002/api/place',JSON.stringify( {name: this.currentName, type: this.selectedType, location: this.currentLoc}),{headers: new HttpHeaders({"Content-type": "application/json"})}).subscribe(() =>{
      //hide loading when finishing
    })
    //empty all values
    this.currentName = ''
    this.selectedType = ''
  }

}
