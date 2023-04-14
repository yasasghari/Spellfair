<!--
  TODO description
-->

<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script setup>

// Imports

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

// Props and emits

const props = defineProps({
  deckList: {
    type: Array, 
    required: true
  },
  chartId: {
    type: String,
    default: 'cmc-chart'
  },
  datasetIdKey: {
    type: String,
    default: 'label'
  },
  width: {
    type: Number,
    default: 200
  },
  height: {
    type: Number,
    default: 200
  },
  cssClasses: {
    type: String,
    default: ""
  },
  styles: {
    type: Object,
    default: () => {}
  },
  plugins: {
    type: Object,
    default: () => {}
  }
})

// Variables

const chartData = {
  backgroundColor: '#f87979',
  labels: [ '0','1', '2', '3','4','5','6','7+' ],
  datasets: [ { data: [0, 14, 17, 23, 6, 5, 0, 1] } ]
}
const chartOptions = {
  responsive: true
}

// Functions

function manaValues(){
    deckList.forEach(element => {
        
    });
}

// Custom events

// Loose code

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

</script>