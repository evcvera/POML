import {Component, Input, OnInit} from '@angular/core';
import { Picture } from 'src/app/core/interfaces/imeli-item';

@Component({
  selector: 'app-tini-left-img',
  templateUrl: './tini-left-img.component.html',
  styleUrls: ['./tini-left-img.component.scss']
})
export class TiniLeftImgComponent implements OnInit {

  @Input() pictures: Picture[];

  constructor() { }

  ngOnInit(): void {
  }

}
