import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AvailableFiltersEntity, ValuesEntity2} from '../../../../core/interfaces/imeli-search';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MeliModelService} from '../../../../core/model-services/meli-model.service';
import {Router} from '@angular/router';
import {UserDataModelService} from '../../../../core/model-services/user-data-model.service';

@Component({
  selector: 'app-item-filter-mobile',
  templateUrl: './item-filter-mobile.component.html',
  styleUrls: ['./item-filter-mobile.component.scss']
})
export class ItemFilterMobileComponent implements OnInit {

  @Input() filter: AvailableFiltersEntity;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  showOptions: boolean;

  constructor(public modal: NgbActiveModal,
              public meliModelService: MeliModelService,
              public router: Router,
              public userDataModelService: UserDataModelService) {
  }

  ngOnInit(): void {
    this.showOptions = false;
  }

  showAllOptions(): void {
    this.showOptions = !this.showOptions;
  }

  addFilter(selectedFilter: ValuesEntity2, filter: AvailableFiltersEntity): void {
      if (filter.id === 'category') {
      this.meliModelService.categoryName$.next(selectedFilter.name);
      this.meliModelService.selectedFilters$.next([]);
      this.meliModelService.searchSortBy$.next('relevance');
      this.meliModelService.searchByInput$.next(false);
      this.userDataModelService.pageNumber$.next(0);
      this.userDataModelService.searchDataByCategory$.next(selectedFilter.id);
      this.userDataModelService.searchData$.next(selectedFilter.id);
    } else {
      const aux: AvailableFiltersEntity = {};
      aux.name = filter.name;
      aux.id = filter.id;
      aux.type = filter.type;
      aux.values = [];
      aux.values.push(selectedFilter);
      this.meliModelService.selectedFilters$.value.push(aux);
      this.meliModelService.selectedFilters$.next(this.meliModelService.selectedFilters$.value);
      this.userDataModelService.pageNumber$.next(0);
      this.meliModelService.meliSearch(this.userDataModelService.searchData$.value,
        this.userDataModelService.pageNumber$.value,
        this.meliModelService.searchSortBy$.value);
    }
    this.closeModalEvent.emit(true);
  }



}
