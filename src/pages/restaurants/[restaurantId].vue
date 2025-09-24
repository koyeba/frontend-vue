<script setup lang="ts">
import { useFetchRestaurant, getAverageRestaurantRating } from '~/composables/restaurants';

const { params } = useRoute();
const { data: restaurant, isError } = useFetchRestaurant({ restaurantId: params.restaurantId });
const averageRating = computed(() => 
  restaurant.value ? getAverageRestaurantRating(restaurant.value) : 0
);
</script>

<template>
  <VAlert v-if="isError" type="warning" class="mt-4">
    Restaurant introuvable.
  <VBtn variant="text" size="small" @click="$router.push('/')" class="ml-2">
    Retour à la liste
  </VBtn>
  </VAlert>
  <div v-else class="grid grid-cols-[minmax(0,_1fr)_16rem] gap-6">
    <VCard v-if="restaurant">
      <VImg
        v-for="photo in restaurant.photos"
        :key="photo"
        :src="restaurant.photos[0]"
        height="250"
        cover
        gradient="to top, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
        <VCardTitle class="!text-4xl text-white">
          {{ restaurant.name }}
        </VCardTitle>
        <div class="mx-4 mb-2 flex items-center">
          <VRating
            :model-value="averageRating"
            readonly
            half-increments
            density="compact"
            color="warning"
          />
          <span class="text-sm text-white ml-2 bg-black bg-opacity-50 px-2 py-1 rounded">
            {{ averageRating.toFixed(1) }} ({{ restaurant?.reviews?.length || 0 }} avis)
          </span>
        </div>
      </VImg>
      <VCardText>
        <div class="grid grid-cols-2 gap-4">
          <RestaurantLocation :location="restaurant.location" />
          <KeyValue icon="mdi-phone">
            <p class="text-body-1">
              {{ restaurant.display_phone }}
            </p>
          </KeyValue>
        </div>
      </VCardText>
    </VCard>
    <aside>
      <VAlert type="warning">
        TODO: this should go under the company card on small device
      </VAlert>
      <ul class="pa-0">
        <RestaurantReview />
      </ul>
    </aside>
  </div>
</template>
