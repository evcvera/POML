import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-nav-bar',
  templateUrl: './bottom-nav-bar.component.html',
  styleUrls: ['./bottom-nav-bar.component.scss']
})
export class BottomNavBarComponent implements OnInit {

  get tabletOrLess(): boolean {
    return window.innerWidth <= 991;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
