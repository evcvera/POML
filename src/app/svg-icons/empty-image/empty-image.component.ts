import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-empty-image',
  templateUrl: './empty-image.component.html',
  styleUrls: ['./empty-image.component.scss']
})
export class EmptyImageComponent implements OnInit {

  @Input() style = "border-radius: 0.8rem 0.8rem 0 0";

  constructor() { }

  ngOnInit(): void {
  }

}
