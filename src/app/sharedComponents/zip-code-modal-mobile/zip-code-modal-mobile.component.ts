import {Component, OnInit} from '@angular/core';
import {MeliModelService} from '../../core/mode-services/meli-model.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-zip-code-modal-mobile',
  templateUrl: './zip-code-modal-mobile.component.html',
  styleUrls: ['./zip-code-modal-mobile.component.scss']
})
export class ZipCodeModalMobileComponent implements OnInit {

  item: any;
  zipCode: string;
  isZipcode: boolean;

  constructor(public meliModelService: MeliModelService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.isZipcode = true;
  }

  getZipCode(): void {
    console.log('adsadsada');
    if (this.zipCode !== '' && this.zipCode !== 'undefined') {
      this.meliModelService.getZipcode(this.zipCode).then(resp => {
        this.isZipcode = resp;
        if (resp) {
          //window.location.href = 'sales';
          this.router.navigate(['/sales']);
        }
      });
    }
  }
}
