import {Component, Input, OnInit} from '@angular/core';
import {City} from '../models/City';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss']
})
export class CityDetailComponent implements OnInit {
  @Input() modal: any;
  @Input() currentCity!: City;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }
}
