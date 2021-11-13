import {Component, Input, OnInit} from '@angular/core';
import {MeliModelService} from '../../../../core/mode-services/meli-model.service';
import {UserDataModelService} from '../../../../core/mode-services/user-data-model.service';
import {Router} from '@angular/router';
import {IMeliSearch, ResultsEntity} from '../../../../core/interfaces/imeli-search';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SalesZipCodeModalComponent} from '../sales-zip-code-modal/sales-zip-code-modal.component';
import {GeneralPopupComponent} from '../../../../sharedComponents/general-popup/general-popup.component';
import {SortItemMobileComponent} from '../../componets-mobile/sort-item-mobile/sort-item-mobile.component';
import {FiltersMobileComponent} from '../../../../sharedComponents/filters-mobile/filters-mobile.component';
import {Subscription} from 'rxjs';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {PriceTypeMobileComponent} from '../../componets-mobile/price-type-mobile/price-type-mobile.component';

@Component({
  selector: 'app-sales-container',
  templateUrl: './sales-container.component.html',
  styleUrls: ['./sales-container.component.scss']
})
export class SalesContainerComponent implements OnInit {


  @BlockUI('sales-container') blockUI: NgBlockUI;

  orderName = 'relevance';
  searchSortBySubscription: Subscription;
  blockUiSubscription: Subscription;

  /*  private _resultsEntity: ResultsEntity;
    @Input('resultsEntity') set resultsEntity(value: ResultsEntity) {
      this._resultsEntity = value;
    }*/

  get resultsEntity(): IMeliSearch {
    if (this.meliModelService.searchMeliData$.value) {
      return this.meliModelService.searchMeliData$.value;
    } else {
      return undefined;
    }
  }

  get labelText(): string {
    if (this.orderName === 'relevance') {
      return 'Más relevantes';
    }
    if (this.orderName === 'price_asc') {
      return 'Menor precio';
    }
    if (this.orderName === 'price_desc') {
      return 'Mayor precio';
    }
    return '';
  }

  constructor(public meliModelService: MeliModelService,
              public userDataModelService: UserDataModelService,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {

    if (this.blockUiSubscription) {
      this.blockUiSubscription.unsubscribe();
    }
    this.blockUiSubscription = this.meliModelService.blockUi$.subscribe(x => {
      if (x && this.meliModelService.searchMeliData$) {
        this.blockUI.start();
      } else {
        this.blockUI.stop();
      }
    });

    if (this.searchSortBySubscription) {
      this.searchSortBySubscription.unsubscribe();
    }
    this.searchSortBySubscription = this.meliModelService.searchSortBy$.subscribe(x => {
      this.orderName = x;
    });
  }


  orderBy(order: string): void {
    this.orderName = order;
    //this.userDataModelService.pageSort$.next(order);
    this.meliModelService.searchSortBy$.next(order);
    this.userDataModelService.pageNumber$.next(0);
    this.meliModelService.meliSearch(this.userDataModelService.searchData$.value,
      this.userDataModelService.pageNumber$.value,
      this.meliModelService.searchSortBy$.value);
  }

  searchByCategory(categoryId: string): void {
    this.meliModelService.searchByInput$.next(false);
    this.userDataModelService.pageNumber$.next(0);
    this.userDataModelService.searchDataByCategory$.next(categoryId);
    this.userDataModelService.searchData$.next(categoryId);
    /*this.meliModelService.meliSearch(this.userDataModelService.searchDataByCategory$.value,
      this.userDataModelService.pageNumber$.value);*/
  }


  /**** SE CREA COMPONENTE app-sales-filter-mobile ****/
/*  orderMobile(item: any): void {
    const modalRef = this.modalService.open(SortItemMobileComponent, {modalDialogClass: 'modal-dialog-centered'});
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
    }).catch((res) => {
    });
  }



  priceTypeMobile(item: any): void {
    const modalRef = this.modalService.open(PriceTypeMobileComponent, {modalDialogClass: 'modal-dialog-centered'});
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
    }).catch((res) => {
    });
  }

  filtersMobile(item: any): void {
    const modalRef = this.modalService.open(FiltersMobileComponent, {modalDialogClass: 'modal-dialog-centered'});
    modalRef.componentInstance.filters = this.meliModelService.searchMeliData$.value.available_filters;
    modalRef.result.then((result) => {
      console.log(result);
      if (result) {
        console.log(result);
      }
    }).catch((res) => {
    });
  }*/

  /*******GENERLA MODAL ******/
/*  orderByMobile(item: any): void {
    const modalRef = this.modalService.open(SortItemMobileComponent, {modalDialogClass: 'modal-dialog-centered modal-dialog-zipcode'});
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      console.log(result);
      if (result) {
        console.log(result);
      }
    }).catch((res) => {
    });
  }*/
  /*******GENERLA MODAL ******/
}
