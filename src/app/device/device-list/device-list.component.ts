import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Device } from 'src/app/device/device.model';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceService } from '../device.service';
import { AuthService } from 'src/app/auth/auth.service';
import { faSort  } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit{
  deviceName: any;
  faSort = faSort;
  flexCheckDefault = false;
  devices: Device[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  private devicesSub: Subscription;
  private authStatusSub: Subscription;
  DeviceService: any;
  displayedColumns: string[] = ['select','id', 'deviceName', 'latitude', 'longitude'];
  dataSource = new MatTableDataSource<Device>();
  selection = new SelectionModel<Device>(true, []);

  constructor(public deviceService: DeviceService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.deviceService.getDevices();
    this.devicesSub = this.deviceService
      .getDeviceUpdateListener()
      .subscribe((deviceData: {devices: Device[]}) => {
        this.isLoading = false;
        this.devices = deviceData.devices;
        console.log(this.devices.length);

      });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(IsAuthenticated => {
        this.userIsAuthenticated = IsAuthenticated;
      });
  }

  Search(){
    if(this.deviceName == ""){
      this.ngOnInit();
    }else{
      this.devices = this.devices.filter(res => {
        return res.DeviceName.toLocaleLowerCase().match(this.deviceName.toLocaleLowerCase());
      })
    }
  }

  key: string = 'deviceName'
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  onDelete(deviceId: string) {
    this.isLoading = true;
    console.log(this.DeviceService);

    this.deviceService.deleteDevice(deviceId).subscribe(() => {
    this.deviceService.getDevices();
    location.reload();
    });
  }

  ngOnDestroy() {
    this.devicesSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
