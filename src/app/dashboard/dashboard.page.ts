import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

declare var google;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  
  constructor(private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) { 
    this.getGeolocation();
  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    //OBTENEMOS LAS COORDENADAS DESDE EL TELEFONO.
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }       
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  
  getGeolocation(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this.latitude = geoposition.coords.latitude;
      this.longitude = geoposition.coords.longitude;
    });
  }}
