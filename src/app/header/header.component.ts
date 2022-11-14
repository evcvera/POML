import {Component, OnInit} from '@angular/core';
import {UserDataModelService} from '../core/model-services/user-data-model.service';
import {Router} from '@angular/router';
import {MeliModelService} from '../core/model-services/meli-model.service';
import {AuthenticationModelService} from "../core/model-services/authentication-model.service";
import {NgbDropdown} from "@ng-bootstrap/ng-bootstrap";
import {AuthenticationGoogleService} from "../core/model-services/authentication-google.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userDataModelService: UserDataModelService,
              public meliModelService: MeliModelService,
              public authenticationService: AuthenticationModelService,
              public authenticationGoogleService:AuthenticationGoogleService,
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

  leave($event: MouseEvent, myDrop: NgbDropdown) {
    setTimeout( ()=>{
      $event.stopPropagation();
      myDrop.close();
    }, 3000)
  }


  signOut() {
    this.authenticationGoogleService.signOut()
  }
}
