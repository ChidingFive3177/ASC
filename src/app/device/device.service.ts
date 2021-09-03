import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { Device } from "./device.model";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class DeviceService {
  private devices: Device[] = [];
  private deviceUpdated = new Subject<{ devices: Device[]}>();
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  createDevice(deviceName: string, latitude: string, longitude: string) {
    const authDevice: Device = { DeviceName: deviceName, latitude: latitude, longitude: longitude };
    this.http
      .post("http://localhost:3000/api/device", authDevice)
      .subscribe(response => {
        console.log(response);
      });
      this.router.navigate(["/list"]);
  }

  getDevices(){
    this.http
    .get<{ message: string; devices: any; maxPosts: number}>("http://localhost:3000/api/device").pipe(map(deviceData => {
      return{
        devices: deviceData.devices.rows.map(device => {
          return {
            DeviceName: device.devicename,
            latitude: device.latitude,
            longitude: device.longitude,
            id: device.id
          };
        }),
      };
      })
    )
    .subscribe(transformedPostData => {
      this.devices = transformedPostData.devices;
      this.deviceUpdated.next({
        devices: [...this.devices]
      });
    });
  }


  getDeviceUpdateListener() {
    return this.deviceUpdated.asObservable();
  }

  getDevice(id: string) {
    return this.http.get<{
      id: string;
      DeviceName: string;
      latitude: string;
      longitude: string;
    }>("http://localhost:3000/api/device/" + id);
  }

  deleteDevice(deviceId: string) {
    return this.http
      .delete("http://localhost:3000/api/device/" + deviceId);
  }

}
