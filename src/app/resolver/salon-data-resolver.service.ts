import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { BookingData } from '../models/BookingData';

@Injectable({
  providedIn: 'root'
})
export class SalonDataResolverService implements Resolve<BookingData> {

  constructor(private bookingService: BookingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.bookingService.getBookingFormData();
  }
}
