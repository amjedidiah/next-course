import { CoffeeStoreType } from "utils/types/coffee-store.type";

export async function fetchCoffeeStores(
  limit = 6 as number,
  lng = 6.457493278054195 as number,
  lat = 3.424143107781287 as number
): Promise<CoffeeStoreType[] | null> {
  let result = null;

  try {
    const options = {
      headers: {
        Authorization: process.env.FOURSQUARE_API_KEY as string,
      },
    };

    const response = await fetch(
      `https://api.foursquare.com/v3/places/search?query=coffee&ll=${lng}%2C${lat}&limit=${limit}`,
      options
    );
    const data = await response.json();
    result = data.results as CoffeeStoreType[];
  } catch (err) {}

  return result;
}
