import {Component, Input, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {City} from '../models/City';
import {CityService} from '../city.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  @Input() cities: City[] = [];
  @Input() city!: City;
  @Input() currentCity!: City;
  currentIndex = -1;
  closeResult = '';


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
    this.router.navigateByUrl(`/edit/${city.id}`);
  }

  newObject(): void {
    this.router.navigateByUrl(`/add`);
  }

  deleteCity(id: string): void {
    this.cityService.delete(id).subscribe(() => {
      this.showCities();
    });
  }

  open(content: any): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: ModalDismissReasons): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case  ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }

  }
}
