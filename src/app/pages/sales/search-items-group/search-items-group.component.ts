import {Component, OnInit} from '@angular/core';
import {UserDataModelService} from '../../../core/mode-services/user-data-model.service';
import {MeliModelService} from '../../../core/mode-services/meli-model.service';

@Component({
  selector: 'app-search-items-group',
  templateUrl: './search-items-group.component.html',
  styleUrls: ['./search-items-group.component.scss']
})
export class SearchItemsGroupComponent implements OnInit {

  constructor(public meliModelService: MeliModelService,
              public userDataModelService: UserDataModelService) {
  }

  ngOnInit(): void {
  }

}
