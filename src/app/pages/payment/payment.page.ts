import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EnvService } from 'src/app/services/env.service';
import { BookingData } from 'src/app/models/BookingData';
import { SalonServices } from 'src/app/models/SalonServices';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
declare var SqPaymentForm: any; //magic to allow us to access the SquarePaymentForm lib

@Component({
  selector: "app-payment",
  templateUrl: "./payment.page.html",
  styleUrls: ["./payment.page.scss"]
})
export class PaymentPage implements OnInit, AfterViewInit {
  bookingFormData: BookingData;
  selectedServices: SalonServices[];
  totalCost: string;
  httpClient: HttpClient;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public alertController: AlertController,
    public alertService: AlertService,
    private bookingService: BookingService,
    private router: Router,
    private envService: EnvService
  ) {}

  paymentUrl: string;

  paymentForm; //this is our payment form object

  ngOnInit() {
    if (this.route.snapshot.data["special"]) {
      this.bookingFormData = this.route.snapshot.data["special"];
      console.log("accessing my data");
      console.log(this.bookingFormData.salonId);
    }

    this.paymentUrl = this.envService.API_URL + "square/nonce";
    // Set the application ID
    var applicationId = this.envService.squareApplicationId
    var _httpClient = this.http;
    var _bookingFormData = this.bookingFormData;
    let _bookingService = this.bookingService;
    let _envService = this.envService;
    let _router = this.router;
    let _alertService = this.alertService;

    // Set the location ID
    var locationId = this.envService.squareLocationId;
    this.paymentForm = new SqPaymentForm({
      // Initialize the payment form elements
      applicationId: applicationId,
      locationId: locationId,
      inputClass: "sq-input",
      inputStyles: [
        {
          fontSize: "18px",
          fontFamily: "Helvetica Neue",
          padding: "10px",
          color: "#373F4A",
          lineHeight: "24px",
          placeholderColor: "#BDBFBF"
        }
      ],

      cardNumber: {
        elementId: "sq-card-number",
        placeholder: "XXXX XXXX XXXX XXXX"
      },
      cvv: {
        elementId: "sq-cvv",
        placeholder: "CVV"
      },
      expirationDate: {
        elementId: "sq-expiration-date",
        placeholder: "MM/YY"
      },
      postalCode: {
        elementId: "sq-postal-code",
        placeholder: "123456"
      },

      // SqPaymentForm callback functions
      callbacks: {
        /*
         * callback function: methodsSupported
         * Triggered when: the page is loaded.
         */
        methodsSupported: function(methods) {
          var applePayBtn = document.getElementById("sq-apple-pay");
          var applePayLabel = document.getElementById("sq-apple-pay-label");
          var masterpassBtn = document.getElementById("sq-masterpass");
          var masterpassLabel = document.getElementById("sq-masterpass-label");

          // Only show the button if Apple Pay for Web is enabled
          // Otherwise, display the wallet not enabled message.
          if (methods.applePay === true) {
            applePayBtn.style.display = "inline-block";
            applePayLabel.style.display = "none";
          }
          // Only show the button if Masterpass is enabled
          // Otherwise, display the wallet not enabled message.
          if (methods.masterpass === true) {
            masterpassBtn.style.display = "inline-block";
            masterpassLabel.style.display = "none";
          }
        },

        /*
         * callback function: createPaymentRequest
         * Triggered when: a digital wallet payment button is clicked.
         */
        createPaymentRequest: function() {
          // The payment request below is provided as
          // guidance. You should add code to create the object
          // programmatically.
          return {
            requestShippingAddress: true,
            currencyCode: "USD",
            countryCode: "US",
            total: {
              label: "Hakuna",
              amount: "100",
              pending: false
            },
            lineItems: [
              {
                label: "Subtotal",
                amount: "100",
                pending: false
              }
            ]
          };
        },

        /*
         * callback function: cardNonceResponseReceived
         * Triggered when: SqPaymentForm completes a card nonce request
         */
        cardNonceResponseReceived: function(errors, nonce, cardData) {
          if (errors) {
            // Log errors from nonce generation to the Javascript console
            console.log("Encountered errors:");
            errors.forEach(function(error) {
              console.log("  " + error.message);
            });

            return;
          }

          let headers = new HttpHeaders();
          headers.append("Content-Type", "application/json");
          headers.append("Accept", "application/json");
          headers.append("Access-Control-Allow-Origin", "*");
          headers.append("Origin", "http://localhost:8100");

          _bookingService.bookSalon(_bookingFormData, nonce).subscribe(
            data => {
              console.log(data)
              _alertService.presentAlert(
                "Message",
                "Payment successful",
                "Payment status: " + data,
                ["OK"]
              );
              console.log("response data")
              console.log(data)
              _router.navigateByUrl("/booking");
              if (data === "COMPLETED") {

              }
            },
            error => {
              console.log(error);
              _alertService.presentAlert(
                "Payment Error",
                "Payment status",
                "Payment status: " + error,
                ["OK"]
              );
            }
          );
    
      },

        /*
         * callback function: unsupportedBrowserDetected
         * Triggered when: the page loads and an unsupported browser is detected
         */
        unsupportedBrowserDetected: function() {
          /* PROVIDE FEEDBACK TO SITE VISITORS */
        },

        /*
         * callback function: inputEventReceived
         * Triggered when: visitors interact with SqPaymentForm iframe elements.
         */
        inputEventReceived: function(inputEvent) {
          switch (inputEvent.eventType) {
            case "focusClassAdded":
              /* HANDLE AS DESIRED */
              break;
            case "focusClassRemoved":
              /* HANDLE AS DESIRED */
              break;
            case "errorClassAdded":
              /* HANDLE AS DESIRED */
              break;
            case "errorClassRemoved":
              /* HANDLE AS DESIRED */
              break;
            case "cardBrandChanged":
              /* HANDLE AS DESIRED */
              break;
            case "postalCodeChanged":
              /* HANDLE AS DESIRED */
              break;
          }
        },

        /*
         * callback function: paymentFormLoaded
         * Triggered when: SqPaymentForm is fully loaded
         */
        paymentFormLoaded: function() {
          /* HANDLE AS DESIRED */
        }
      }
    });

    this.paymentForm.build();
  }
  requestCardNonce(event) {
    // Don't submit the form until SqPaymentForm returns with a nonce
    event.preventDefault();

    // Request a nonce from the SqPaymentForm object
    this.paymentForm.requestCardNonce();
  }
  ngAfterViewInit() {
    // this.paymentForm.build()
    //this.paymentForm.recalculateSize();
  }

}
