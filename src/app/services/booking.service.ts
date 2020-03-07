import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Booking } from '../models/booking';
import { AuthService } from './auth.service';
import { BookingData } from '../models/BookingData';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingData : BookingData;
  private userId: string;
  private locationData: any;


    /**
   * Constructor of the Service with Dependency Injection
   * @param http The standard Angular HttpClient to make requests
   */
  constructor(private http: HttpClient,
              private env: EnvService,
              private alertService: AlertService,
              private authService:AuthService) {
             this.userId = this.authService.userId
   }

  public getBookingFormData(): BookingData {
    return this.bookingData;
  }


  public setBookingFormData(data: BookingData) {
    this.bookingData = data;
  }

    /**
  * Get data from the Booking API 
  * map the result to return only the results that we need
  * 
  * @returns Observable with the booking results
  */
  getUpcomingBookings(): Observable<any> {

    //return this.http.get(this.env.API_URL + 'booking/customer?customer_id=1')
     return this.http.get(this.env.API_URL + 'booking/customer?customer_id='+this.authService.userId)
    .pipe(
      
      map(results => results)
    );

  }


  getBookingHistory(): Observable<any> {

    //return this.http.get(this.env.API_URL + 'booking/history?customer_id=1')
    return this.http.get(this.env.API_URL + 'booking/history?customer_id='+this.authService.userId)
    .pipe(
      map(results => results)
    );

  }

  bookSalon(bookingData:BookingData,nonce:string){
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Origin", "http://localhost:8100");
    console.log("Starting payment request");
    return this.http.post(this.env.API_URL + 'square/nonce',
      { bookingForm: bookingData, nonce: nonce }, {headers:headers,responseType: 'text'}
    ).pipe(
      tap(response => {
        return response;
      })
    );
  }

  public setLocationData(data) {
    this.locationData = data;
  }

  public getLocationData() {
    return this.locationData;
  }
}
