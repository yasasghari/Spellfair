<template>
  <navBarViewVue 
    @googleLogin = "loginToGoogle"
    :model = "model"
  />
</template>

<script setup>
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseModel.js";
import navBarViewVue from "../views/navBarView.vue";

const props = defineProps({
  model:{
    type: Object 
  }
})

var signedIn = false
const loginToGoogle = async () => {
  // Create an instance of the Google provider object:
  var provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account",
  });


  


  signInWithPopup(auth, provider)
    .then((result) => {
      var credential = GoogleAuthProvider.credentialFromResult(result);

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info, it will give you all basic info of logged-in user
      var user = result.user;

      
    })
    .catch((error) => {

      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    });
};



</script>

