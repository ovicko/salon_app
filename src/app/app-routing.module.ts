import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { SalonDataResolverService } from './resolver/salon-data-resolver.service';
const routes: Routes = [
  {
    path: "",
    redirectTo: "landing",
    pathMatch: "full"
  },

  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },

  {
    path: "salons",
    loadChildren: () =>
      import("./pages/salons/salons.module").then(m => m.SalonsPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: "salons/:id",
    loadChildren: () =>
      import("./pages/salon-details/salon-details.module").then(
        m => m.SalonDetailsPageModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/auth/login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: "register",
    loadChildren: () =>
      import("./pages/auth/register/register.module").then(
        m => m.RegisterPageModule
      )
  },
  {
    path: "landing",
    loadChildren: () =>
      import("./pages/landing/landing.module").then(m => m.LandingPageModule)
  },
  {
    path: "booking",
    loadChildren: () =>
      import("./pages/booking/booking.module").then(m => m.BookingPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "account",
    loadChildren: () =>
      import("./pages/account/account.module").then(m => m.AccountPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "account/:link",
    loadChildren: () =>
      import("./pages/website/website.module").then(m => m.WebsitePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "cart",
    resolve: {
      special: SalonDataResolverService
    },
    loadChildren: () =>
      import("./pages/cart/cart.module").then(m => m.CartPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "payment",
    resolve: {
      special: SalonDataResolverService
    },
    loadChildren: () =>
      import("./pages/payment/payment.module").then(m => m.PaymentPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "edit-account",
    loadChildren: () =>
      import("./pages/edit-account/edit-account.module").then(
        m => m.EditAccountPageModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: "map",
    loadChildren: () =>
      import("./pages/map/map.module").then(m => m.MapPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "salon-rating",
    loadChildren: () =>
      import("./pages/salon-rating/salon-rating.module").then(
        m => m.SalonRatingPageModule
      ),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
