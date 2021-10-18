import { Component, OnInit } from '@angular/core';
import {MeliModelService} from '../../../../core/mode-services/meli-model.service';
import {UserDataModelService} from '../../../../core/mode-services/user-data-model.service';

@Component({
  selector: 'app-side-bar-filters',
  templateUrl: './side-bar-filters.component.html',
  styleUrls: ['./side-bar-filters.component.scss']
})
export class SideBarFiltersComponent implements OnInit {

  constructor(public meliModelService: MeliModelService,
              public userDataModelService: UserDataModelService) { }

  ngOnInit(): void {
  }


  searchByCategory(categoryId: string): void {
    this.meliModelService.searchByInput$.next(false);
    this.userDataModelService.pageNumber$.next(0);
    this.userDataModelService.searchDataByCategory$.next(categoryId);
    this.userDataModelService.searchData$.next(categoryId);
    /*this.meliModelService.meliSearch(this.userDataModelService.searchDataByCategory$.value,
      this.userDataModelService.pageNumber$.value);*/
  }

}
