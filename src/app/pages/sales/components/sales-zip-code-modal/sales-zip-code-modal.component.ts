import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MeliModelService} from '../../../../core/model-services/meli-model.service';

@Component({
  selector: 'app-sales-zip-code-modal',
  templateUrl: './sales-zip-code-modal.component.html',
  styleUrls: ['./sales-zip-code-modal.component.scss']
})
export class SalesZipCodeModalComponent implements OnInit {

  item: any;
  zipCode: string;
  isZipcode: boolean;

  constructor(public modal: NgbActiveModal,
              public meliModelService: MeliModelService) {
  }

  ngOnInit(): void {
    this.isZipcode = true;
    if (this.meliModelService.zipCodeData$.value) {
      this.zipCode = this.meliModelService.zipCodeData$.value.zip_code;
    }
  }

  getZipCode(): void {
    if (this.zipCode !== '' && this.zipCode !== 'undefined') {
      this.meliModelService.getZipcode(this.zipCode).then(resp => {
        this.isZipcode = resp;
        if (resp) {
          this.modal.dismiss('Cross click');
        }
      });
    }
  }


}
