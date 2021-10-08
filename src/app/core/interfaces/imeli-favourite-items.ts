import {IMeliItem} from './imeli-item';

export interface IMeliFavouriteItems {
  meliFavouriteItem?: IMeliItem[];
  classified?: boolean;
  totalSum?: number;
}
