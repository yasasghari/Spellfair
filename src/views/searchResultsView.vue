<!--
    searchResultsView.vue shows search results
    Gets array of card objects from searchPresenter,
    renders individual card results through cardInstancePresenter
    
    search results can be clicked and sent to the searchPresenter to add card to a deck
-->

<template>
    <v-list density = "compact">
        <cardInstancePresenterVue
            v-for="(card, i) in cardObjects"
            @click = "handleResultClick(card)"
            :cardToPresent = "card"
            :key="i"
            :model = "model"
        ></cardInstancePresenterVue>
    </v-list>
</template>

<script setup>

    // Imports

    import cardInstancePresenterVue from '../presenters/cardInstancePresenter.vue';

    // Props and emits

    const props = defineProps({
       cardObjects: {
            type: Array,
       },
       model: {
            type: Object
       }
    })

    const emit = defineEmits(['cardClicked'])

    // Variables

    // Functions

    // Custom events

    /**
     * A card from results was clicked and should be added to the deck
     * @param {Object} card 
     */
    const handleResultClick = card => {
        emit('cardClicked', card)
    }

    // Loose code

</script>