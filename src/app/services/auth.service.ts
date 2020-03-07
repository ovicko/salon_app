import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { Customer } from '.././models/customer';
import { LoginForm } from '../models/loginform';
import { RegisterForm } from '../models/RegisterForm';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isLoggedIn = false;
  userId = null;
  username = null;
  authKey = null;
  loginForm: LoginForm;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private authService: AuthService,
    private env: EnvService
  ) {}

  login(email: string, password: string) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Origin", "http://localhost:8100");

    return this.http
      .post(
        this.env.API_URL + "customer/login",
        { email: email, password: password },
        { headers: headers }
      )
      .pipe(
        tap(response => {
          console.log(response);
          if (response["code"] === 201) {
            this.authKey = response["user"]["auth_key"];
            this.username = response["user"]["username"];
            this.userId = response["user"]["id"];

            this.isLoggedIn = true;
            this.storage.setItem("authKey", this.authKey);
            this.storage.setItem("userId", this.userId);
            this.storage.setItem("username", this.username).then(
              () => {
                console.log("Token Stored");
              },
              error => console.error("Error storing item", error)
            );
          } else {
          }

          return response;
        })
      );
  }

  editAccount(userId:number,username: string, email: string, phone: string) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Origin", "http://localhost:8100");

    this.storage.getItem("userId").then(
      data => {
        this.userId = data;
        if (this.userId != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {}
    );

  console.table(this.userId)
    return this.http
      .post(
        this.env.API_URL + "customer/update",
        {
          id: this.userId,
          email: email,
          phone: phone,
          name: username
        },
        { headers: headers }
      )
      .pipe(
        tap(response => {
          console.log(response);
          if (response["code"] === 201) {
            this.authKey = response["user"]["auth_key"];
            this.username = response["user"]["username"];
            this.userId = response["user"]["id"];

            this.isLoggedIn = true;
            this.storage.setItem("authKey", this.authKey);
            this.storage.setItem("userId", this.userId);
            this.storage.setItem("username", this.username).then(
              () => {
                console.log("Token Stored");
              },
              error => console.error("Error storing item", error)
            );
          } else {
          }

          return response;
        })
      );
  }

  register(registerModel: RegisterForm) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Origin", "http://localhost:8100");
    console.log("start Register response");
    return this.http
      .post(this.env.API_URL + "customer/create", registerModel, {
        headers: headers
      })
      .pipe(
        tap(response => {
          console.log("Register response");
          console.log(response);
          return response;
        })
      );
  }

  logout() {
    this.storage.remove("authKey");
    this.isLoggedIn = false;
    delete this.authKey;
  }

  getToken() {
    return this.storage.getItem("authKey").then(
      data => {
        this.authKey = data;
        if (this.authKey != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.authKey = null;
        this.isLoggedIn = false;
      }
    );
  }

  getUserName() {
    return this.storage.getItem("username").then(
      data => {
        this.username = data;
        if (this.authKey != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.authKey = null;
        this.isLoggedIn = false;
      }
    );
  }

  getUserId() {
    return this.userId;
  }

  customerDetails() {
    const headers = new HttpHeaders({
      Authorization: this.authKey
    });

    return this.http
      .get<Customer>(this.env.API_URL + "customer/view?id=" + this.userId, {
        headers: headers
      })
      .pipe(
        tap(user => {
          return user;
        })
      );
  }
}
                        