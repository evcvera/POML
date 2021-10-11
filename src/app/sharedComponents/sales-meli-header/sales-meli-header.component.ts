import {Component, OnInit} from '@angular/core';
import {SalesZipCodeModalComponent} from '../../pages/sales/components/sales-zip-code-modal/sales-zip-code-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MeliModelService} from '../../core/mode-services/meli-model.service';
import {GeneralPopupComponent} from '../general-popup/general-popup.component';
import {UserDataModelService} from '../../core/mode-services/user-data-model.service';
import {Router} from '@angular/router';

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
      console.log(result);
      if (result) {
        console.log(result);
      }
    }).catch((res) => {});*/
  }

  keyPress(): void {
    if (this.search !== '') {
      this.meliModelService.searchByInput$.next(true);
      this.userDataModelService.pageNumber$.next(0);
      this.userDataModelService.searchData$.next(this.search);
    }
  }

}
