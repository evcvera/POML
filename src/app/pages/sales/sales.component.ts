import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {MeliModelService} from '../../core/model-services/meli-model.service';
import {UserDataModelService} from '../../core/model-services/user-data-model.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, OnDestroy {

  search = '';
  /*public innerWidth: any;*/
  public searchSubscription: Subscription;
  public pageNumberSubscription: Subscription;

  /*  public get tabletOrLess(): boolean {
      return this.innerWidth <= 991;
    }*/

  constructor(public meliModelService: MeliModelService,
              public userDataModelService: UserDataModelService,
              private router: Router) {
  }

  ngOnInit(): void {
    /*this.innerWidth = window.innerWidth;*/
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.searchSubscription = this.userDataModelService.searchData$.subscribe((resp) => {
      if (resp && resp !== this.meliModelService.searchMeliData$?.value?.query) {
        /*if (resp) {*/
        this.meliModelService.meliSearch(resp, this.userDataModelService.pageNumber$.value);
      }
    });
    if (this.pageNumberSubscription) {
      this.pageNumberSubscription.unsubscribe();
    }
    this.pageNumberSubscription = this.userDataModelService.pageNumber$.subscribe(resp => {
      if (this.meliModelService.searchByInput$.value) {
        if (resp && resp !== (this.meliModelService.searchMeliData$.value.paging.offset / 50)) {
          this.meliModelService.meliSearch(this.userDataModelService.searchData$.value, resp);
        } else {
          /*if (this.userDataModelService.searchData$.value !== '' && resp === 0 && this.meliModelService.searchMeliData$.value.paging.offset) {
            this.meliModelService.meliSearch(this.userDataModelService.searchData$.value, resp);
          }*/
        }
      } else {
        if (resp && resp !== (this.meliModelService.searchMeliData$.value.paging.offset / 50)) {
          this.meliModelService.meliSearch(this.userDataModelService.searchDataByCategory$.value, resp);
        }
      }
    });
  }

  /*  ngOnInit(): void {
      this.innerWidth = window.innerWidth;
      this.searchSubscription = this.userDataModelService.searchData$.subscribe((resp) => {
        if (resp !== '' && !(this.meliModelService.searchMeliData$?.value?.query === resp)) {
          this.meliModelService.meliSearch(resp, this.userDataModelService.pageNumber$.value);
        }
      });
    }*/

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    if (this.pageNumberSubscription) {
      this.pageNumberSubscription.unsubscribe();
    }
  }

  /*  @HostListener('window:resize', ['$event'])
    onResize($event): any {
      this.innerWidth = window.innerWidth;
    }*/

}
