<!--
Fancy title display that can be edited to change the decks name. 
-->

<template>
    <DeckTitleView
      @inputChanged = "changeDeckTitle"
      :title = "model.title"
    ></DeckTitleView>
</template>
  
<script setup>
  
// Imports

import DeckTitleView from '../views/deckTitleView.vue';
import { ref } from 'vue';

// Props

const props = defineProps({
  model : {
    type : Object
  }
})

// Variables

// Functions

// Custom events
const changeDeckTitle = input => {
  props.model.changeName(input)
}

// Loose Code

</script>