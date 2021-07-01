import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CityModule} from './city/city.module';
import {HttpClientModule} from '@angular/common/http';
import {CityRoutingModule} from './city/city-routing.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./city/city-routing.module').then(m => m.CityRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CityModule,
    HttpClientModule,
    CityRoutingModule
  ],

  exports: [RouterModule]
})
export class AppRoutingModule {
}
