import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ISideBarForm} from '../../../core/interfaces/iside-bar-form';
import {UserDataModelService} from '../../../core/model-services/user-data-model.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {RefreshAllModelService} from '../../../core/model-services/refresh-all-model.service';
import {MetricsFormService} from "../../../core/services/metrics-form.service";
import {Subscription} from "rxjs";
import {AuthenticationModelService} from "../../../core/model-services/authentication-model.service";

@Component({
  selector: 'app-side-bar-form',
  templateUrl: './side-bar-form.component.html',
  styleUrls: ['./side-bar-form.component.scss']
})
export class SideBarFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  sideBarForm: ISideBarForm = {};
  currentDate: Date;
  stringDate: string;
  metricsFormSubscriptionPost: Subscription;
  metricsFormSubscriptionGet: Subscription;
  currentUserSubscription: Subscription


  constructor(private formBuilder: FormBuilder,
              private userDataModelService: UserDataModelService,
              private router: Router,
              public datetime: DatePipe,
              private refreshAllModelService: RefreshAllModelService,
              private metricsFormService: MetricsFormService,
              private authenticationService: AuthenticationModelService) {
    this.setForm();
  }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.stringDate = this.datetime.transform(this.currentDate, 'YYYY-MM-dd');
    this.form.get('birthday').setValue(this.stringDate);

    this.currentUserSubscription = this.authenticationService.currentUserSubject$.subscribe(resp => {
      if (resp && resp.uuid) {
        this.buildForm()
      }
    })

  }

  private buildForm(): any {
    this.metricsFormSubscriptionGet = this.metricsFormService.get().subscribe(x => {
      if (x) {
        this.stringDate = this.datetime.transform(x.birthday, 'YYYY-MM-dd');
        this.form = this.formBuilder.group({
          birthday: [`${this.stringDate}`, [Validators.required]],
          gender: [`${x.gender}`, [Validators.required]],
          isDollar: [`${x.is_dollar}`, [Validators.required]],
          salary: [`${x.salary}`, [Validators.required]],
          weeklyHours: [`${x.daily_hours}`, [Validators.required]],
          isDepenRelationship: [`${x.is_depen_relationship}`, [Validators.required]],
          isPercent: [`${x.is_percent}`, [Validators.required]],
          savingCapacity: [`${x.saving_capacity}`, [Validators.required]]
        });
        this.setSideFrom(this.form);
        this.userDataModelService.userData$.next(this.sideBarForm);
      }
    });
  }

  private setForm(): any {
    this.form = this.formBuilder.group({
      birthday: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      isDollar: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      weeklyHours: ['', [Validators.required]],
      isDepenRelationship: ['', [Validators.required]],
      isPercent: ['', [Validators.required]],
      savingCapacity: ['', [Validators.required]]
    });
  }

  setSideFrom(form: FormGroup): ISideBarForm{
    const auxDate = new Date(form.get('birthday').value);
    const userTimezoneOffset = new Date(auxDate).getTimezoneOffset() * 60000;
    this.sideBarForm.birthday = new Date(auxDate.getTime() + userTimezoneOffset);
    this.sideBarForm.gender = form.get('gender').value;
    this.sideBarForm.is_dollar = JSON.parse(form.get('isDollar').value ? form.get('isDollar').value : null);
    this.sideBarForm.salary = Number(form.get('salary').value);
    this.sideBarForm.daily_hours = Number(form.get('weeklyHours').value);
    this.sideBarForm.is_depen_relationship = JSON.parse(form.get('isDepenRelationship').value ? form.get('isDepenRelationship').value : null);
    this.sideBarForm.is_percent = JSON.parse(form.get('isPercent').value ? form.get('isPercent').value : null);
    this.sideBarForm.saving_capacity = Number(form.get('savingCapacity').value);
    return this.sideBarForm;
  }

  save(event: Event): any {
    this.setSideFrom(this.form);
    event.preventDefault();
    if (this.form.valid) {
      this.currentUserSubscription = this.authenticationService.currentUserSubject$.subscribe(resp => {
        if (resp && resp.uuid) {
          this.metricsFormSubscriptionPost = this.metricsFormService.postMetricForm(this.sideBarForm).subscribe(x => {
            console.log(x);
          });
        }
      });
      this.userDataModelService.userData$.next(this.sideBarForm);
      this.userDataModelService.toggleForm$.next(false);
      this.router.navigate(['metrics']);
      this.refreshAllModelService.refresh();
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    if (this.metricsFormSubscriptionPost) {
      this.metricsFormSubscriptionPost.unsubscribe();
    }
    if (this.metricsFormSubscriptionGet) {
      this.metricsFormSubscriptionGet.unsubscribe();
    }
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

}
