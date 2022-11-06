import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../domain/user";
import {UserService} from "../../services/user.service";
import {Event, Router} from "@angular/router";
import {empty, Subscription} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  user: User = {};
  signUp = new FormGroup({
    firstName: new FormControl(`${''}`, [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    file: new FormControl('', []),
    fileSource: new FormControl('', []),
  });
  currentImage: string = '';
  signUpSub: any;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) {
  }

  /*  myForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rePassword: ['', [Validators.required, Validators.minLength(5)]],
      file: ['', []],
      fileSource: ['', []]
    });*/


  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.signUpSub) {
      this.signUpSub.unsubscribe()
    }
  }

  get formControl() {
    return this.signUp.controls;
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      const [file] = inputNode.files;
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.currentImage = reader.result as string;
        this.signUp.patchValue({fileSource: e.target.result});
      };
    }
  }

  save(event: any): void {
    this.user.first_name = this.signUp.value.firstName || "";
    this.user.last_name = this.signUp.value.lastName || "";
    this.user.email = this.signUp.value.email || "";
    this.user.password = this.signUp.value.password || "";
    this.user.image = this.signUp.value.fileSource || "";
    event.preventDefault();
    if (this.signUp.valid) {
      this.signUpSub = this.userService.signUp(this.user).subscribe(x => {
        this.router.navigate(["/login"]);
      })
    } else {
      this.signUp.markAllAsTouched();
    }
  }

  deleteImage(): void {
    this.signUp.get('file')?.setValue(null);
    this.signUp.get('fileSource')?.setValue(null);
    this.currentImage = ''
  }
}
