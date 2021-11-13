import {Component, Input, OnInit} from '@angular/core';
import {SortItemMobileComponent} from '../sort-item-mobile/sort-item-mobile.component';
import {PriceTypeMobileComponent} from '../price-type-mobile/price-type-mobile.component';
import {FiltersMobileComponent} from '../../../../sharedComponents/filters-mobile/filters-mobile.component';
import {MeliModelService} from '../../../../core/mode-services/meli-model.service';
import {UserDataModelService} from '../../../../core/mode-services/user-data-model.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sales-filter-mobile',
  templateUrl: './sales-filter-mobile.component.html',
  styleUrls: ['./sales-filter-mobile.component.scss']
})
export class SalesFilterMobileComponent implements OnInit {

  @Input() isSales: boolean;

  constructor(public meliModelService: MeliModelService,
              public userDataModelService: UserDataModelService,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  orderMobile(item: any): void {
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
  }

}
