import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {SalesComponent} from './pages/sales/sales.component';
import {MetricsComponent} from './pages/metrics/metrics.component';
import {SalesFavouritesComponent} from './pages/sales-favourites/sales-favourites.component';
import {ShoppingCartComponent} from './pages/shopping-cart/shopping-cart.component';
import {ZipCodeModalMobileComponent} from './sharedComponents/zip-code-modal-mobile/zip-code-modal-mobile.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'sales', component: SalesComponent},
  {path: 'metrics', component: MetricsComponent},
  {path: 'sales/favourites', component: SalesFavouritesComponent},
  {path: 'sales/cart', component: ShoppingCartComponent},
  {path: 'sales/zipcode', component: ZipCodeModalMobileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
