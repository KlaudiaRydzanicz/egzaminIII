import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {MountainsRoutingModule} from "./mountains/mountains-routing.module";
import {MountainsModule} from "./mountains/mountains.module";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./mountains/mountains-routing.module').then(m => m.MountainsRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule,
    MountainsRoutingModule,
    MountainsModule
  ],

  exports: [RouterModule]
})
export class AppRoutingModule {
}
