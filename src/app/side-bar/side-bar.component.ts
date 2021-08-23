import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor() {
  }

  public isCollapsed = false;

  ngOnInit(): void {
  }

  changeTogle(): void {
    this.isCollapsed = !this.isCollapsed;
  }

}
