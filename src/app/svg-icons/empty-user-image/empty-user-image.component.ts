import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-empty-user-image',
  templateUrl: './empty-user-image.component.html',
  styleUrls: ['./empty-user-image.component.scss']
})
export class EmptyUserImageComponent implements OnInit {

  @Input() user= false;

  constructor() { }

  ngOnInit(): void {
  }

}
