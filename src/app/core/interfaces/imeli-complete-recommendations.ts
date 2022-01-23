export interface IMeliCompleteRecommendations {
  attributes_list?: AttributesList[];
  recommended_products?: RecommendedProduct[];
  tracking?: Tracking;
  client?: string;
  site_id?: string;
  backend?: Backend;
  title?: string;
  labels?: Labels;
  priority?: number;
}

export interface AttributesList {
  id?: string;
  title?: string;
  type?: string;
}

export interface Backend {
  id?: string;
  type?: string;
}

export interface Labels {
  this_product?: string;
  see_product?: string;
  more_details?: string;
  tab?: string;
  empty_column?: string;
}

export interface RecommendedProduct {
  id?: string;
  status?: string;
  trigger?: boolean;
  site_id?: string;
  domain_id?: string;
  permalink?: string;
  name?: string;
  img_url?: string;
  img_max_width?: number;
  img_max_height?: number;
  product_details?: ProductDetails;
  item_id?: string;
  parent_id?: string;
  official_store_id?: number;
}

export interface ProductDetails {
  REVIEWS?: Reviews;
  PRICE?: Price;
  COLOR?: Color;
  IS_DUAL_SIM?: Color;
  SIM_CARD_SLOTS_NUMBER?: Color;
  COMPATIBLE_SIM_CARD_SIZES?: Color;
  INTERNAL_MEMORY?: Color;
  RAM?: Color;
  WITH_MEMORY_CARD_SLOT?: Color;
}

export interface Color {
  text?: string;
}

export interface Price {
  value?: number;
  currency_symbol?: string;
  decimal_separator?: string;
  thousand_separator?: string;
}

export interface Reviews {
  count_reviews?: number;
  rating_average?: number;
}

export interface Tracking {
  event_data?: EventData;
  path?: string;
  experiments?: Experiments;
}

export interface EventData {
  recommendations?: Recommendations;
}

export interface Recommendations {
  recommendation_id?: string;
  backend_id?: string;
  client?: string;
  track_info?: TrackInfo;
  has_errors?: boolean;
  hidden_by_client?: boolean;
}

export interface TrackInfo {
  model_version?: string;
  experiment_name?: string;
  has_recommendations?: boolean;
  backend_id?: string;
  recommended_products?: TrackInfoRecommendedProduct[];
  train_date?: Date;
  model?: string;
  recommended_items?: string[];
  trigger?: Trigger;
  products?: string[];
}

export interface TrackInfoRecommendedProduct {
  item_id?: string;
  id?: string;
}

export interface Trigger {
  trigger_type?: string;
  product?: Product;
}

export interface Product {
  id?: string;
  status?: string;
  domain_id?: string;
  item_id?: string;
  parent_id?: string;
}

export interface Experiments {
  cualquierCosa?: string;
}
