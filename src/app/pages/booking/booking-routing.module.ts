import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingPage } from './booking.page';

const routes: Routes = [
  {
    path: '',
    component: BookingPage,
    children:[
      {
        path: 'history',
        loadChildren: () => import('../history/history.module').then(m => m.HistoryPageModule)
        
      },
      {
        path: 'upcoming',
        loadChildren: () => import('../upcoming/upcoming.module').then(m => m.UpcomingPageModule)
        
      },
      {
        path: '',
        redirectTo:'/booking/upcoming',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingPageRoutingModule {}
