import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CityComponent} from './city/city.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormComponent} from './form/form.component';
import {CityDetailComponent} from './city-detail/city-detail.component';
import {CityService} from "./city.service";


@NgModule({
  declarations: [
    CityComponent,
    FormComponent,
    CityDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    CityService
  ]
})
export class CityModule { }
