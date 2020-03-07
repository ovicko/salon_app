import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { SalonRatingPage } from '../salon-rating/salon-rating.page';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-history",
  templateUrl: "./history.page.html",
  styleUrls: ["./history.page.scss"]
})
export class HistoryPage implements OnInit {
  historyBookings: Observable<any>;
  dataReturned: any;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private modalController: ModalController
  ) {
    this.historyBookings = this.bookingService.getBookingHistory();
  }

  ngOnInit() {}

  async openRatingPage(salonName: string,salonId:number,bookingId:number) {
    const modal = await this.modalController.create({
      component: SalonRatingPage,
      componentProps: {
        customerId: this.authService.getUserId(),
        salonId: salonId,
        bookingId: bookingId,
        paramTitle: "Rate " + salonName
      }
    });

    modal.onDidDismiss().then(dataReturned => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });

    return await modal.present();
  }
}
