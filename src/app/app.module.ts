import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {EchartModelService} from './core/mode-services/echart-model.service';
import {NgxEchartsModule} from 'ngx-echarts';
import * as echarts from 'echarts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CasaModelService} from './core/mode-services/casa-model.service';
import {CasaService} from './core/services/casa.service';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SideBarFormComponent } from './side-bar/Components/side-bar-form/side-bar-form.component';
import { EchartLifeTimeComponent } from './pages/metrics/components/echart-life-time/echart-life-time.component';
import { UserMetricsComponent } from './pages/metrics/components/user-metrics/user-metrics.component';
import { ThousandsPipePipe } from './core/pipes/thousands-pipe.pipe';
import { SalesComponent } from './pages/sales/sales.component';
import { MetricsComponent } from './pages/metrics/metrics.component';
import { BottomNavBarComponent } from './bottom-nav-bar/bottom-nav-bar.component';
import { CloseIconComponent } from './svg-icons/close-icon/close-icon.component';
import { SearchItemsGroupComponent } from './pages/sales/search-items-group/search-items-group.component';
import { SalesContainerComponent} from './pages/sales/sales-container/sales-container.component';
import { SalesItemComponent } from './pages/sales/sales-item/sales-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    SideBarComponent,
    SideBarFormComponent,
    EchartLifeTimeComponent,
    UserMetricsComponent,
    ThousandsPipePipe,
    SalesComponent,
    MetricsComponent,
    BottomNavBarComponent,
    CloseIconComponent,
    SearchItemsGroupComponent,
    SalesContainerComponent,
    SalesItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [EchartModelService, CasaModelService, CasaService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
