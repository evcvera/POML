import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MeliModelService} from "../../core/model-services/meli-model.service";
import {Router} from "@angular/router";
import {UserDataModelService} from "../../core/model-services/user-data-model.service";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit, OnDestroy {

  email = '';
  @Input() data: any;
  @Output() dialogResponse: EventEmitter<string> = new EventEmitter();


  constructor(public modal: NgbActiveModal,
              public meliModelService: MeliModelService,
              public router: Router,
              public userDataModelService: UserDataModelService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  close(): void {
    //this.dialogResponse.emit('')
    //this.modal.close(true);
    this.modal.close();
  }

  bDelete(): void {
    this.dialogResponse.emit('delete')
    this.modal.close();
  }

  bSecondary(): void {
    this.dialogResponse.emit('secondary')
    this.modal.close();
  }

  bPrimary(): void {
    this.dialogResponse.emit('primary')
    this.modal.close();
  }
}
