import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {AuthenticationModelService} from "../../core/model-services/authentication-model.service";
import {IUser} from "../../core/interfaces/iuser";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  error = '';
  loginSub: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private http: HttpClient,
              private authenticationModelService: AuthenticationModelService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe()
    }
  }

  get formControl() {
    return this.loginForm.controls;
  }

  onSubmit(event: any): void {
    let email = this.loginForm.value.email || "";
    let password = this.loginForm.value.password || "";
    this.loginSub = this.authenticationModelService.login(email, password).subscribe((data: IUser) => {
        if (data) {
          this.router.navigate(['/metrics']);
        } else {
          this.error = 'EMAIL Y/O CONTRASEÑA INCORRECTOS.';
        }
      }, error => {
        this.error = error
      }
    );
  }

  errClear(): void {
    this.error = ''
  }

  forgotPassword(): void {
    console.log('asdas');
  }
}
