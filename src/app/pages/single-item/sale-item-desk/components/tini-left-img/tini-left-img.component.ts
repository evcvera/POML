import {Component, Input, OnInit} from '@angular/core';
import {Picture} from 'src/app/core/interfaces/imeli-item';
import {MeliModelService} from '../../../../../core/mode-services/meli-model.service';
import {IMeliSingleItem} from '../../../../../core/interfaces/imeli-single-item';
import {IMeliItemImg} from '../../../../../core/interfaces/imeli-item-img';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tini-left-img',
  templateUrl: './tini-left-img.component.html',
  styleUrls: ['./tini-left-img.component.scss']
})
export class TiniLeftImgComponent implements OnInit {

  @Input() picture: IMeliItemImg;

  constructor(private meliModelService: MeliModelService) {
  }

  ngOnInit(): void {
  }

  setSelectedImage(secureUrl: string): void {
    if (this.meliModelService.singleItemImages$.value.length > 0) {
      this.meliModelService.singleItemImages$.value.forEach(x => {
        x.isSelected = (x.secure_url === secureUrl);
      });
    }
  }


  setImage(): void {
  }
}
