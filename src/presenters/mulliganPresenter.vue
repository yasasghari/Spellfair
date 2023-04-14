<!--

-->

<template>
    <mulliganViewVue 
        @mulligan = "drawNewMulligan"
        @draw = "drawACard"
        :cards = "model.mulliganList"
        :errMsg = "error"
    />
</template>

<script setup>

// Imports
import { ref } from 'vue';
import mulliganViewVue from '../views/mulliganView.vue';

// Props and emits

const props = defineProps({
    model: {
        type: Object
    }
})

// Variables

const error = ref("")

// Functions

// Custom events

const drawNewMulligan = () => {
    if(props.model.amountOfCards >= 12){
        props.model.drawSevenCards()
        error.value = ""
    }
    else{
        error.value = "Not enough cards! You should have at least 12 cards in your deck."
    }
}

const drawACard = () => {
    if(props.model.mulliganList.length > 0){
        if(props.model.mulliganList.length > 12){
            error.value = "You cannot draw more than 12 cards."
            return
        }
        props.model.drawOneCard()
        error.value = ""
    }
    else{
        error.value = "Mulligan first, then you can draw more cards."
    }
}

// Loose code

</script>