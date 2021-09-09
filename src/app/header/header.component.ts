import {Component, OnInit} from '@angular/core';
import {UserDataModelService} from '../core/mode-services/user-data-model.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userDataModelService: UserDataModelService,
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

  keyPress($event: KeyboardEvent): void {
    if ($event.key === 'Enter' && this.search !== '') {
      this.userDataModelService.pageNumber$.next(0);
      this.userDataModelService.searchData$.next(this.search);
      this.router.navigate(['sales']);
    }
  }
}
