import {Component, OnDestroy, OnInit} from '@angular/core';
import {MeliModelService} from '../../../core/mode-services/meli-model.service';
import {ActivatedRoute} from '@angular/router';
import {IMeliSingleItem} from '../../../core/interfaces/imeli-single-item';
import {IMeliItemCategory} from '../../../core/interfaces/imeli-item-category';

@Component({
  selector: 'app-sale-item-desk',
  templateUrl: './sale-item-desk.component.html',
  styleUrls: ['./sale-item-desk.component.scss']
})
export class SaleItemDeskComponent implements OnInit, OnDestroy {

  iMeliSingleItem: IMeliSingleItem;
  iMeliItemCategory: IMeliItemCategory;

  constructor(public meliModelService: MeliModelService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    /*this.route.queryParams.subscribe(params => {
      console.log(params['sales/item/id']);
    });*/
    const id = this.route.snapshot.paramMap.get('id');
    // c console.log(this.route.snapshot.paramMap.get('id'));
    this.meliModelService.getSingleItem(id).then(x => {
      this.iMeliSingleItem = x;
      // c console.log(x);
      this.meliModelService.getCategoryBySingleItem(x.category_id).then(category => {
        this.iMeliItemCategory = category;
      });
    });
  }

  ngOnDestroy(): void {
    this.iMeliSingleItem = null;
  }
}
