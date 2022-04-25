import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
declare var H: any;

@Component({
  selector: 'app-mappage',
  templateUrl: './mappage.component.html',
  styleUrls: ['./mappage.component.css']
})
export class MappageComponent implements OnInit {
  lati: any = 43.47810329786979;
  lngi: any = -80.53855491847811;
  platform:any;

  @ViewChild("map")
  public  mapElement: ElementRef;


  constructor( private activatedRoute:ActivatedRoute){

    this.platform = new H.service.Platform({
      'apikey': 'M-Rot8Fu2wOfjJmBX_4-lkRKbA5Vb7X1itcU0grV7iU'
    });
  }

  public ngOnInit(): void {

  }
  public ngAfterViewInit() {

    var maptypes = this.platform.createDefaultLayers();
    var map = new H.Map(
      this.mapElement.nativeElement,
      maptypes.vector.normal.map,
      {
        zoom: 14,
        center: {
          lat: this.lati, lng: this.lngi
        }
      }

    );

    var icon = new H.map.Icon('assets/images/map.png');
    var marker = new H.map.Marker({
      lat: this.lati, lng: this.lngi
    }, {icon: icon});

    map.addObject(marker);

  }


}
