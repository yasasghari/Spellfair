<!--
    searchFormView.vue renders UI for search
    There is a vuetify components: text field and a button.
    Text field fires on @input native event to store user's search query in searchPresenter
    Button fires on @click native event to search with query in the searchPresenter
-->

<template>
    <div>
        
        <v-text-field
            id = "searchBar"
            @input = "handleInput"
            :loading = "props.isLoading"
            :rules = "searchRules"
            label = "Search a card"
            placeholder = "Enter card name"
            required minlength="4"
            clearable
            hide-details
            dense
            autofocus
        ></v-text-field>
        <v-btn
            @click = "handleSearchClick"
            id = "searchBtn"
            class = "button"
            fab
        >
            Search
        </v-btn>
        <v-btn
            @click = "handleRandomClick"
            id = "randomBtn"
            class = "button"
        >
            Random commander
        </v-btn>
    </div>
</template>

<script setup>

// Imports

// Props and emits

const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false
    },
    searchRules: {
        type: Array
    }
})

const emit = defineEmits(['inputChanged', 'searchButtonClicked', 'randomButtonClicked'])


// Variables

// Functions


// Custom events

/**
 * Whenever input in v-text-field is changed, save new value in the searchPresenter
 * @param {String} input - Search query 
 */
const handleInput = input => {
    emit('inputChanged', input.target.value)
}

/**
 * Whenever a button is clicked, notify searchPresenter
 */
const handleSearchClick = () => {
    emit('searchButtonClicked')
}

/**
 * Whenever a random button clicked, notify searchPresenter
 */
const handleRandomClick = () => {
    emit('randomButtonClicked')
}

// Loose code

</script>