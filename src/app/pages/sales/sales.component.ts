import {Component, OnInit} from '@angular/core';
import {MeliModelService} from '../../core/mode-services/meli-model.service';
import {UserDataModelService} from '../../core/mode-services/user-data-model.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  constructor(public meliModelService: MeliModelService,
              public userDataModelService: UserDataModelService) {
  }

  ngOnInit(): void {
    this.userDataModelService.searchData$.subscribe((resp) => {
      if (resp !== '') {
        this.meliModelService.meliSearch(resp);
      }
    });
  }

}
