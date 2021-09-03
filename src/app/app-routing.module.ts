import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./auth/login/login.copnonent";
import { SignupComponent } from "./auth/signup/signup.copnonent";
import { AuthGuard } from "./auth/auth.guard";
import { DeviceCreateComponent } from "./device/device-create/device-create.component";
import { DeviceListComponent } from "./device/device-list/device-list.component"
import { MapComponent } from "./maps/map/map.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'create', component: DeviceCreateComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent},
  { path: 'map', component: MapComponent, canActivate: [AuthGuard]},
  { path: 'list', component: DeviceListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
