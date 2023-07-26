import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ISideBarForm} from '../../../core/interfaces/iside-bar-form';
import {UserDataModelService} from '../../../core/model-services/user-data-model.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {RefreshAllModelService} from '../../../core/model-services/refresh-all-model.service';

@Component({
  selector: 'app-side-bar-form',
  templateUrl: './side-bar-form.component.html',
  styleUrls: ['./side-bar-form.component.scss']
})
export class SideBarFormComponent implements OnInit {

  form: FormGroup;
  sideBarForm: ISideBarForm = {};
  cacheUserData: ISideBarForm = {};
  currentDate: Date;
  stringDate: string;

  constructor(private formBuilder: FormBuilder,
              private userDataModelService: UserDataModelService,
              private router: Router,
              public datetime: DatePipe,
              private refreshAllModelService: RefreshAllModelService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.currentDate = new Date();
    if (this.cacheUserData?.birthday) {
      this.stringDate = this.datetime.transform(this.cacheUserData?.birthday, 'YYYY-MM-dd');
    } else {
      this.stringDate = this.datetime.transform(this.currentDate, 'YYYY-MM-dd');
    }
    this.form.get('birthday').setValue(this.stringDate);
  }

  private buildForm(): any {
    this.cacheUserData = JSON.parse(localStorage.getItem('userData'));
    this.form = this.formBuilder.group({
      birthday: [`${this.cacheUserData?.birthday !== undefined ? this.cacheUserData.birthday : ''}`, [Validators.required]],
      gender: [`${this.cacheUserData?.gender !== undefined ? this.cacheUserData.gender : ''}`, [Validators.required]],
      isDollar: [`${this.cacheUserData?.isDollar !== undefined ? this.cacheUserData.isDollar : ''}`, [Validators.required]],
      salary: [`${this.cacheUserData?.salary !== undefined ? this.cacheUserData.salary : ''}`, [Validators.required]],
      weeklyHours: [`${this.cacheUserData?.dailyHours !== undefined ? this.cacheUserData.dailyHours : ''}`, [Validators.required]],
      isDepenRelationship: [`${this.cacheUserData?.isDepenRelationship !== undefined ? this.cacheUserData.isDepenRelationship : ''}`, [Validators.required]],
      isPercent: [`${this.cacheUserData?.isPercent !== undefined ? this.cacheUserData.isPercent : ''}`, [Validators.required]],
      savingCapacity: [`${this.cacheUserData?.savingCapacity !== undefined ? this.cacheUserData.savingCapacity : ''}`, [Validators.required]]
    });
  }

  save(event: Event): any {
    const auxDate = new Date(this.form.get('birthday').value);
    const userTimezoneOffset = new Date(auxDate).getTimezoneOffset() * 60000;
    this.sideBarForm.birthday = new Date(auxDate.getTime() + userTimezoneOffset);
    this.sideBarForm.gender = this.form.get('gender').value;
    this.sideBarForm.isDollar = JSON.parse(this.form.get('isDollar').value ? this.form.get('isDollar').value : null);
    this.sideBarForm.salary = this.form.get('salary').value;
    this.sideBarForm.dailyHours = this.form.get('weeklyHours').value;
    this.sideBarForm.isDepenRelationship = JSON.parse(this.form.get('isDepenRelationship').value ? this.form.get('isDepenRelationship').value : null);
    this.sideBarForm.isPercent = JSON.parse(this.form.get('isPercent').value ? this.form.get('isPercent').value : null);
    this.sideBarForm.savingCapacity = this.form.get('savingCapacity').value;
    //this.sideBarForm.savingCapacity = this.form.get('isPercent').value ? (this.form.get('savingCapacity').value * this.form.get('salary').value) / 100 : this.form.get('savingCapacity').value;
    event.preventDefault();
    // c console.log(this.form.valid);
    if (this.form.valid) {
      this.userDataModelService.userData$.next(this.sideBarForm);
      this.userDataModelService.toggleForm$.next(false);
      this.router.navigate(['metrics']);
      localStorage.setItem('userData', JSON.stringify(this.sideBarForm));
      this.refreshAllModelService.refresh();
    } else {
      this.form.markAllAsTouched();
    }
  }

}
