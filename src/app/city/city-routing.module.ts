import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CityComponent} from './city/city.component';
import {FormComponent} from './form/form.component';

const routes: Routes = [
  {path: '', component: CityComponent},
  {path: 'edit/:id', component: FormComponent},
  {path: 'add', component: FormComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule {
}
