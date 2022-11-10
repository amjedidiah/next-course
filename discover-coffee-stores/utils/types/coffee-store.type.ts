type CoffeeStoreLocation = {
  address?: string;
  address_extended?: string;
  census_block?: string;
  country: string;
  cross_street: string;
  dma?: string;
  formatted_address: string;
  locality: string;
  neighborhood?: string[];
  postcode: string;
  region: string;
}

type CoffeeStoreCategory = {
  icon: {
    prefix: string;
    suffix: string;
  };
  id: string;
  name: string;
  plural_name?: string;
  primary?: boolean;
  short_name?: string;
}

type CoffeeStoreGeoCode = {
  latitude: number;
  longitude: number;
}

type CoffeeStoreGeoCodes = {
  main: CoffeeStoreGeoCode;
  roof: CoffeeStoreGeoCode;
}

export type CoffeeStoreType = {
  fsq_id: string;
  categories: CoffeeStoreCategory[];
  chains: string[];
  distance: number;
  geocodes: CoffeeStoreGeoCode;
  link: string;
  location: CoffeeStoreLocation;
  name: string;
  imgUrl?: string;
  timezone: string;
};