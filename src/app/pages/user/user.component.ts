import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IUser} from "../../core/interfaces/iuser";
import {AuthenticationModelService} from "../../core/model-services/authentication-model.service";
import {SalesZipCodeModalComponent} from "../sales/components/sales-zip-code-modal/sales-zip-code-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MeliModelService} from "../../core/model-services/meli-model.service";
import {UserDataModelService} from "../../core/model-services/user-data-model.service";
import {PriceTypeModelService} from "../../core/model-services/price-type-model.service";
import {GeneralPopupComponent} from "../../sharedComponents/general-popup/general-popup.component";
import {UpdateUserInfoComponent} from "./update-user-info/update-user-info.component";
import {Subscription} from "rxjs";
import {UpdatePhotoComponent} from "./update-photo/update-photo.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  id: string = "";
  private sub: any;
  user: IUser;
  currentUser: Subscription;

  constructor(public authenticationService: AuthenticationModelService,
              public modalService: NgbModal,
              public meliModelService: MeliModelService,
              public userDataModelService: UserDataModelService,
              private route: ActivatedRoute,
              public priceTypeModelService: PriceTypeModelService) {
  }

  ngOnInit(): void {
    if (this.sub){
      this.sub?.unsubscribe()
    }
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.authenticationService.currentUserSubject$.value?.uuid === this.id){
        this.authenticationService.currentUserSubject$.subscribe( value => {
          this.user = value
        })
      }
    });
  }

  openUpdateBanner(url: string): void {
    const ref = this.modalService.open(GeneralPopupComponent, {modalDialogClass: 'modal-dialog-centered '});
    ref.result.then((result) => {
      if (result) {
        console.log(result)
      }
    }).catch((res) => {});

    /*    const modalRef = this.modalService.open(GeneralPopupComponent, {modalDialogClass: 'modal-dialog-centered modal-dialog-zipcode'});
        modalRef.componentInstance.item = item;
        modalRef.result.then((result) => {
          if (result) {
          }
        }).catch((res) => {});*/
  }

  openBanner(url: string): void {
    const ref = this.modalService.open(GeneralPopupComponent, {modalDialogClass: 'modal-dialog-centered '});
    ref.result.then((result) => {
      if (result) {
        console.log(result)
      }
    }).catch((res) => {});
  }

  openAvatar(url: string): void {
    const ref = this.modalService.open(GeneralPopupComponent, {modalDialogClass: 'modal-dialog-centered '});
    ref.result.then((result) => {
      if (result) {
        console.log(result)
      }
    }).catch((res) => {});
  }

  openPhoto(url: string): void {
    const data = { title: ''};
    const ref = this.modalService.open(UpdatePhotoComponent, {modalDialogClass: 'modal-dialog-centered '});
    ref.componentInstance.data = data;
    ref.componentInstance.user = this.user;
    ref.result.then((result) => {
      if (result) {
        console.log(result)
      }
    }).catch((res) => {});
  }

  openEditDataUser(): void {
    const data = { title: 'Editar presentación'};
    const ref = this.modalService.open(UpdateUserInfoComponent, {modalDialogClass: 'modal-dialog-centered '});
    ref.componentInstance.data = data;
    ref.result.then((result) => {
      if (result) {
        console.log(result)
      }
    }).catch((res) => {});
  }

  ngOnDestroy() {
    if(this.currentUser){
      this.currentUser.unsubscribe()
    }
  }

}
