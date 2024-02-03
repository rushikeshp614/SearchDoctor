import { Context } from 'koa';
import { Client, PlacesNearbyRanking } from '@googlemaps/google-maps-services-js';
import delayAPI from '../utils/api-delay-time';
import BadRequestError from '../errors/bad-request';
import dotenv from 'dotenv';
dotenv.config();

const MAX_RESULTS = 50;
const DELAY_BETWEEN_REQUESTS = 2000;


const client = new Client();


const getData = async (ctx: Context): Promise<void> => {
  const { lat, lng } = ctx.request.query;

  if (!lat || !lng) {
    throw new BadRequestError(`Latitude and Longitude must be provided.`);
  }

  try {
    let allResults: any[] = [];
    let placesResponse: any = {};

    while (allResults.length < MAX_RESULTS) {
      placesResponse = await client.placesNearby({
        params: {
          location: {
            lat: parseFloat(lat as string),
            lng: parseFloat(lng as string),
          },
          keyword: 'doctor',
          // key: "AIzaSyCzyc2lSjhKHeJm4dh3JictvHBiR4_UKRk",
          key: `${process.env.API_KEY}`,
          rankby: PlacesNearbyRanking.distance,
          type: 'health',
          pagetoken: allResults.length > 0 ? placesResponse?.data.next_page_token : undefined,
        },
      });

      const places = placesResponse?.data.results || [];
      allResults = [...allResults, ...places];

      if (!placesResponse?.data.next_page_token) {
        break;
      }

      await delayAPI(DELAY_BETWEEN_REQUESTS);
    }

    const gps = allResults.slice(0, MAX_RESULTS).map((place) => ({
      name: place.name,
      address: place.vicinity,
      location: place.geometry?.location,
    }));

    ctx.body = gps;
  } catch (e) {
    console.error(JSON.stringify(e));
    throw e; 
  }
};

export default getData