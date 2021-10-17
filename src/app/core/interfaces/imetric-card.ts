import {IMetricCardSubtitle} from './imetric-card-subtitle';

export interface IMetricCard {
  leftTitle?: string;
  rightTitle?: string;
  subtitleItems?: IMetricCardSubtitle[];
  description?: string;
}
