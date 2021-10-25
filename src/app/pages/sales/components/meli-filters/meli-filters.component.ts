import {Component, OnInit} from '@angular/core';
import {MeliModelService} from '../../../../core/mode-services/meli-model.service';
import {Subscription} from 'rxjs';
import {AvailableFiltersEntity, FiltersEntity, IMeliSearch} from '../../../../core/interfaces/imeli-search';
import {UserDataModelService} from '../../../../core/mode-services/user-data-model.service';

@Component({
  selector: 'app-meli-filters',
  templateUrl: './meli-filters.component.html',
  styleUrls: ['./meli-filters.component.scss']
})
export class MeliFiltersComponent implements OnInit {

  freeSend: boolean;
  canFullSend: boolean;
  fullSend: boolean;
  buttonFullSend: boolean;
  buttonFreeSend: boolean;
  canFreeSend: boolean;
  meliSearchFilters: AvailableFiltersEntity[];
  selectedFilters: AvailableFiltersEntity[];

  searchMeliDataSubscription: Subscription;
  selectedFiltersSubscription: Subscription;

  constructor(public meliModelService: MeliModelService,
              public userDataModelService: UserDataModelService) {
  }

  ngOnInit(): void {
    this.freeSend = false;
    this.fullSend = false;

    this.canFullSend = false;
    this.canFreeSend = false;

    this.buttonFullSend = false;
    this.buttonFreeSend = false;


    if (this.searchMeliDataSubscription) {
      this.searchMeliDataSubscription.unsubscribe();
    }

    this.searchMeliDataSubscription = this.meliModelService.searchMeliData$.subscribe(x => {
      if (x) {
        this.meliSearchFilters = x.available_filters;
        this.getCanFullSend();
        this.getCanFreeSend();
      }
    });

    if (this.selectedFiltersSubscription) {
      this.selectedFiltersSubscription.unsubscribe();
    }

    this.selectedFiltersSubscription = this.meliModelService.selectedFilters$.subscribe(x => {
      if (x !== []) {
        this.selectedFilters = x;
        this.fullSendSelected();
        this.freeSendSelected();
      }
    });
  }

  getCanFullSend(): void {
    this.canFullSend = false;
    if (this.meliSearchFilters) {
      this.meliSearchFilters.forEach(x => {
        if (x.id === 'shipping') {
          x.values.forEach(y => {
            if (y.id === 'fulfillment') {
              this.canFullSend = true;
            }
          });
        }
      });
    }
    if (this.selectedFilters) {
      this.selectedFilters.forEach(x => {
        if (x.id === 'shipping') {
          x.values.forEach(y => {
            if (y.id === 'fulfillment') {
              this.canFullSend = true;
            }
          });
        }
      });
    }
  }

  fullSendSelected(): void {
    this.fullSend = false;
    if (this.selectedFilters) {
      this.selectedFilters.forEach(x => {
        if (x.id === 'shipping') {
          x.values.forEach(y => {
            if (y.id === 'fulfillment') {
              this.fullSend = true;
            }
          });
        }
      });
    }
  }

  setFullSend(): void {
    if (!this.buttonFullSend) {
      this.buttonFullSend = true;
      this.fullSend = !this.fullSend;
      if (this.meliSearchFilters) {
        this.meliSearchFilters.forEach(x => {
          if (x.id === 'shipping') {
            x.values.forEach(y => {
              if (y.id === 'fulfillment') {
                if (this.fullSend) {
                  x.values[0] = y;
                  x.values.length = x.values.length - 1;
                  this.meliModelService.selectedFilters$.value.push(x);
                  this.meliModelService.selectedFilters$.next(this.meliModelService.selectedFilters$.value);
                  this.userDataModelService.pageNumber$.next(0);
                  this.meliModelService.meliSearch(this.userDataModelService.searchData$.value,
                    this.userDataModelService.pageNumber$.value,
                    this.meliModelService.searchSortBy$.value);
                }
              }
            });
          }
        });
        if (!this.fullSend) {
          const index = this.meliModelService.selectedFilters$.value.findIndex(z => z.id === 'shipping' && z.values[0].id === 'fulfillment');
          console.log((index));
          if (index > -1) {
            this.meliModelService.selectedFilters$.value.splice(index, 1);
            this.userDataModelService.pageNumber$.next(0);
            this.meliModelService.meliSearch(this.userDataModelService.searchData$.value,
              this.userDataModelService.pageNumber$.value,
              this.meliModelService.searchSortBy$.value);
          }
        }
      }
      setTimeout(() => {
        this.buttonFullSend = false;
      }, 2000);
    }
  }


  getCanFreeSend(): void {
    this.canFreeSend = false;
    if (this.meliSearchFilters) {
      this.meliSearchFilters.forEach(x => {
        if (x.id === 'shipping_cost') {
          x.values.forEach(y => {
            if (y.id === 'free') {
              this.canFreeSend = true;
            }
          });
        }
      });
    }
    if (this.selectedFilters) {
      this.selectedFilters.forEach(x => {
        if (x.id === 'shipping_cost') {
          x.values.forEach(y => {
            if (y.id === 'free') {
              this.canFreeSend = true;
            }
          });
        }
      });
    }
  }

  freeSendSelected(): void {
    this.freeSend = false;
    if (this.selectedFilters) {
      this.selectedFilters.forEach(x => {
        if (x.id === 'shipping_cost') {
          x.values.forEach(y => {
            if (y.id === 'free') {
              this.freeSend = true;
            }
          });
        }
      });
    }
  }

  setFreeSend(): void {
    if (!this.buttonFreeSend) {
      this.buttonFreeSend = true;
      this.freeSend = !this.freeSend;
      if (this.meliSearchFilters) {
        this.meliSearchFilters.forEach(x => {
          if (x.id === 'shipping_cost') {
            x.values.forEach(y => {
              if (y.id === 'free') {
                if (this.freeSend) {
                  x.values[0] = y;
                  if (x.values.length > 1) {
                    x.values.length = x.values.length - 1;
                  }
                  this.meliModelService.selectedFilters$.value.push(x);
                  this.meliModelService.selectedFilters$.next(this.meliModelService.selectedFilters$.value);
                  this.userDataModelService.pageNumber$.next(0);
                  this.meliModelService.meliSearch(this.userDataModelService.searchData$.value,
                    this.userDataModelService.pageNumber$.value,
                    this.meliModelService.searchSortBy$.value);
                }
              }
            });
          }
        });
        if (!this.freeSend) {
          const index = this.meliModelService.selectedFilters$.value.findIndex(z => z.id === 'shipping_cost' && z.values[0].id === 'free');
          console.log((index));
          if (index > -1) {
            this.meliModelService.selectedFilters$.value.splice(index, 1);
            this.userDataModelService.pageNumber$.next(0);
            this.meliModelService.meliSearch(this.userDataModelService.searchData$.value,
              this.userDataModelService.pageNumber$.value,
              this.meliModelService.searchSortBy$.value);
          }
        }
      }
      setTimeout(() => {
        this.buttonFreeSend = false;
      }, 2000);
    }
  }

}
