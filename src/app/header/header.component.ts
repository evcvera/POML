import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get notTablet(): boolean {
    return window.innerWidth > 991;
  }

  constructor() { }

  public isCollapsed = true;

  ngOnInit(): void {
  }

}
