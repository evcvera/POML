import {Component, OnInit} from '@angular/core';
import {MeliModelService} from '../../core/mode-services/meli-model.service';
import {UserDataModelService} from '../../core/mode-services/user-data-model.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  search = '';

  constructor(public meliModelService: MeliModelService,
              public userDataModelService: UserDataModelService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userDataModelService.searchData$.subscribe((resp) => {
      if (resp !== '') {
        this.meliModelService.meliSearch(resp);
      }
    });
  }

  keyPress($event: KeyboardEvent): void {
    if ($event.key === 'Enter' && this.search !== '') {
      this.userDataModelService.searchData$.next(this.search);
      this.router.navigate(['sales']);
    }
  }

}
