<template>
    <bigDeckView
        @cardClick="removeClickedCard"
        @selectClick="findCandidates"
        @optionChange="handleChagingCommander"
        :deckList = "deckList"
        :model = "model"
        :candidates="candidates"
        :commander ="model.commander"
    />
</template>

<script setup>

import { ref } from 'vue';
import bigDeckView from '../views/bigDeckView.vue'

// Props

const props = defineProps({
  deckList: {
    type: Array
  },
  model: {
    type: Object
  }
})

const candidates = ref([])
// Custom events
const removeClickedCard = card => {
  props.model.removeACard(card)
}

const findCandidates = () => {
  const nameCB = card => {
    return card.name
  }

  props.model.findCommanders()

  candidates.value = props.model.commanderCandidates.map(nameCB)
}

const handleChagingCommander = option => {
  if(props.model.commander){
    props.model.addSingleCard(props.model.commander.name)
  }
  props.model.removeCommanderFromDeck(option)
  props.model.setCommander(option)
}

// Loose code

</script>