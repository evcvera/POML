import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  constructor() {
  }

  @Input() rating: number;

/*  iconClass = {
    0: 'far fa-star',
    0.5: 'fas fa-star-half-alt',
    1: 'fas fa-star'
  };

  iconStyles = {
    0: 'void',
    0.5: 'half',
    1: 'full'
  };

  stars: number[] = [0, 0, 0, 0, 0]; // five empty stars*/

  ngOnInit(): void {
  }/*

  ngOnChanges(): void {
    this.fillStars();
  }

  fillStars(): void {
    let starsToFill = Math.round(this.rating * 2) / 2; // round to nearest 0.5
    console.log(starsToFill);
    let i = 0;
    while (starsToFill > 0.5) {
      this.stars[i] = 1;
      i++;
      starsToFill--;
    }
    if (starsToFill === 0.5) {
      this.stars[i] = 0.5;
    }
  }*/

}
