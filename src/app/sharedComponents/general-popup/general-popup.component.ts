import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MeliModelService} from '../../core/model-services/meli-model.service';
import {Router} from '@angular/router';
import {IMeliSearch} from '../../core/interfaces/imeli-search';
import {UserDataModelService} from '../../core/model-services/user-data-model.service';

@Component({
  selector: 'app-general-popup',
  templateUrl: './general-popup.component.html',
  styleUrls: ['./general-popup.component.scss']
})
export class GeneralPopupComponent implements OnInit {

  @Input() item: any;
  @Output() buttonResponse: EventEmitter<boolean> = new EventEmitter();

  constructor(public modal: NgbActiveModal,
              public meliModelService: MeliModelService,
              public router: Router,
              public userDataModelService: UserDataModelService) {
  }

  ngOnInit(): void {
  }

  getZipCode(): void {
    this.buttonResponse.emit(true);
    this.modal.close(true);
    this.modal.dismiss(false);
  }

}
