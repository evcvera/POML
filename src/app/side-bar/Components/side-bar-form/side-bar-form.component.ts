import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ISideBarForm} from '../../../core/interfaces/iside-bar-form';
import {UserDataModelService} from '../../../core/mode-services/user-data-model.service';

@Component({
  selector: 'app-side-bar-form',
  templateUrl: './side-bar-form.component.html',
  styleUrls: ['./side-bar-form.component.scss']
})
export class SideBarFormComponent implements OnInit {

  form: FormGroup;
  sideBarForm: ISideBarForm = {};

  constructor(private formBuilder: FormBuilder,
              private userDataModelService: UserDataModelService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm(): any {
    this.form = this.formBuilder.group({
      birthday: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      isDolar: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      weeklyHours: ['', [Validators.required]],
      isDepenRelationship: ['', [Validators.required]]
    });
  }

  save(event: Event): any {
    const auxDate = new Date( this.form.get('birthday').value );
    const userTimezoneOffset =  new Date( auxDate).getTimezoneOffset() * 60000;
    this.sideBarForm.birthday = new Date(auxDate.getTime() + userTimezoneOffset);
    this.sideBarForm.gender = this.form.get('gender').value;
    this.sideBarForm.isDollar = this.form.get('isDolar').value;
    this.sideBarForm.salary = this.form.get('salary').value;
    this.sideBarForm.weeklyHours = this.form.get('weeklyHours').value;
    this.sideBarForm.isDepenRelationship = this.form.get('isDepenRelationship').value;
    this.userDataModelService.userData$.next(this.sideBarForm);
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
    } else {
      this.form.markAllAsTouched();
    }
  }

}
