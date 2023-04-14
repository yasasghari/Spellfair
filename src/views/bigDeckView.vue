<!--
  TODO description
-->

<template>
  <div v-if = "(model.commander)"
    id = "commander"
  >
    <v-list-subheader>Commander</v-list-subheader>
      <cardInstancePresenter
        :model = "model"
        :cardToPresent = "commander"
      />
    <v-divider/>
  </div>
  <!-- <deckModelOptionsViewVue
    @optionChange ="handleOptionChange"
    @SelectClick = "handleSelectClick"
    :description = "model.description"
    :items = "candidates"
  /> -->
  <promiseNoData :deckList = "model.deckList" :model = "model"/>
  <div v-if= "(deckList && deckList.length < 30)">
    <deckView 
        @cardClicked="cardClicked"
        :deckList = "deckList"
        :model = "model"
    />
  </div>
  <div v-else>
    <v-row dense>
      <v-col 
        class = "deckList"
        width ="50%"
      >
        <deckView
          @cardClicked="cardClicked"
          :deckList = "deckList.slice().splice(0, Math.ceil(deckList.length/2))"
          :model ="model"
        />
      </v-col>
      <v-col 
        class = "deckList"
        width ="50%"
      >
        <deckView
          @cardClicked="cardClicked(card)"
          :deckList = "deckList.slice().splice(Math.ceil(deckList.length/2), deckList.length)"
          :model ="model"
        />
      </v-col>
    </v-row>
  </div>
  
</template>

<script setup>

// Imports

import deckView from "./deckView.vue"
import deckModelOptionsViewVue from "./deckModelOptionsView.vue";
import cardInstancePresenter from "../presenters/cardInstancePresenter.vue";
import promiseNoData from "../components/promiseNoData.vue"

// Props and emits

const props = defineProps({
  deckList: {
    type: Array
  },
  model: {
    type: Object
  },
  candidates:{
    type: Array
  },
  commander: {
    type: Object
  }
})

const emit = defineEmits(['cardClick', 'selectClick', 'optionChange'])

// Variables

// Functions

// Custom events
const cardClicked = card => {
  emit('cardClick', card)
}

const handleSelectClick = () => {
  emit('selectClick')
}

const handleOptionChange = option => {
  emit('optionChange', option)
}
// Loose code
</script>
