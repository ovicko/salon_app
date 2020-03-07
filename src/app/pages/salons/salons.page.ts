import { Component, OnInit } from '@angular/core';
import { SalonService } from './../../services/salon.service';
import { Observable } from 'rxjs';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NearbySalons } from 'src/app/models/NearbySalons';
declare var google;

@Component({
  selector: "app-salons",
  templateUrl: "./salons.page.html",
  styleUrls: ["./salons.page.scss"]
})
export class SalonsPage implements OnInit {
  results: Observable<any>;
  latitude: any;
  longitude: any;
  nearbyLocation: NearbySalons;

  constructor(
    private salonService: SalonService,
    private geolocation: Geolocation
  ) {
    this.nearbyLocation = new NearbySalons();
    this.results = this.salonService.getAllSalons();
    console.log(this.results);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        console.log("Current lat");
        console.log(this.latitude);
        console.log("Current long");
        console.log(this.longitude);
        this.nearbyLocation.distance = "25"
        this.nearbyLocation.longitude = this.longitude;
        this.nearbyLocation.latitude = this.latitude;
        this.results = this.salonService.nearBySalons(this.nearbyLocation);
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }
}
