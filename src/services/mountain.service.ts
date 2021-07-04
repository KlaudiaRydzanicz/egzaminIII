import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Mountain} from "../models/mountain";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MountainService {
  selectedMountain!: Mountain;

  constructor(private http: HttpClient) {
  }

  getAllMountains(): Observable<Mountain[]> {
    return this.http.get<Mountain[]>(`${environment.localApiUrl}mountains`);
  }

  getMountain(id: string): Observable<Mountain> {
    return this.http.get<Mountain>(`${environment.localApiUrl}mountains/${id}`)
  }

  addNew(mountain: Mountain): Observable<void> {
    return this.http.post<void>(`${environment.localApiUrl}mountains`, mountain);
  }

  editMountain(mountain: Mountain, id: string): Observable<void> {
    return this.http.put<void>(`${environment.localApiUrl}mountains/${id}`, mountain);
  }
}
