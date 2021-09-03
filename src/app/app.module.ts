import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatTableModule,
  MatCheckboxModule,
  MatIconModule,
  MatGridListModule,
  MatBadgeModule,
  MatDialogModule
} from "@angular/material";
import { Ng2OrderModule} from 'ng2-order-pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./auth/login/login.copnonent";
import { SignupComponent } from "./auth/signup/signup.copnonent";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { DeviceListComponent } from './device/device-list/device-list.component';
import { DeviceCreateComponent } from './device/device-create/device-create.component';
import { MapComponent } from './maps/map/map.component';
import { NicerHeaderComponent } from './header/nicer-header/nicer-header.component';
import { ErrorInterceptor } from "./error-interceptor";
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DeviceListComponent,
    DeviceCreateComponent,
    MapComponent,
    NicerHeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    Ng2OrderModule,
    FontAwesomeModule,
    MatIconModule,
    MatGridListModule,
    MatBadgeModule,
    MatDialogModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
               {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],

  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}
