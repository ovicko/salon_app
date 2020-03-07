import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: "app-upcoming",
  templateUrl: "./upcoming.page.html",
  styleUrls: ["./upcoming.page.scss"]
})
export class UpcomingPage implements OnInit {
  upcomingBookings: Observable<any>;

  constructor(
    private bookingService: BookingService,
    private activatedRoute: ActivatedRoute,
    private navController : NavController,
    private router: Router
  ) {
    this.upcomingBookings = this.bookingService.getUpcomingBookings();
  }

  ngOnInit() {}

  openMap(booking : any ) {

    let location = {
      latitude: booking.latitude,
      longitude:booking.longitude
    };

    this.bookingService.setLocationData(location)
    this.navController.navigateForward("map");
   // this.router.navigateByUrl("/map");
  }
}
