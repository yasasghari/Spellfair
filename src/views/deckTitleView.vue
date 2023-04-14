<!--
Fancy title display that can be edited to change the decks name. 
-->

<template>
  <v-text-field 
    @update:model-value = "handleInput"
    :model-value = "title"
    label="Deck name"
  />
</template>
  
<script setup>

// Imports

// Props

const props = defineProps({
  title : {
      type :String
  }
})
const emit = defineEmits(['inputChanged'])


// Variables

// Functions

// Custom events
const handleInput = input => {
  emit('inputChanged', input)
}

// Loose Code

</script>