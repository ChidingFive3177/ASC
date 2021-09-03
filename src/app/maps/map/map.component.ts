import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Device } from 'src/app/device/device.model';
import { DeviceService } from 'src/app/device/device.service';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{
  // @ViewChild('gmapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  // lat = 30.5852;
  // lng = 36.2384;
  // coordinates = new google.maps.LatLng(this.lat, this.lng);
  devices: Device[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  private devicesSub: Subscription;
  private authStatusSub: Subscription;
  DeviceService: any;
  displayedColumns: string[] = ['select','id', 'deviceName', 'latitude', 'longitude'];

  constructor(public deviceService: DeviceService, private authService: AuthService) {}

  ngOnInit() {
    function initMap(): void{}


    function mark(map, device){
      let markers: google.maps.Marker[] = [];
      let marker
      addMarker()

      function addMarker() {
        device.forEach(element => {
            const marker = new google.maps.Marker({
              position: {lat: parseInt(element.latitude), lng: parseInt(element.longitude)},
              map: map,
            });
            markers.push(marker);
          });
        }

        function setMapOnAll(map: google.maps.Map | null) {
          for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
          }
        }

        function hideMarkers(): void {
          setMapOnAll(null);
        }

        function showMarkers(): void {
          setMapOnAll(map);
        }



      map.addListener('zoom_changed', () =>{
        if(map.zoom >= 8) {
          showMarkers()
        } else  {
          hideMarkers()
          const marker = new google.maps.Marker({
            position: {lat: parseInt(device[0].latitude), lng: parseInt(device[0].longitude)},
            map: map,
          });
        }
      })
    }

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 30.5852, lng: 36.2384},
      zoom: 8
    });
    const newMap = this.map;
    this.isLoading = true;
    this.deviceService.getDevices();
    this.devicesSub = this.deviceService
      .getDeviceUpdateListener()
      .subscribe((deviceData: {devices: Device[]}) => {
        this.isLoading = false;
        this.devices = deviceData.devices;
        mark(newMap,this.devices)
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(IsAuthenticated => {
        this.userIsAuthenticated = IsAuthenticated;
      });
      }
}
