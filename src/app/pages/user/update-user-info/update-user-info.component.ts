import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthenticationModelService} from "../../../core/model-services/authentication-model.service";
import {IUser} from "../../../core/interfaces/iuser";
import {UserModelService} from "../../../core/model-services/user-model.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.scss']
})
export class UpdateUserInfoComponent implements OnInit, OnDestroy {
  updateForm = new FormGroup({
    firstName: new FormControl(`${''}`, [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    location: new FormControl('', []),
    occupation: new FormControl('', []),
    biography: new FormControl('', []),
  });
  userSub: Subscription;
  updateUserSub: any;

  @Input() data: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserModelService,
              private authenticationService: AuthenticationModelService,
              public modal: NgbActiveModal) {
    this.userSub = this.authenticationService.currentUserSubject$.subscribe(user => {
      this.updateForm.get('firstName')?.setValue(user.first_name ? user.first_name : '');
      this.updateForm.get('lastName')?.setValue(user.last_name ? user.last_name : '');
      this.updateForm.get('location')?.setValue(user.location ? user.location : '');
      this.updateForm.get('occupation')?.setValue(user.occupation ? user.occupation : '');
      this.updateForm.get('biography')?.setValue(user.biography ? user.biography : '');
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe()
    }
    if (this.updateUserSub){
      this.updateUserSub.unsubscribe()
    }
  }


  updateUser() {
    let user: IUser = {
      first_name: this.updateForm.value.firstName || "",
      last_name: this.updateForm.value.lastName || "",
      biography: this.updateForm.value.biography || "",
      location: this.updateForm.value.location || "",
      occupation: this.updateForm.value.occupation || "",
    }

    if (this.updateForm.valid) {
      this.updateUserSub = this.userService.updateUserInfo(user).subscribe(resp => {
        this.modal.close()
      })
    } else {
      this.updateForm.markAllAsTouched();
    }
  }


  dialogRespones($event: string) {
   console.log($event);
  }

  close() {
    this.modal.close();
  }
}
