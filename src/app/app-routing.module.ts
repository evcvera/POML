import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {SalesComponent} from './pages/sales/sales.component';
import {MetricsComponent} from './pages/metrics/metrics.component';
import {SalesFavouritesComponent} from './pages/sales-favourites/sales-favourites.component';
import {ZipCodeModalMobileComponent} from './pages/sales/componets-mobile/zip-code-modal-mobile/zip-code-modal-mobile.component';
import {SingleItemComponent} from './pages/single-item/single-item.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'sales', component: SalesComponent},
  {path: 'metrics', component: MetricsComponent},
  {path: 'sales/favourites', component: SalesFavouritesComponent},
  {path: 'sales/zipcode', component: ZipCodeModalMobileComponent},
  {path: 'sales/item/:id', component: SingleItemComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
