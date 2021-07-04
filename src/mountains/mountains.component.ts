import { Component, OnInit } from '@angular/core';
import {MountainService} from "../../services/mountain.service";
import {Mountain} from "../../models/mountain";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mountains',
  templateUrl: './mountains.component.html',
  styleUrls: ['./mountains.component.scss']
})
export class MountainsComponent implements OnInit {
  mountains!: Mountain[];
  selectedMountain!: Mountain;

  constructor(private mountainService: MountainService, private router: Router) { }

  ngOnInit(): void {
    this.getMountains();
  }

  getMountains(): void {
    this.mountainService.getAllMountains().subscribe((mountains: Mountain[]) => {
      this.mountains = mountains;
      console.log(mountains);
    })
  }

  show(mountain: Mountain): void {
    console.log(mountain);
    this.selectedMountain = mountain;
  }

  edit(mountain: Mountain): void {
    console.log('edit', mountain);
    this.mountainService.selectedMountain = mountain;
    this.router.navigateByUrl(`/edit`).catch(console.error);
  }
}
