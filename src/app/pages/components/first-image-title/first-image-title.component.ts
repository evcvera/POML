import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-first-image-title',
  templateUrl: './first-image-title.component.html',
  styleUrls: ['./first-image-title.component.scss']
})
export class FirstImageTitleComponent implements OnInit {

  isImgLoaded: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.isImgLoaded = false;
  }


  imgLoaded(): void {
    this.isImgLoaded = true;
  }

}
