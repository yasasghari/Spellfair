<!--
  deckView.vue renders user's deck
  TODO description
-->

<template>
  <v-card
    class="mx-auto"
    tile
  >

    <v-list density="compact">
      <div>
        <cardInstancePresenterVue
          @click = "handleResultClick(item)"
          :cardToPresent = "item"
          v-for="(item, i) in deckList" 
          :key="item.nmr + item.cardInfo.id"
          :model = "model">
        ></cardInstancePresenterVue>
      </div>
    </v-list>
  </v-card>
</template>

<script setup>

// Imports 

import cardInstancePresenterVue from '../presenters/cardInstancePresenter.vue';

// Props and emits
const props = defineProps({
  deckList: {
    type : Array,
    required : true
  },
  model: {
    type: Object
  }
})
const emit = defineEmits(['cardClicked'])

// Variables

// Functions
const handleResultClick = card => {
  emit('cardClicked', card)
}
// Custom events

// Loose code

</script>
