import { ViewerService } from './viewer.service';
import { Directive, ElementRef, OnInit } from '@angular/core';
import { Cartesian3, ImageryLayer, OpenStreetMapImageryProvider, SceneMode, ScreenSpaceEventType, Terrain, Viewer } from 'cesium';

@Directive({
  selector: '[appCesium]',
  standalone: true
})
export class CesiumDirective implements OnInit {

  constructor(private el: ElementRef, private viewerService: ViewerService) {}

  ngOnInit(): void {
    const viewer = new Viewer(this.el.nativeElement, {
      sceneMode: SceneMode.SCENE2D,
      // Use Cesium World Terrain
      terrain: Terrain.fromWorldTerrain(),
      // Hide the base layer picker
      baseLayerPicker: false,
      // Use OpenStreetMaps
      baseLayer: new ImageryLayer(new OpenStreetMapImageryProvider({
        url: "https://tile.openstreetmap.org/"
      })),
      timeline: false,
  animation: false,
  navigationHelpButton: false,
  navigationInstructionsInitiallyVisible: false,
  infoBox: false,
  geocoder: false
    });

    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(-117.16, 32.71, 15000.0),
  });
  this.viewerService.viewer = viewer;

  }

}
