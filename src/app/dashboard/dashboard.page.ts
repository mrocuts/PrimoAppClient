import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonRouterOutlet } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { UIAlertService } from '../UITools/uialert.service';


declare var google : any;

interface Marker {
  position : {
    lat: number,
    lng: number
  };
  title: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit,AfterViewInit {

  myPosition : Marker = {
    title :"home",
    position : {
      lat:0,
      lng:0
    }
  };

  map : any;
 
  @ViewChild('map',{read:ElementRef,static:false})mapRef :ElementRef;

  constructor(private geolocation : Geolocation,
              private routerOutlet : IonRouterOutlet,
              private alert : UIAlertService) { }

  ngOnInit() {
    this.routerOutlet.swipeGesture=false;
  }

  ngAfterViewInit(){
    console.log('ngAfterViewInit');
    this.geolocation.getCurrentPosition().then((resp)=>{
      console.log(`${resp.coords.latitude} , ${resp.coords.longitude}`);
      this.myPosition.position.lat = resp.coords.latitude;
      this.myPosition.position.lng = resp.coords.longitude; 
      this.myPosition.title = "home";
      console.log(this.myPosition);
      this.loadMap2();
    }).catch((erro)=> {
      console.log('error getting location',erro);
    });
    
  }

  private getGoogleMaps() : Promise<any>{
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject)=> {
      const script = document.createElement('script');
      script.src= `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsKey}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK no disponible.');
        }
      }
    });
  }
  
  loadMap2(){
    this.getGoogleMaps().then(googleMaps => {
      const mapEl  = this.mapRef.nativeElement;
      const location = new googleMaps.LatLng(this.myPosition.position);
      const options = {
        center: location,
        zoom : 15,
        disableDefaultUI : true
      }
      const map = new googleMaps.Map(mapEl,options);
      googleMaps.event.addListenerOnce(map, 'idle', () => {
        this.addMarker(this.myPosition,googleMaps, map);
      })
    }).catch(err => {
      console.log(err);
    })
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter');
    this.geolocation.getCurrentPosition().then((resp)=>{
      console.log(`${resp.coords.latitude} , ${resp.coords.longitude}`);
      this.myPosition.position.lat = resp.coords.latitude;
      this.myPosition.position.lng = resp.coords.longitude; 
      this.myPosition.title = "home";
      console.log(this.myPosition);
      
      //this.loadMap2();
    }).catch((erro)=> {
      console.log('error getting location',erro);
    });
  }

  loadMap(){
    const location = new google.maps.LatLng(this.myPosition.position);
    const options = {
      center: location,
      zoom : 15,
      disableDefaultUI : true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      //this.addMarker(this.myPosition);

    })
  }

  addMarker(marker : Marker, googleMaps : any, map : any) {
    return new googleMaps.Marker({
      position : marker.position,
      map: map,
      title : marker.title
    });
  }

}
