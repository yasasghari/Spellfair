<!--
  Main content TODO description
-->

<!-- 
  Responsive design:
    xs - extra small - < 600px - phone
    sm - small - 600><960px - tablet
    md - medium - 960><1264px - large tablet or laptop
    lg - large - 1264><1904px - desktop
    xl - extra large - >1904px - 4k monitors 
 -->

<template>
  <v-main>
    <v-container>
      <v-row dense>
        <v-col
          cols="12"
          sm="6"
          md="3"
        >
          <v-sheet class="pa-4 rounded-lg rounded-b-0" color="deep-purple-lighten-2">
            SEARCH
          </v-sheet>
          <v-sheet rounded class="rounded-t-0">
            <div id="search">
              <SearchPresenter
                :model = "model"
              />
            </div>
          </v-sheet>
        </v-col>
        <v-col 
          cols="12"
          sm="6"
          md="3"
        >
          <v-sheet class="pa-4 rounded-lg rounded-b-0" color="deep-purple-lighten-1">
            CARD DETAILS
          </v-sheet>
          <v-sheet rounded class="rounded-t-0">
            <div id="selected">
              <SelectedCardPresenter 
                :model = "model"
                :selected = "model.selectedCard"
              />
            </div>
          </v-sheet>
        </v-col>
        <v-col 
          cols = "12"
          md="6"
        >
          <v-sheet class="rounded-lg rounded-b-0" color="deep-purple-darken-1">
            <DeckTitlePresenter
            :model = "model"
          />
          </v-sheet>
          <v-sheet rounded class="rounded-t-0">
            <div id ="deck">
              <DeckPresenter
                :deckList = "model.deckList"
                :model = "model"
              />
            </div>
          </v-sheet>
        </v-col>
        <v-col cols = "12">
          <v-sheet rounded class = "pa-4 rounded-lg rounded-b-0" color="deep-purple-darken-2">
            MULLIGAN SIMULATION
          </v-sheet>
          <v-sheet>
            <div id="mulligan">
              <MulliganPresenter 
                :model = "model"
              />
            </div>
          </v-sheet>
        </v-col>
        <!-- <v-col cols = "12">
          <v-sheet rounded class = "pa-4 rounded-lg rounded-b-0" color="deep-purple-darken-3">
            DECK STATISCTICS
          </v-sheet>
          <v-sheet>
            <div id="stats">
              <StatisticsPresenter 
                :model = "model"
              />
            </div>
          </v-sheet>
        </v-col> -->
      </v-row>
    </v-container>
  </v-main>
</template>


<script setup>

  // Imports

  import SelectedCardPresenter from '../presenters/selectedCardPresenter.vue';
  import SearchPresenter from '../presenters/searchPresenter.vue';
  import DeckPresenter from '../presenters/deckPresenter.vue';
  import MulliganPresenter from '../presenters/mulliganPresenter.vue';
  import DeckTitlePresenter from '../presenters/deckTitlePresenter.vue';
  //import StatisticsPresenter from '../presenters/statisticsPresenter.vue';

  // Props and emits

  const props = defineProps({
      model : {
        type : Object,
        required : true
      }
    })

  // Variables

  // Custom events

</script>