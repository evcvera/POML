import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {MeliModelService} from '../../core/mode-services/meli-model.service';
import {UserDataModelService} from '../../core/mode-services/user-data-model.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, OnDestroy {

  search = '';
  public innerWidth: any;
  public searchSubscription: Subscription;

  public get tabletOrLess(): boolean {
    return this.innerWidth <= 991;
  }

  constructor(public meliModelService: MeliModelService,
              public userDataModelService: UserDataModelService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.searchSubscription = this.userDataModelService.searchData$.subscribe((resp) => {
      if (resp) {
        this.meliModelService.meliSearch(resp, this.userDataModelService.pageNumber$.value);
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
  }

  keyPress($event: KeyboardEvent): void {
    if ($event.key === 'Enter' && this.search !== '') {
      this.userDataModelService.pageNumber$.next(0);
      this.userDataModelService.searchData$.next(this.search);
      this.router.navigate(['sales']);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): any {
    this.innerWidth = window.innerWidth;
  }

}
