import { Component, OnInit } from '@angular/core';
import { BookingData } from 'src/app/models/BookingData';
import { Router, ActivatedRoute } from '@angular/router';
import { SalonServices } from 'src/app/models/SalonServices';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  bookingFormData : BookingData;
  selectedServices: SalonServices[];
  totalCost:string;

  constructor(private route: ActivatedRoute, private bookingService : BookingService, private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.bookingFormData = this.route.snapshot.data['special'];
      this.selectedServices = this.bookingFormData.bookedServices;
      this.calculateTotal(this.bookingFormData.bookedServices)
    }
  }

  calculateTotal(data : SalonServices[]) {
    var _total: number = 0.00;
    data.forEach((element) => {
      _total += parseFloat(element.price.toString());
    });

    this.bookingFormData.total = _total;
     this.totalCost = _total.toFixed(2);
    console.log(this.bookingFormData)
  }

  payNow(){
    this.bookingService.setBookingFormData(this.bookingFormData)
    this.router.navigateByUrl('/payment')
  }

}
