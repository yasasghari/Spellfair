<template>
    <div v-if="(deckList && deckList.length > 0) || (model && model.uid !== '-1')"></div>
     <div v-else><v-img  height="100px"
    width="500px"  src="https://media.tenor.com/DPEfCqnChk0AAAAi/loading-slow-net.gif" class="loading" /></div>
     
</template>
<script setup>
import { ref } from 'vue';
import { auth } from "../firebaseModel.js";


const props = defineProps({
    deckList : {
        type : Object
    },
    model : {
        type : Object
    }
})
</script>

