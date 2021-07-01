import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {City} from '../models/City';
import {CityService} from '../city.service';
import {Router} from '@angular/router';
import {CityDetailComponent} from "../city-detail/city-detail.component";


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  @Input() cities: City[] = [];
  currentIndex = -1;

  constructor(private cityService: CityService, private modalService: NgbModal, private router: Router) {
  }

  ngOnInit(): void {
    this.showCities();
  }

  showCities(): void {
    this.cityService.getAllCities().subscribe((cities: City[]) => {
      this.cities = cities;
    });
  }

  editObject(city: City): void {
    this.router.navigateByUrl(`/edit/${city.id}`).catch(console.error);
  }

  newObject(): void {
    this.router.navigateByUrl(`/add`).catch(console.error);
  }

  deleteCity(id: string): void {
    this.cityService.delete(id).subscribe(() => {
      this.showCities();
    });
  }

  open(currentCity: City): void {
    const modalRef = this.modalService.open(CityDetailComponent, {ariaLabelledBy: 'modal-basic-title'})
    modalRef.componentInstance.currentCity = currentCity;
  }
}
