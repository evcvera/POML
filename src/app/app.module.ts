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
import {SideBarComponent} from './side-bar/side-bar.component';
import {SideBarFormComponent} from './side-bar/Components/side-bar-form/side-bar-form.component';
import {EchartLifeTimeComponent} from './pages/metrics/components/echart-life-time/echart-life-time.component';
import {UserMetricsComponent} from './pages/metrics/components/user-metrics/user-metrics.component';
import {ThousandsPipePipe} from './core/pipes/thousands-pipe.pipe';
import {SalesComponent} from './pages/sales/sales.component';
import {MetricsComponent} from './pages/metrics/metrics.component';
import {BottomNavBarComponent} from './bottom-nav-bar/bottom-nav-bar.component';
import {CloseIconComponent} from './svg-icons/close-icon/close-icon.component';
import {SearchItemsGroupComponent} from './pages/sales/components/search-items-group/search-items-group.component';
import {SalesContainerComponent} from './pages/sales/components/sales-container/sales-container.component';
import {SalesItemComponent} from './sharedComponents/sales-item/sales-item.component';
import {FullIconComponent} from './svg-icons/full-icon/full-icon.component';
import {SalesPaginatorComponent} from './sharedComponents/sales-paginator/sales-paginator.component';
import {SalesItemClassifiedComponent} from './sharedComponents/sales-item-classified/sales-item-classified.component';
import {SalesZipCodeModalComponent} from './pages/sales/components/sales-zip-code-modal/sales-zip-code-modal.component';
import {SalesMeliHeaderComponent} from './sharedComponents/sales-meli-header/sales-meli-header.component';
import {StarRatingComponent} from './sharedComponents/star-rating/star-rating.component';
import {SalesFavouritesComponent} from './pages/sales-favourites/sales-favourites.component';
import {ZipCodeModalMobileComponent} from './pages/sales/componets-mobile/zip-code-modal-mobile/zip-code-modal-mobile.component';
import {GeneralPopupComponent} from './sharedComponents/general-popup/general-popup.component';
import {SortItemMobileComponent} from './pages/sales/componets-mobile/sort-item-mobile/sort-item-mobile.component';
import {SubTextComponent} from './sharedComponents/sub-text/sub-text.component';
import {CurrentDolarComponent} from './pages/metrics/components/current-dolar/current-dolar.component';
import {CardMetricInfoComponent} from './pages/metrics/components/card-metric-info/card-metric-info.component';
import {DatePipe} from '@angular/common';
import {SideBarFiltersComponent} from './pages/sales/components/side-bar-filters/side-bar-filters.component';
import {ExpectedTimeRemainingComponent} from './pages/metrics/components/expected-time-remaining/expected-time-remaining.component';
import {MeliFiltersComponent} from './pages/sales/components/meli-filters/meli-filters.component';
import {FiltersMobileComponent} from './sharedComponents/filters-mobile/filters-mobile.component';
import {FilterItemComponent} from './pages/sales/components/meli-filters/components/filter-item/filter-item.component';
import {SelectedFilterComponent} from './pages/sales/components/meli-filters/components/selected-filter/selected-filter.component';
import {ItemFilterMobileComponent} from './sharedComponents/filters-mobile/component/item-filter-mobile/item-filter-mobile.component';
import {PriceTypeComponent} from './pages/sales/components/meli-filters/components/price-type/price-type.component';
import {BlockUIModule} from 'ng-block-ui';
import { PriceTypeMobileComponent } from './pages/sales/componets-mobile/price-type-mobile/price-type-mobile.component';
import { CompleteFormComponent } from './sharedComponents/complete-form/complete-form.component';
import { SalesFilterMobileComponent } from './pages/sales/componets-mobile/sales-filter-mobile/sales-filter-mobile.component';
import { SingleItemComponent } from './pages/single-item/single-item.component';
import { SaleItemDeskComponent } from './pages/single-item/sale-item-desk/sale-item-desk.component';
import { SingleItemDeskComponent } from './pages/single-item/sale-item-desk/components/single-item-desk/single-item-desk.component';
import { TiniLeftImgComponent } from './pages/single-item/sale-item-desk/components/tini-left-img/tini-left-img.component';
import { MiddleColComponent } from './pages/single-item/sale-item-desk/components/middle-col/middle-col.component';

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
    SalesItemComponent,
    FullIconComponent,
    SalesPaginatorComponent,
    SalesItemClassifiedComponent,
    SalesZipCodeModalComponent,
    SalesMeliHeaderComponent,
    StarRatingComponent,
    SalesFavouritesComponent,
    ZipCodeModalMobileComponent,
    GeneralPopupComponent,
    SortItemMobileComponent,
    SubTextComponent,
    CurrentDolarComponent,
    CardMetricInfoComponent,
    SideBarFiltersComponent,
    ExpectedTimeRemainingComponent,
    MeliFiltersComponent,
    FiltersMobileComponent,
    FilterItemComponent,
    SelectedFilterComponent,
    ItemFilterMobileComponent,
    PriceTypeComponent,
    PriceTypeMobileComponent,
    CompleteFormComponent,
    SalesFilterMobileComponent,
    SingleItemComponent,
    SaleItemDeskComponent,
    SingleItemDeskComponent,
    TiniLeftImgComponent,
    MiddleColComponent
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
    BlockUIModule.forRoot({
      message: 'Cargando...'
    }),
  ],
  providers: [EchartModelService, CasaModelService, CasaService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {
}
