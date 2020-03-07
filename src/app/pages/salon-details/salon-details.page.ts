import { Component, OnInit, ViewChild } from '@angular/core';
import { SalonService } from './../../services/salon.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SalonServices } from 'src/app/models/SalonServices';
import { IonSlides, AlertController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { BookingService } from 'src/app/services/booking.service';
import { BookingData } from 'src/app/models/BookingData';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: "app-salon-details",
  templateUrl: "./salon-details.page.html",
  styleUrls: ["./salon-details.page.scss"]
})
export class SalonDetailsPage implements OnInit {
  public salonServices: Observable<SalonServices> = null;
  private bookingForm : BookingData;
  private salonId:number;
  public appointmentDate: string;

  sliderConfig = {
    // slidesPerView: 1.6,
    // spaceBetween: 1,
    centeredSlides: false
  };

  information = null;
  salonReviews = null;
  segment = 0;

  @ViewChild("slides", { static: true }) slider: IonSlides;

  /**
   * Constructor of our details page
   * @param activatedRoute Information about the route we are on
   * @param salonService The salon Service to get data
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private router : Router,
    public alertController: AlertController,
    public alertService: AlertService,
    private bookingService: BookingService,
    private navController: NavController,
    private datePipe: DatePipe,
    private authService : AuthService,
    private salonService: SalonService
  ) {
    // Get the ID that was passed with the URL
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.salonId = parseInt(id);

    // Get the information from the API
    this.salonService.getDetails(id).subscribe(result => {
      this.information = result;
    });

    this.salonServices = this.salonService.getSalonServices(id);
    this.salonReviews = this.salonService.getSalonReviews(id);

    this.appointmentDate = new Date().toISOString();

    this.bookingForm = new BookingData();
  }

  ngOnInit() {

  }

  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  selectedServices = [];

  addCheckbox(event, checkbox: SalonService) {
    
    if (event.target.checked) {
      this.selectedServices.push(checkbox);
    } else {
      let index = this.removeCheckedFromArray(checkbox);
      this.selectedServices.splice(index, 1);
    }
    
  }

  //Removes checkbox from array when you uncheck it
  removeCheckedFromArray(checkbox: SalonService) {
    return this.selectedServices.findIndex((category) => {
      return category === checkbox;
    })
  }

  //Empties array with checkedboxes
  emptyCheckedArray() {
    this.selectedServices = [];
  }

  getCheckedBoxes() {
    //Do whatever
    console.log(this.selectedServices);
  }

  openMap(salonDetail: any) {

    let location = {
      latitude: salonDetail.latitude,
      longitude: salonDetail.longitude
    };

    this.bookingService.setLocationData(location)
    this.navController.navigateForward("map");
    // this.router.navigateByUrl("/map");
  }

  checkoutPage() {
    if (this.selectedServices.length < 1) {
      this.alertService.presentAlert("Alert", 
      "Salon Services", "No service selected! Select atleast one to continue",['OK'])
    } else {
      let _pickedDate = this.datePipe.transform(this.appointmentDate, "MMM d, y, h:mm a");

      this.bookingForm.bookedServices = this.selectedServices;
      this.bookingForm.salonId = this.salonId;
      this.bookingForm.customerId = this.authService.userId;
      this.bookingForm.bookingDate = _pickedDate;
      console.log(this.bookingForm)
      this.bookingService.setBookingFormData(this.bookingForm)
      this.router.navigateByUrl('/cart')

      //console.log(this.bookingForm)
    }
  }

}


