import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, NavController } from '@ionic/angular';
import { RegisterPage } from '../pages/auth/register/register.page';
import { LoginPage } from '../pages/auth/login/login.page';
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
		spaceBetween: 2,
		centeredSlides: false,
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

		this.homePageSalons = this.salonService.getHomePageSalons()

	  }

	  ionViewWillEnter() {
		  this.authService.customerDetails().subscribe ( user =>{
			  this.user = user;
		  })
	  }

	navigateToDetailsPage(salonId:number){
		this.router.navigateByUrl('/salons/' + salonId)
	}
}
