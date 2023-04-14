<!-- 
    searchPresenter.vue contains components for searching cards. 
    Takes input query from user through SearchFormView, 
    gets cards from API with the String query, 
    converts string results to Scryfall Card Objects,
    sends objects as props to SearchResultsView to render them for the user.

    Search results can be clicked and that card will be added to the current user's deck. 
-->

<template>
    <SearchForm 
        @searchButtonClicked = "searchButtonClickedACB"
        @randomButtonClicked = "randomButtonClickedACB"
        @inputChanged = "newSearchInputACB"
        :isLoading = "isLoading"
        :searchRules = "searchRules"
    />
    <p v-if="noResults">No results found :c</p>
    <SearchResults 
        @cardClicked = "addCardToDeck"
        :cardObjects = "cardObjects"
        :model = "model"
    />
</template>

<script setup>

// Imports

import SearchForm from '../views/searchFormView.vue'
import SearchResults from '../views/searchResultsView.vue'
import { searchCardsName, searchExactName, getRandomCommander } from '../cardSource'
import { ref } from 'vue'

// Props and emits

const props = defineProps({
    model: {
        type: Object
    }
})

const emit = defineEmits(['cardSelected'])

// Variables

const isLoading = ref(false)
const cardObjects = ref([])
const searchInput = ref("")
const noResults = ref(false)

const searchRules = [value => !!value || 'Required.',
    value => (value && value.length >= 3) || 'Min 3 characters',] 


// Functions

// Custom events

/**
* Save the input from the search text field in searchPresenter.vue 
* @param {String} input - Search input from user
*/
const newSearchInputACB = input => {
    searchInput.value = input
}

/**
* User clicked search button. Function will take the input string to make an Scryfall API call and get an array of best search results. They are stored as an array of maximum 20 Strings and converted to objects in order to show them to user.
*/
const searchButtonClickedACB = () => {
    
    const logSearchResultsACB = object => {

        const convertResultsToObjects = card => {

            const logPromiseResult = object => {
                cardObjects.value.push(object)
            }

            Promise.resolve(searchExactName({q:card}))
            .then(logPromiseResult)
            .catch(error => {error.json})

            noResults.value = false
        }

        object.map(convertResultsToObjects)
    }

    if(isLoading.value) return

    isLoading.value = true
    cardObjects.value = []

    if(searchInput.length < 3) return

    Promise.resolve(searchCardsName({q:searchInput.value}))
    .then(logSearchResultsACB)
    .catch(error => {error.json})
    .finally(() => (isLoading.value = false))

    noResults.value = true
}

/**
 * User clicked on a "random" button, random commander should be given to them
 */
const randomButtonClickedACB = () => {

    const pushRandomCard = commander => {
        cardObjects.value.push(commander)
    }

    cardObjects.value = []

    Promise.resolve(getRandomCommander())
    .then(pushRandomCard)
    .catch(error => {error.json})
}

/**
 * User clicked on a card in search results and the card should be added to user's current deck
 * @param {Object} card - Card that needs to be added to a deck 
 */
const addCardToDeck = card => {
    props.model.addSingleCard(card.name, 1)
}



</script>