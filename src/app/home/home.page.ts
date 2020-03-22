import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Customer } from 'src/app/models/customer';
import { SalonService } from '../services/salon.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	user: Customer;

	slideOptions = {
		centeredSlides: false,
		spaceBetween: 2,
		slideShadows: true,
		slidesPerView: 1.6
	}

	homePageSalons: Observable<any>;

	 constructor(
	  	private modalController: ModalController,
	  	private menu: MenuController,
		  private authService: AuthService,
		  private salonService: SalonService,
		  private navCtrl: NavController,
		  private router: Router
	  ) {
		  this.menu.enable(true);
		  
	  }


	  ngOnInit() {

	  }

	  ionViewWillEnter() {
		  this.homePageSalons = this.salonService.getHomePageSalons()
		  this.authService.customerDetails().subscribe ( user =>{
			  this.user = user;
		  })
	  }

	navigateToDetailsPage(salonId:number){
		this.router.navigateByUrl('/salons/' + salonId)
	}
}
