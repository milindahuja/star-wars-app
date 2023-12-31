import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CharacterResponse, DetailResponse } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://www.swapi.tech/api';
  private limit = 10;

  constructor(private http: HttpClient) {}

  private fetchData(url: string): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(url).pipe(
      map((response: CharacterResponse) => response)
    );
  }

  getCharacters(page: number): Observable<CharacterResponse> {
    const url = `${this.apiUrl}/people?page=${page}&limit=${this.limit}`;
    return this.fetchData(url);
  }

  getPageByUrl(url: string): Observable<CharacterResponse> {
    return this.fetchData(url);
  }

  getDetailById(id: string, detailType: string): Observable<DetailResponse> {
    const url = `${this.apiUrl}/${detailType}/${id}`;
    return this.http.get<DetailResponse>(url);
  }
}
