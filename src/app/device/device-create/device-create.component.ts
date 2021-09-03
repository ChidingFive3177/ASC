import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DeviceService } from "../device.service";

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css']
})
export class DeviceCreateComponent {
  isLoading = false;

  constructor(public deviceService: DeviceService) {}

  onSaveDevice(form :NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.deviceService.createDevice(form.value.deviceName,form.value.latitude,form.value.longitude);
  }
}

