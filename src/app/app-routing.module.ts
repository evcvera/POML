import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {SalesComponent} from './pages/sales/sales.component';
import {MetricsComponent} from './pages/metrics/metrics.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'sales', component: SalesComponent},
  {path: 'metrics', component: MetricsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
