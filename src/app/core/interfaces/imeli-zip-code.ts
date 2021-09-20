export interface IMeliZipCode {
  zip_code: string;
  city: City;
  state: City;
  country: City;
}

export interface City {
  id: null | string;
  name: null | string;
}
