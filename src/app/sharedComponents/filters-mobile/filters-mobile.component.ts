import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MeliModelService} from '../../core/model-services/meli-model.service';
import {Router} from '@angular/router';
import {UserDataModelService} from '../../core/model-services/user-data-model.service';
import {AvailableFiltersEntity, IMeliSearch, ValuesEntity2} from '../../core/interfaces/imeli-search';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-filters-mobile',
  templateUrl: './filters-mobile.component.html',
  styleUrls: ['./filters-mobile.component.scss']
})
export class FiltersMobileComponent implements OnInit {

  @Input() filters: AvailableFiltersEntity[];
  @Output() buttonResponse: EventEmitter<boolean> = new EventEmitter();
  zipCode: string;
  isZipcode: boolean;

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

  constructor(public modal: NgbActiveModal,
              public meliModelService: MeliModelService,
              public router: Router,
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

  get resultsEntity(): IMeliSearch {
    if (this.meliModelService.searchMeliData$.value) {
      return this.meliModelService.searchMeliData$.value;
    } else {
      return undefined;
    }
  }

  getZipCode(): void {
    this.buttonResponse.emit(true);
    this.modal.close(true);
  }

  closeModal($event: boolean): void {
    if ($event) {
      this.modal.close();
    }
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
          // a console.log((index));
          if (index > -1) {
            this.meliModelService.selectedFilters$.value.splice(index, 1);
            this.userDataModelService.pageNumber$.next(0);
            this.meliModelService.meliSearch(this.userDataModelService.searchData$.value,
              this.userDataModelService.pageNumber$.value,
              this.meliModelService.searchSortBy$.value);
          }
        }
      }
    }
    this.modal.close();
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
          if (index > -1) {
            this.meliModelService.selectedFilters$.value.splice(index, 1);
            this.userDataModelService.pageNumber$.next(0);
            this.meliModelService.meliSearch(this.userDataModelService.searchData$.value,
              this.userDataModelService.pageNumber$.value,
              this.meliModelService.searchSortBy$.value);
          }
        }
      }
    }
    this.modal.close();
  }

}
