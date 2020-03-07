import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';
import { SalonService } from 'src/app/services/salon.service';
import { SalonRating } from 'src/app/models/SalonRating';

@Component({
  selector: "app-salon-rating",
  templateUrl: "./salon-rating.page.html",
  styleUrls: ["./salon-rating.page.scss"]
})
export class SalonRatingPage implements OnInit {
  customerId: number;
  salonId: number;
  bookingId: number;
  modalTitle: string;
  customerRating:number;
  salonRatingModel:SalonRating;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private salonService: SalonService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.customerId = this.navParams.data.customerId;
    this.salonId = this.navParams.data.salonId;
    this.bookingId = this.navParams.data.bookingId;
    this.modalTitle = this.navParams.data.paramTitle;
    this.salonRatingModel = new SalonRating()

  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  logRatingChange(rating) {
    console.log("changed rating: ", rating);
    this.customerRating = rating;
  }
  submitSalonReview(form: NgForm) {
    this.salonRatingModel.bookingId = this.bookingId;
    this.salonRatingModel.comment = form.value.comment;
    this.salonRatingModel.customerId = this.customerId;
    this.salonRatingModel.salonId = this.salonId;
    this.salonRatingModel.rating = this.customerRating;

    this.salonService.rateSalon(this.salonRatingModel);
  }
}
