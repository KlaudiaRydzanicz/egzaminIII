import {Component, Input, OnInit} from '@angular/core';

import {CityComponent} from '../city/city.component';
import { City } from '../models/City';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss']
})
export class CityDetailComponent implements OnInit {
@Input() modal: any;
  currentCity!: City ;
  constructor(private cityComponent: CityComponent) { }

  ngOnInit(): void {
  this.currentCity = this.cityComponent.currentCity;
  }

}
