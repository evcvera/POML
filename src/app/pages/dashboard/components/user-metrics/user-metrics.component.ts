import {Component, OnInit} from '@angular/core';
import {CasaModelService} from '../../../../core/mode-services/casa-model.service';
import {UserDataModelService} from '../../../../core/mode-services/user-data-model.service';

@Component({
  selector: 'app-user-metrics',
  templateUrl: './user-metrics.component.html',
  styleUrls: ['./user-metrics.component.scss']
})
export class UserMetricsComponent implements OnInit {

  constructor(public casaModelService: CasaModelService,
              public userDataModelService: UserDataModelService) {
  }

  ngOnInit(): void {
  }

  get inverseOficialProm(): number {
    if (this.userDataModelService.userData$.value) {
      if (this.userDataModelService.userData$.value.isDollar) {
        return this.userDataModelService.userData$.value.salary * this.casaModelService.currentDollar$.value.oficialProm;
      } else {
        return this.userDataModelService.userData$.value.salary / this.casaModelService.currentDollar$.value.oficialProm;
      }
    } else {
      return 0;
    }
  }

  get inverseBlueProm(): number {
    if (this.userDataModelService.userData$.value) {
      if (this.userDataModelService.userData$.value.isDollar) {
        return this.userDataModelService.userData$.value.salary * this.casaModelService.currentDollar$.value.blueProm;
      } else {
        return this.userDataModelService.userData$.value.salary / this.casaModelService.currentDollar$.value.blueProm;
      }
    } else {
      return 0;
    }
  }
}
