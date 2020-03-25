import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-website',
  templateUrl: './website.page.html',
  styleUrls: ['./website.page.scss'],
})
export class WebsitePage implements OnInit {

  browserOptions: InAppBrowserOptions = {
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    enableViewportScale: 'no', //iOS only 
    fullscreen: 'yes',//Windows only    
  };

  	/**
	 * Constructor of our details page
	 * @param activatedRoute Information about the route we are on
	 */
  constructor(private activatedRoute: ActivatedRoute,private iab: InAppBrowser) { 
  	// Get the ID that was passed with the URL
        let link = this.activatedRoute.snapshot.paramMap.get('link');
        console.log(link)
        let target = "_self";
    const browser = this.iab.create(link, target, this.browserOptions);
        browser.on('loadstop').subscribe(event => {
          browser.insertCSS({ code: "body{color: red;" });
        });

        browser.close();
  	 
  }

  ngOnInit() {
  }

}
