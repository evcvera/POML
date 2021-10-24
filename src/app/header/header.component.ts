import {Component, OnInit} from '@angular/core';
import {UserDataModelService} from '../core/mode-services/user-data-model.service';
import {Router} from '@angular/router';
import {MeliModelService} from '../core/mode-services/meli-model.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userDataModelService: UserDataModelService,
              public meliModelService: MeliModelService,
              private router: Router) {
  }

  search = '';
  public isCollapsed = true;

  ngOnInit(): void {
  }

  toggleForm(): void {
    this.userDataModelService.toggleForm$.next(true);
  }

  GoToLink(url: string): void {
    window.open(url, '_blank');
  }

  keyPress(): void {
    if (this.search !== '') {
      this.meliModelService.selectedFilters$.next([]);
      this.meliModelService.searchSortBy$.next('relevance');
      this.meliModelService.searchByInput$.next(true);
      this.userDataModelService.pageNumber$.next(0);
      this.userDataModelService.searchData$.next(this.search);
      this.router.navigate(['sales']);
    }
  }
}
