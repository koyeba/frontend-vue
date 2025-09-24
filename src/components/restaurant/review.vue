<script setup lang="ts">
import { type Review } from '~/composables/restaurants';

const props = defineProps<{
  review?: Review
}>();
</script>

<template>
  <VCard v-if="props.review" class="va-company-review mb-4" tag="li">
    <VCardText>
      <div class="mb-3">
        <VRating
          :model-value="props.review.rating"
          readonly
          half-increments
          density="compact"
          color="warning"
          size="small"
        />
      </div>
      <p class="text-body-2 mb-0" style="white-space: pre-line;">
        {{ props.review.text }}
      </p>
    </VCardText>
  </VCard>
</template>
