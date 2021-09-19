import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sales-zip-code-modal',
  templateUrl: './sales-zip-code-modal.component.html',
  styleUrls: ['./sales-zip-code-modal.component.scss']
})
export class SalesZipCodeModalComponent implements OnInit {

  item: any;
  constructor(public modal: NgbActiveModal) {
  }

  ngOnInit(): void {
    console.log(this.item);
  }

}
