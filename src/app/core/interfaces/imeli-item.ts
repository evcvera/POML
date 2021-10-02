export interface IMeliItem {
  code?: number;
  body?: Body;
}

export interface Body {
  id: string;
  site_id: string;
  title: string;
  subtitle: null;
  seller_id: number;
  category_id: string;
  official_store_id: null;
  price: number;
  base_price: number;
  original_price: null;
  currency_id: string;
  initial_quantity: number;
  available_quantity: number;
  sold_quantity: number;
  sale_terms: SaleTerm[];
  buying_mode: string;
  listing_type_id: string;
  start_time: Date;
  stop_time: Date;
  condition: string;
  permalink: string;
  thumbnail_id: string;
  thumbnail: string;
  secure_thumbnail: string;
  pictures: Picture[];
  video_id: string;
  descriptions: Description[];
  accepts_mercadopago: boolean;
  non_mercado_pago_payment_methods: any[];
  shipping: Shipping;
  international_delivery_mode: string;
  seller_address: SellerAddress;
  seller_contact: SellerContact;
  location: Location;
  coverage_areas: any[];
  attributes: Attribute[];
  warnings: any[];
  listing_source: string;
  variations: Variation[];
  status: string;
  sub_status: any[];
  tags: string[];
  warranty: null;
  catalog_product_id: null;
  domain_id: string;
  parent_item_id: null;
  differential_pricing: null;
  deal_ids: any[];
  automatic_relist: boolean;
  date_created: Date;
  last_updated: Date;
  health: null;
  catalog_listing: boolean;
  channels: string[];
  isFavourite?: boolean;
  isCart?: boolean;
  rating_average?: number;
}

export interface Variation {
  id: number;
  price: number;
  attribute_combinations: AttributeCombination[];
  available_quantity: number;
  sold_quantity: number;
  sale_terms: any[];
  picture_ids: string[];
  catalog_product_id: null;
}

export interface AttributeCombination {
  id: string;
  name: string;
  value_id: null;
  value_name: string;
  value_struct: null;
  values: Value[];
}

export interface Attribute {
  id: string;
  name: string;
  value_id: null | string;
  value_name: string;
  value_struct: Struct | null;
  values: Value[];
  attribute_group_id: string;
  attribute_group_name: string;
}

export interface Struct {
  number: number;
  unit: string;
}

export interface Value {
  id: null | string;
  name: string;
  struct: Struct | null;
}

export interface Description {
  id: string;
}

export interface Location {
  address_line: string;
  zip_code: string;
  neighborhood: CountryClass;
  city: CountryClass;
  state: CountryClass;
  country: CountryClass;
}

export interface CountryClass {
  id: string;
  name: string;
}

export interface Picture {
  id: string;
  url: string;
  secure_url: string;
  size: string;
  max_size: string;
  quality: string;
}

export interface SaleTerm {
  id: string;
  name: string;
  value_id: string;
  value_name: string;
  value_struct: null;
  values: Value[];
}

export interface SellerAddress {
  city: PurpleCity;
  state: CountryClass;
  country: CountryClass;
  search_location: SearchLocation;
  id: number;
}

export interface PurpleCity {
  name: string;
}

export interface SearchLocation {
  neighborhood: CountryClass;
  city: CountryClass;
  state: CountryClass;
}

export interface SellerContact {
  contact: string;
  other_info: string;
  country_code: string;
  area_code: string;
  phone: string;
  country_code2: string;
  area_code2: string;
  phone2: string;
  email: string;
  webpage: string;
}

export interface Shipping {
  mode: string;
  methods: any[];
  tags: any[];
  dimensions: null;
  local_pick_up: boolean;
  free_shipping: boolean;
  logistic_type: string;
  store_pick_up: boolean;
}
