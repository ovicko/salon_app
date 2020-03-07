import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class EnvService {
  // API_URL = "http://192.168.88.251/projects/salon/frontend/web/api/v1/";
  // MAIN_WEBSITE_URL = "http://192.168.88.251/projects/salon/frontend/web/";
  API_URL = "http://192.168.0.101/projects/salon/frontend/web/api/v1/";
  MAIN_WEBSITE_URL = "http://192.168.0.101/projects/salon/frontend/web/";

  // Set the location ID
  squareLocationId = "MHFWK3S10QWF8";
  squareApplicationId = "sandbox-sq0idb-JBqQQhccdhbt5Clb8CyaYA";

  constructor() {}
}
