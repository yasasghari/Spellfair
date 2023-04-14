<!--
    mulliganView renders two buttons for drawing seven cards from the beginning and drawing one card until it's twelve.
    Also renders an error message when user trying to press buttons when they do not work due to logic.
    When buttons are pressed correctly, the view renders mulliganed and drawed cards
-->

<template>
    <div id="mulliganBtns">
        <v-btn
            @click = "handleMulliganClick"
            class = "button"
        >Mulligan</v-btn>
        <v-btn
            @click = "handleDrawClick"
            class = "button"
        >Draw</v-btn>
    </div>
    <p v-if="(errMsg.length > 0)">{{errMsg}}</p>
    <div id="mulliganCards">
        <v-img class = "mCard"
            v-for = "(srcImg, i) in cards"
            :src = "srcImg.image_uris.normal"
            :alt = "srcImg.name"
        />
    </div>
</template>

<script setup>

// Imports

// Props and emits

const props = defineProps({
    cards: {
        type: Array
    },
    errMsg: {
        type: String
    }
})

const emit = defineEmits(['mulligan', 'draw'])

// Variables

// Functions

// Custom events

const handleMulliganClick = () => {
    emit('mulligan')
}

const handleDrawClick = () => {
    emit('draw')
}

// Loose code

</script>