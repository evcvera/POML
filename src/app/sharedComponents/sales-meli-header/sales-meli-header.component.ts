import {Component, OnInit} from '@angular/core';
import {SalesZipCodeModalComponent} from '../../pages/sales/components/sales-zip-code-modal/sales-zip-code-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MeliModelService} from '../../core/mode-services/meli-model.service';
import {GeneralPopupComponent} from '../general-popup/general-popup.component';
import {UserDataModelService} from '../../core/mode-services/user-data-model.service';
import {Router} from '@angular/router';
import {PriceTypeModelService} from '../../core/mode-services/price-type-model.service';
import {ValuesEntity2} from '../../core/interfaces/imeli-search';

@Component({
  selector: 'app-sales-meli-header',
  templateUrl: './sales-meli-header.component.html',
  styleUrls: ['./sales-meli-header.component.scss']
})
export class SalesMeliHeaderComponent implements OnInit {

  search = '';

  constructor(public modalService: NgbModal,
              public meliModelService: MeliModelService,
              public userDataModelService: UserDataModelService,
              public priceTypeModelService: PriceTypeModelService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  openModal(item: any): void {
    const ref = this.modalService.open(SalesZipCodeModalComponent, {modalDialogClass: 'modal-dialog-centered modal-dialog-zipcode'});
    ref.componentInstance.item = item;

    /*    const modalRef = this.modalService.open(GeneralPopupComponent, {modalDialogClass: 'modal-dialog-centered modal-dialog-zipcode'});
        modalRef.componentInstance.item = item;
        modalRef.result.then((result) => {
          if (result) {
          }
        }).catch((res) => {});*/
  }

  keyPress(): void {
    if (this.search !== '') {
      this.meliModelService.selectedFilters$.next([]);
      this.meliModelService.searchSortBy$.next('relevance');
      this.meliModelService.searchByInput$.next(true);
      this.userDataModelService.pageNumber$.next(0);
      this.userDataModelService.searchData$.next(this.search);
      this.router.navigate(['sales']);
    }
  }

  setStandarPrice(): void {
    const value: ValuesEntity2 = {name: 'Estandar', id: 'standar', display_currency: ''};
    this.priceTypeModelService.priceType$.next(value);
  }
}
