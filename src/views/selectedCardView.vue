<!--
  selectedCardView renders hovered card's image and name
-->

<template>
    <div id="selectedCardName"><b>&lt;{{selected.name}}&gt;</b></div>
    <div>
        <v-img id = "selectedCardImg"
            :src = selected.image_uris.normal>
        </v-img>
    </div>
    <div id="selectedDetails">
      <p v-if="selected.set_name"><b>Set:</b> {{selected.set_name}}</p>
      <p v-if="selected.oracle_text"><b>Rules:</b> {{selected.oracle_text}}</p>
    </div>
</template>

<script setup>

// Imports

// Props and emits

const props = defineProps({
  selected: {
    type: Object
  }
})

// Variables

// Functions

// Custom events

// Loose code

</script>

