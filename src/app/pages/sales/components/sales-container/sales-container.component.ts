import {Component, Input, OnInit} from '@angular/core';
import {MeliModelService} from '../../../../core/mode-services/meli-model.service';
import {UserDataModelService} from '../../../../core/mode-services/user-data-model.service';
import {Router} from '@angular/router';
import {IMeliSearch, ResultsEntity} from '../../../../core/interfaces/imeli-search';

@Component({
  selector: 'app-sales-container',
  templateUrl: './sales-container.component.html',
  styleUrls: ['./sales-container.component.scss']
})
export class SalesContainerComponent implements OnInit {

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

  get isClassified(): boolean {
    const result = this.meliModelService.searchMeliData$.value.results.find(x => x.buying_mode === 'classified');
    if (!result) {
      return false;
    }
    return true;
  }

  constructor(public meliModelService: MeliModelService,
              public userDataModelService: UserDataModelService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.meliModelService.images();
  }

  orderBy(order: string): void {
    this.orderName = order;
    this.userDataModelService.pageSort$.next(order);
    this.userDataModelService.pageNumber$.next(0);
    this.meliModelService.meliSearch(this.userDataModelService.searchData$.value,
      this.userDataModelService.pageNumber$.value,
      order);
  }

}
