<!--
    cardInstancePresenter gets a card object and passes card's name and manacost to the cardInstanceView.
    This presenter can be called from search results and deckview, which have a bit different card objects
    The one from deckview has number of cards and the real card object in card.cardInfo
-->

<template>
    <div>
        <cardInstanceView v-if = images
            @selectHovered = "selectHoveredCard"
            :cardString = "cardString"
            :manaImages = "images"
        ></cardInstanceView>
    </div>
</template>

<script setup>

// Imports

import cardInstanceView from '../views/cardInstanceView.vue';
import { getManaNew } from '../utilities.js'
import { ref, onMounted} from 'vue';

// Props and emits

const props = defineProps({
    cardToPresent: {
        type: Object
    },
    model: {
        type: Object
    }
})

// Variables

const images = ref(null)
const cardString = ref("")
const nameLimit = 25

// Functions

// Custom events

/**
 * Changes selected card in the deck model when a card is hovered
 */
const selectHoveredCard = () => {
    if(props.cardToPresent.cardInfo){
        props.model.selectNewCard(props.cardToPresent.cardInfo)
    }
    else{
        props.model.selectNewCard(props.cardToPresent)
    }
}

// Loose code

/*
* If the card is coming from deckview, it will be treated differentely, since the needed object is inside another object
* otherwise it will be used directly
*/
if(props.cardToPresent.cardInfo){
    onMounted(async() => {images.value = await(getManaNew(props.cardToPresent.cardInfo.mana_cost))})
    cardString.value = props.cardToPresent.nmr + 'x' + props.cardToPresent.cardInfo.name
}
else{
    onMounted(async() => {images.value = await(getManaNew(props.cardToPresent.mana_cost))})
    cardString.value = props.cardToPresent.name
}

if(cardString.value.length > nameLimit){
    cardString.value = cardString.value.slice(0, nameLimit) + "..."
}

</script>
