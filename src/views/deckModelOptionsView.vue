<template>
    <div>{{description}}</div>
    <div
      @click = "handleSelectClick"
    >
      <select
        name="Commander"
        id="commanderSelect"
        @change="handleOptionChange"
      >
        <option>Choose commander</option>
        <option v-for="(item, i) in items" :value="items[i]">{{item}}</option>
      </select>
    </div>
    <v-divider/>
</template>

<script setup>
/**
 * DISPLAYS NAME OF DECK, TWO BUTTONS TO IMPORT AND EXPORT AS scryfall format. 
 * todo support mtgo/mtga format
 */
const emit = defineEmits(['SelectClick', 'optionChange']); 
// Props and emits
const props = defineProps({
  description: {
    type : String
  },
  items: {
    type: Array
  }
})

// Variables

// Functions

// Custom events

const handleSelectClick = () => {
  emit('SelectClick')
}

const handleOptionChange = option => {
  emit('optionChange', option.target.value)
}

// Loose code
</script>
