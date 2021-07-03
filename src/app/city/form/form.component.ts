import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CityComponent} from '../city/city.component';
import {City} from '../models/City';
import {CityService} from '../city.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  id = '';
  city!: City;
  submitted = false;
  message = '';
  form: FormGroup;
  regexURL = /(pl.wikipedia.org|en.wikipedia.org)/gm;
  regexDD = /^[-+]?([1-8]?\d(.\d+)?|90(.0+)?),\s*[-+]?(180(.0+)?|((1[0-7]\d)|([1-9]?\d))(.\d+)?)$/;

  constructor(private cityService: CityService, private cityComponent: CityComponent, private aRoute: ActivatedRoute,
              private router: Router) {
    this.form = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        location: new FormControl('', [Validators.required, Validators.pattern(this.regexDD)]),
        description: new FormControl('', [Validators.required]),
        url: new FormControl('', [Validators.required, Validators.pattern(this.regexURL)])
      });
    this.aRoute.params.subscribe(params => this.id = params.id);
  }

  errorMessage(controlName: string, errorName: string): boolean {
    return this.form.controls[controlName].touched &&  this.form.controls[controlName]?.errors?.[errorName];
  }

  ngOnInit(): void {
    if (this.id) {
      this.cityService.getCity(this.id).subscribe((data: City) => {
        this.city = {
          id: this.id,
          name: data.name,
          location: data.location,
          description: data.description,
          url: data.url
        };
        this.form.patchValue(this.city);
      });
    }
    return this.form.value;
  }

  upDate(): void {
    if (this.city) {
      this.cityService.updateCity(this.form.value, this.city.id).subscribe(() => {
        this.message = 'Edit City';
        this.router.navigateByUrl(`/`).catch(console.error);
        this.submitted = true;
        this.cityComponent.showCities();
      });
      return;
    }

    this.message = 'Add new City';
    const newValue = this.form.value;
    newValue.id = '_' + Math.random().toString(36).substr(2, 9);
    this.cityService.addNewCity(newValue).subscribe(() => {
      this.submitted = true;
      this.cityComponent.showCities();
    });
  }
}
