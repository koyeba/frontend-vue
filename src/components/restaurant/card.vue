<script setup lang="ts">
import { type Restaurant, getAverageRestaurantRating } from '~/composables/restaurants';

const props = defineProps<{
  restaurant: Restaurant
}>();

const averageRating = computed(() => getAverageRestaurantRating(props.restaurant));
</script>

<template>
  <VCard>
    <VImg
      height="100"
      cover
      :src="restaurant?.photos?.[0]"
    />
    <VCardTitle>
      {{ restaurant?.name }}
    </VCardTitle>
    <div class="mx-4 mb-2 flex items-center">
      <VRating
        :model-value="averageRating"
        readonly
        half-increments
        density="compact"
        color="warning"
      />
      <span class="text-sm text-gray-600 ml-2">
        {{ averageRating.toFixed(1) }} ({{ restaurant?.reviews?.length || 0 }} avis)
      </span>
    </div>
    <VCardText>
      <RestaurantLocation :location="restaurant?.location" />
    </VCardText>
    <VCardActions class="mt-auto">
      <VBtn color="primary" variant="tonal" :to="`/restaurants/${restaurant?.id}`">
        see more
      </VBtn>
    </VCardActions>
  </VCard>
</template>
