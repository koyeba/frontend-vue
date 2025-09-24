import { api } from '~/services/api';

export interface Restaurant {
  name: string
  id: string
  url: string
  phone: string
  display_phone: string
  photos: string[]
  location?: Location
  reviews: Review[]
}

export interface Location {
  address1: string
  city: string
  postal_code: string
  formatted_address: string
}

export interface Review {
  text: string
  rating: number
  id: string
}

export function useFetchRestaurants() {
  return useQuery({
    queryKey: [`restaurants-list`],
    queryFn: () => {
      const url = `restaurants`;
      return api(url).json<Restaurant[]>();
    },
  });
}

export function useFetchRestaurant({ restaurantId }: { restaurantId: string | string[] }) {
  return useQuery({
    queryKey: [`company`, restaurantId],
    queryFn: () => {
      const url = `restaurants/${restaurantId}`;
      return api(url).json<Restaurant>();
    },
  });
}

export function getAverageRestaurantRating(restaurant: Restaurant): number {
  if (!restaurant?.reviews || restaurant.reviews.length === 0) {
    return 0;
  }
  
  const totalRating = restaurant.reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((totalRating / restaurant.reviews.length) * 10) / 10; // Arrondi à 1 décimale
}
