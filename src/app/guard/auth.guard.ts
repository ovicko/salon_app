import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
    ) {}
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isLoggedIn) {
          // authorised so return true
          return true;
        } else {
          // not logged in so redirect to login page with the return url
          this.router.navigate(['/landing']);
          return false;
        }
      }
    }