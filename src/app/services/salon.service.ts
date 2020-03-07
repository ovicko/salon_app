import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EnvService } from './env.service';
import { SalonRating } from '../models/SalonRating';
import { NearbySalons } from '../models/NearbySalons';
 

@Injectable({
  providedIn: "root"
})
export class SalonService {
  extras: any;
  
  /**
   * Constructor of the Service with Dependency Injection
   * @param http The standard Angular HttpClient to make requests
   */
  constructor(private http: HttpClient, private env: EnvService) {}

  /**
   * Get data from the OmdbApi
   * map the result to return only the results that we need
   *
   * @returns Observable with the search results
   */
  getAllSalons(): Observable<any> {
    return this.http
      .get(this.env.API_URL + "salon/index")
      .pipe(map(results => results["salons"]));
  }

  /**
   * Get the detailed information for an ID using the "id" parameter
   *
   * @param {string} id imdbID to retrieve information
   * @returns Observable with detailed information
   */
  getDetails(id) {
    return this.http.get(this.env.API_URL + "salon/view?id=" + id);
  }

  getHomePageSalons(): Observable<any[]> {
    return this.http
      .get(this.env.API_URL + "module/index")
      .pipe(map(results => results["modules"]));
  }
  getSalonServices(id): Observable<any> {
    return this.http
      .get(this.env.API_URL + "salon/services?salonId=" + id)
      .pipe(map(results => results));
  }

  getSalonReviews(id): Observable<any> {
    return this.http
      .get(this.env.API_URL + "salon/reviews?salonId=" + id)
      .pipe(map(results => results));
  }

  rateSalon(ratingData: SalonRating) {
    console.log("Starting rating request");
    console.log(ratingData);
    this.http.post(this.env.API_URL + "salon/review", ratingData).subscribe(
      tap(response => {
        console.log("Logging Review response");
        console.log(response);
        return response;
      })
    );
  }

  nearBySalons(location: NearbySalons): Observable<any[]> {
    return this.http
      .post(this.env.API_URL + "salon/nearby", location)
      .pipe(map(results => results["salons"]));
  }

  public setExtras(data) {
    this.extras = data;
  }

  public getExtras() {
    return this.extras;
  }
}