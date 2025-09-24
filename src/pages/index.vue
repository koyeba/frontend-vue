<script setup lang="ts">
import { useFetchRestaurants, getAverageRestaurantRating } from '~/composables/restaurants';

const { data: restaurants, isError } = useFetchRestaurants();
const selectedRating = ref(0);

const filteredRestaurants = computed(() => {
  if (!restaurants.value || selectedRating.value === 0) {
    return restaurants.value;
  }
  
  return restaurants.value.filter(restaurant => {
    const avgRating = getAverageRestaurantRating(restaurant);
    return avgRating >= selectedRating.value;
  });
});
</script>

<template>
  <div>
    <RatingFilter v-model="selectedRating" />
    <LoadingError v-if="isError" />
    <div v-else-if="filteredRestaurants" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
      <RestaurantCard
        v-for="restaurant of filteredRestaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
      />
    </div>
  </div>
</template>
