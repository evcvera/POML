import {Component, OnInit} from '@angular/core';
import {MeliModelService} from '../../../../../../core/mode-services/meli-model.service';
import {UserDataModelService} from '../../../../../../core/mode-services/user-data-model.service';

@Component({
  selector: 'app-selected-filter',
  templateUrl: './selected-filter.component.html',
  styleUrls: ['./selected-filter.component.scss']
})
export class SelectedFilterComponent implements OnInit {

  constructor(public meliModelService: MeliModelService,
              public userDataModelService: UserDataModelService) {
  }

  ngOnInit(): void {
  }

  removeSelectedFilter(id: string): void {
    const index = this.meliModelService.selectedFilters$.value.findIndex(x => x.id === id);
    // a console.log((index));
    if (index > -1) {
      this.meliModelService.selectedFilters$.value.splice(index, 1);
      this.userDataModelService.pageNumber$.next(0);
      this.meliModelService.meliSearch(this.userDataModelService.searchData$.value,
        this.userDataModelService.pageNumber$.value,
        this.meliModelService.searchSortBy$.value);
    }
  }
}
