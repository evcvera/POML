import {Component, OnInit} from '@angular/core';
import {MeliModelService} from '../../core/model-services/meli-model.service';
import {UserDataModelService} from '../../core/model-services/user-data-model.service';

@Component({
  selector: 'app-sales-paginator',
  templateUrl: './sales-paginator.component.html',
  styleUrls: ['./sales-paginator.component.scss']
})
export class SalesPaginatorComponent implements OnInit {

  constructor(public meliModelService: MeliModelService,
              public userDataModelService: UserDataModelService) {
  }

  ngOnInit(): void {
  }

  nextPage(position: number): void {
    if (this.userDataModelService.pageNumber$.value + position >= 0) {
      this.userDataModelService.pageNumber$.next(this.userDataModelService.pageNumber$.value + position);
    }
    if (this.userDataModelService.pageNumber$.value + position === -1) {
      this.meliModelService.meliSearch(this.userDataModelService.searchData$.value, 0);
    }
  }
}
