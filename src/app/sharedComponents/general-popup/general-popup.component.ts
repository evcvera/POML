import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MeliModelService} from '../../core/mode-services/meli-model.service';
import {Router} from '@angular/router';
import {IMeliSearch} from '../../core/interfaces/imeli-search';
import {UserDataModelService} from '../../core/mode-services/user-data-model.service';

@Component({
  selector: 'app-general-popup',
  templateUrl: './general-popup.component.html',
  styleUrls: ['./general-popup.component.scss']
})
export class GeneralPopupComponent implements OnInit {

  @Input() item: any;
  @Output() buttonResponse: EventEmitter<boolean> = new EventEmitter();
  zipCode: string;
  isZipcode: boolean;

  constructor(public modal: NgbActiveModal,
              public meliModelService: MeliModelService,
              public router: Router,
              public userDataModelService: UserDataModelService) {
  }


  /*  private _resultsEntity: ResultsEntity;
    @Input('resultsEntity') set resultsEntity(value: ResultsEntity) {
      this._resultsEntity = value;
    }*/

  ngOnInit(): void {
    /*this.isZipcode = true;
    if (this.meliModelService.zipCodeData$.value) {
      this.zipCode = this.meliModelService.zipCodeData$.value.zip_code;
    }*/
    console.log(this.item);
  }

  getZipCode(): void {
    /*if (this.zipCode !== '' && this.zipCode !== 'undefined') {
      this.meliModelService.getZipcode(this.zipCode).then(resp => {
        this.isZipcode = resp;
        if (resp) {
          this.router.navigate(['/sales']);
        }
      });
    }*/
    this.buttonResponse.emit(true);
    this.modal.close(true);
  }

}
