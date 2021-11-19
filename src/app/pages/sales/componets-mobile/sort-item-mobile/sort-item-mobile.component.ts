import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MeliModelService} from '../../../../core/mode-services/meli-model.service';
import {Router} from '@angular/router';
import {UserDataModelService} from '../../../../core/mode-services/user-data-model.service';
import {IMeliSearch} from '../../../../core/interfaces/imeli-search';

@Component({
  selector: 'app-sort-item-mobile',
  templateUrl: './sort-item-mobile.component.html',
  styleUrls: ['./sort-item-mobile.component.scss']
})
export class SortItemMobileComponent implements OnInit {

  @Input() item: any;
  @Output() buttonResponse: EventEmitter<boolean> = new EventEmitter();
  zipCode: string;
  isZipcode: boolean;

  constructor(public modal: NgbActiveModal,
              public meliModelService: MeliModelService,
              public router: Router,
              public userDataModelService: UserDataModelService) {
  }

  orderName = 'relevance';

  /*  private _resultsEntity: ResultsEntity;
    @Input('resultsEntity') set resultsEntity(value: ResultsEntity) {
      this._resultsEntity = value;
    }*/

  get resultsEntity(): IMeliSearch {
    if (this.meliModelService.searchMeliData$.value) {
      return this.meliModelService.searchMeliData$.value;
    } else {
      return undefined;
    }
  }

  get labelText(): string {
    if (this.orderName === 'relevance') {
      return 'Más relevantes';
    }
    if (this.orderName === 'price_asc') {
      return 'Menor precio';
    }
    if (this.orderName === 'price_desc') {
      return 'Mayor precio';
    }
    return '';
  }

  orderBy(order: string): void {
    this.orderName = order;
    //this.userDataModelService.pageSort$.next(order);
    this.userDataModelService.pageNumber$.next(0);
    this.meliModelService.searchSortBy$.next(order);
    this.meliModelService.meliSearch(this.userDataModelService.searchData$.value,
      this.userDataModelService.pageNumber$.value,
      this.meliModelService.searchSortBy$.value);
    this.modal.close(true);
  }

  ngOnInit(): void {
    /*this.isZipcode = true;
    if (this.meliModelService.zipCodeData$.value) {
      this.zipCode = this.meliModelService.zipCodeData$.value.zip_code;
    }*/
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
