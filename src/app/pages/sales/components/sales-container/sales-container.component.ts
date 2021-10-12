import {Component, Input, OnInit} from '@angular/core';
import {MeliModelService} from '../../../../core/mode-services/meli-model.service';
import {UserDataModelService} from '../../../../core/mode-services/user-data-model.service';
import {Router} from '@angular/router';
import {IMeliSearch, ResultsEntity} from '../../../../core/interfaces/imeli-search';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SalesZipCodeModalComponent} from '../sales-zip-code-modal/sales-zip-code-modal.component';
import {GeneralPopupComponent} from '../../../../sharedComponents/general-popup/general-popup.component';
import {SortItemMobileComponent} from '../../../../sharedComponents/sort-item-mobile/sort-item-mobile.component';

@Component({
  selector: 'app-sales-container',
  templateUrl: './sales-container.component.html',
  styleUrls: ['./sales-container.component.scss']
})
export class SalesContainerComponent implements OnInit {

  orderName = 'relevance';

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
  }

  orderBy(order: string): void {
    this.orderName = order;
    this.userDataModelService.pageSort$.next(order);
    this.userDataModelService.pageNumber$.next(0);
    this.meliModelService.meliSearch(this.userDataModelService.searchData$.value,
      this.userDataModelService.pageNumber$.value,
      order);
  }

  searchByCategory(categoryId: string): void {
    this.meliModelService.searchByInput$.next(false);
    this.userDataModelService.pageNumber$.next(0);
    this.userDataModelService.searchDataByCategory$.next(categoryId);
    this.userDataModelService.searchData$.next(categoryId);
    /*this.meliModelService.meliSearch(this.userDataModelService.searchDataByCategory$.value,
      this.userDataModelService.pageNumber$.value);*/
  }

  orderByMobile(item: any): void {
    const modalRef = this.modalService.open(SortItemMobileComponent, {modalDialogClass: 'modal-dialog-centered modal-dialog-zipcode'});
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      console.log(result);
      if (result) {
        console.log(result);
      }
    }).catch((res) => {
    });
  }

  /*******GENERLA MODAL ******/
  /*orderByMobile(item: any): void {
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
