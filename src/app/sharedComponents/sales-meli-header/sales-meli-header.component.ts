import {Component, OnInit} from '@angular/core';
import {SalesZipCodeModalComponent} from '../../pages/sales/components/sales-zip-code-modal/sales-zip-code-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MeliModelService} from '../../core/mode-services/meli-model.service';
import {GeneralPopupComponent} from '../general-popup/general-popup.component';

@Component({
  selector: 'app-sales-meli-header',
  templateUrl: './sales-meli-header.component.html',
  styleUrls: ['./sales-meli-header.component.scss']
})
export class SalesMeliHeaderComponent implements OnInit {

  constructor(public modalService: NgbModal,
              public meliModelService: MeliModelService) {
  }

  ngOnInit(): void {
  }

  openModal(item: any): void {
    const ref = this.modalService.open(SalesZipCodeModalComponent, {modalDialogClass: 'modal-dialog-centered modal-dialog-zipcode'});
    ref.componentInstance.item = item;
    //const ref = this.modalService.open(GeneralPopupComponent, {modalDialogClass: 'modal-dialog-centered modal-dialog-zipcode'});
  }

}
