<template>
  <v-app>
    <NavBar 
    :model = "model"
    />
    <MainContent
      id = "Main"
      :model = "model" 
    />
  </v-app>
</template>


<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import DeckModel from "./DeckModel";
import MainContent from "./components/MainContent.vue";
import { ref } from "vue";
//import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBar from "./presenters/navBarPresenter.vue";
import {auth} from "./firebaseModel.js"
import {updateFirebaseFromModel, updateModelFromFirebase} from "./firebaseModel.js"

// Loose code

let model = ref(new DeckModel(""))
let user = auth

onAuthStateChanged(auth, (user) => {

  if (user) {
    // console.log("User logged in!")
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.Userm
    //model.changeTitle = ref(changeTitle("IMPORTED DECK"));
    updateFirebaseFromModel(model.value)
    model.value.deckList = []
    model.value.setUID(user.uid);
    // console.log(model.value.uid)
    model.value.setEmail(user.email)
    model.value.commander = null; 
    model.value.title = ""
    model.value.description ="";
    updateModelFromFirebase(model.value)


  } else {
   model.value.resetModel(); 
  }
});




//var signedIn = false
</script>

