import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { BookingService } from 'src/app/services/booking.service';
declare var google;

@Component({
  selector: "app-map",
  templateUrl: "./map.page.html",
  styleUrls: ["./map.page.scss"]
})
export class MapPage implements OnInit {
  latitude: any;
  longitude: any;
  destinationLatLng: any;
  salonLocation:any;

  currentLatitude: any;
  currentLongitude: any;


  @ViewChild("mapElement", { static: true }) mapNativeElement: ElementRef;

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  constructor(private geolocation: Geolocation,private bookingService: BookingService) {
    this.salonLocation = this.bookingService.getLocationData();
  }

  ngOnInit() {
    this.destinationLatLng = new google.maps.LatLng();
  }

  ngAfterViewInit(): void {
    const that = this;
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
          center: { lat: this.latitude, lng: this.longitude },
          zoom: 15
        });


        that.directionsDisplay.setMap(map);
        console.log("current location: \nLatt" + this.latitude + "\nLong" + this.longitude)
        console.log("salon location: \nLatt" + this.salonLocation.latitude + "\nLong"+this.salonLocation.longitude )
        that.directionsService.route({
          origin: new google.maps.LatLng(this.latitude, this.longitude),
          destination: new google.maps.LatLng(that.salonLocation.latitude, that.salonLocation.longitude),
          travelMode: 'DRIVING'
        }, (response, status) => {
          if (status === 'OK') {
            this.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }
}
