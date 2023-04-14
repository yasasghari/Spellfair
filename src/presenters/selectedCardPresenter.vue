<!--
  selectedCardPresenter.vue displays a card's image and some of the card details
  It changes depending on what card is being hovered
-->

<template>
  <SelectedCardView
    :selected = "selected"
  />
</template>

<script setup>

// Imports

import SelectedCardView from '../views/selectedCardView.vue'

// Props

const props = defineProps({
  model: {
    type: Object
  },
  selected: {
    type: Object
  }
})

// Variables

// Functions

// Loose Code

</script>
