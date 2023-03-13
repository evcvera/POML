import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {UserModelService} from "../../../core/model-services/user-model.service";
import {AuthenticationModelService} from "../../../core/model-services/authentication-model.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {IUser} from "../../../core/interfaces/iuser";

@Component({
  selector: 'app-update-photo',
  templateUrl: './update-photo.component.html',
  styleUrls: ['./update-photo.component.scss']
})
export class UpdatePhotoComponent implements OnInit {
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
  @Input() user: IUser;

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


  dialogResponse($event: string) {
    console.log($event);
  }

  close() {
    this.modal.close();
  }

  deleteImg() {

  }

  onFileSelected() {

  }

  updateImg() {

  }
}
