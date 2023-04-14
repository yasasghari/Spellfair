<!--
    cardInstanceView renders one card as it's name and manacosst
    Each card can be hovered to see details through the selected card
-->

<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-list-item class = "cardLine" dense
            @mouseover = "itemHovered"
            :elevation="isHovering ? 5 : 1"
            :class="{ 'on-hover': isHovering }"
            v-bind="props"
            max-height ="20"
        >
            {{cardString}}
            <v-img v-for = "(srcImg, i) in manaImages"
                :src = "srcImg"
                class = "my-1 float-right"
                width = "14"
                height = "14"
            />
        </v-list-item>
    </v-hover>
</template>

<script setup>

// Imports

// Props and emits

const props = defineProps({
    manaImages: {
        type: Array
    },
    cardString: {
        type: String
    }
})

const emit = defineEmits(['selectHovered'])

// Variables

// Functions

// Custom events

/**
 * Whenever a mouse is over a card in any list (deck or results), it will update selected card
 */
const itemHovered = () => {
    emit('selectHovered')
}

// Loose code

</script>