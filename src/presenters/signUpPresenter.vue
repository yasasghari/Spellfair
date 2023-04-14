<template>
  <v-dialog persistent>
    <!-- <template v-slot:activator="{ props }">
    
        <v-btn 
        :max-width = "100" 
        color="primary"
        v-bind="props"
        >
          Sign Up
        </v-btn >
      </template>
      <sign-up-view
      :signup = "signup"
      :links = "links"
      ></sign-up-view> -->
    <signUpView @signUpClicked="signUpUser"></signUpView>
  </v-dialog>
</template>

<script setup>
  const props = defineProps({
  links: Array,
  signup: Boolean,
}) 
</script>
