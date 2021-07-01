import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {City} from './models/City';

@Injectable()
export class CityService {
  constructor(private http: HttpClient) {
  }

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(`${environment.localApiUrl}/city`);
  }

  getCity(id: string): Observable<City> {
    return this.http.get<City>(`${environment.localApiUrl}/city/${id}`);
  }

  updateCity(city: City, id: string): Observable<void> {
    return this.http.put<void>(`${environment.localApiUrl}/city/${id}`, city);
  }

  addNewCity(city: City): Observable<void> {
    return this.http.post<void>(`${environment.localApiUrl}/city`, city);
  }

  delete(cityId: string): Observable<void> {
    return this.http.delete<void>(`${environment.localApiUrl}/city/${cityId}`);

  }
}
