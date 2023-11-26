import { Injectable } from '@angular/core';
import {map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Country} from "../common/country";
import {State} from "../common/state";

@Injectable({
  providedIn: 'root'
})
export class ShopformService {

  private countriesUrl: string = "http://localhost:8080/countries";
  private statesUrl: string = "http://localhost:8080/states/search";
  constructor(private httpClient: HttpClient) { }
  getCreditCardMonths(startMonth: number): Observable<number[]>{
    let data: number[] = [];

    for(let theMonth=startMonth;theMonth<=12;theMonth++){
      data.push(theMonth);
    }
    return of(data);
  }
  getCreditCardYears(): Observable<number[]>{
    let data: number[] =[];
    let startYear: number = new Date().getFullYear();
    for(let theYear=startYear;theYear<=startYear+10;theYear++){
      data.push(theYear)
    }
    return of(data);
  }
  retrieveCountries(): Observable<Country[]>{
    return this.httpClient.get<GetCountryResponse>(this.countriesUrl).pipe(map(data => data._embedded.countries));
  }
  retrieveStates(countryCode: string):Observable<State[]>{
    return this.httpClient.get<GetStateResponse>(`${this.statesUrl}/findByCountryCode?code=${countryCode}`)
        .pipe(map(data => data._embedded.states));
  }
}

interface GetCountryResponse {
  _embedded: {
    countries: Country[]
  }
}
interface GetStateResponse {
  _embedded: {
    states: State[]
  }
}
