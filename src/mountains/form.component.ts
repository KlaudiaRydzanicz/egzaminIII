import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MountainService} from "../../services/mountain.service";
import {Router} from "@angular/router";
import {MountainsComponent} from "../mountains/mountains.component";
import {Mountain} from "../../models/mountain";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  newForm!: FormGroup;
  private id: string = '';
  message: string = '';
  mountainToEdit!: Mountain;
  regexURL = /(pl.wikipedia.org|en.wikipedia.org)/gm;
  regexDD = /^[-+]?([1-8]?\d(.\d+)?|90(.0+)?),\s*[-+]?(180(.0+)?|((1[0-7]\d)|([1-9]?\d))(.\d+)?)$/;

  constructor(private mountainService: MountainService, private router: Router) {
    this.newForm = new FormGroup({
      name: new FormControl('', Validators.required),
      location: new FormControl('', [Validators.required, Validators.pattern(this.regexDD)]),
      url: new FormControl('', [Validators.required, Validators.pattern(this.regexURL)]),
      pasmo: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    if(this.mountainService.selectedMountain) {
      console.log('edit');
      this.mountainService.getMountain(this.mountainService.selectedMountain.id).subscribe((data: Mountain) =>{
        this.mountainToEdit = {
          id: data.id,
          name: data.name,
          pasmo: data.pasmo,
          location: data.location,
          url: data.url
        }
        this.newForm.patchValue(this.mountainToEdit);
      })
    }
    return this.newForm.value;
  }

  addNewMountain() {
    let values = this.newForm.value;
    values.id = '_' + Math.random().toString(36).substr(2, 9);
    this.mountainService.addNew(values).subscribe(() => {
      console.log('added');
      this.router.navigateByUrl(`/`).catch(console.error);
    })
  }

  errorMessage(controlName: string, errorName: string): boolean {
    return this.newForm.controls[controlName].touched && this.newForm.controls[controlName]?.errors?.[errorName];
  }

  patternErrorMessage(controlName: string, errorName: string): boolean {
    return this.newForm.controls[controlName].touched && this.newForm.controls[controlName]?.errors?.[errorName];
  }
  editMountain() {
    this.mountainService.editMountain(this.newForm.value, this.mountainToEdit.id).subscribe(() => {
      this.router.navigateByUrl('/').catch(console.error);
    })
  }
}
