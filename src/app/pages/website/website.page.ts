import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-website',
  templateUrl: './website.page.html',
  styleUrls: ['./website.page.scss'],
})
export class WebsitePage implements OnInit {

  	/**
	 * Constructor of our details page
	 * @param activatedRoute Information about the route we are on
	 */
  constructor(private activatedRoute: ActivatedRoute,private iab: InAppBrowser) { 
  	// Get the ID that was passed with the URL
        let link = this.activatedRoute.snapshot.paramMap.get('link');
        console.log(link)
        const browser = this.iab.create(link);
        browser.on('loadstop').subscribe(event => {
          browser.insertCSS({ code: "body{color: red;" });
        });

        browser.close();
  	 
  }

  ngOnInit() {
  }

}
