<template>
  <div
    id="navbar">    
    <span id = "email" v-if = "model.userEmail.length > 0" 
    >Hello, {{model.userEmail}}</span>
    <v-btn v-if = "(!model.uid) || (model.uid === '-1')" id="signinBtn" class = "button" @click="handleButtonClick">Sign In</v-btn>
    <v-btn v-else id="changeBtn" class = "button" @click="handleButtonClick">Change Account</v-btn> 
    <v-btn v-if = "(model.uid) && (model.uid !== '-1')" id="signoutBtn" class = "button" @click="()=>{emit('googleLogout'); model.resetModel()}">Sign Out</v-btn>

  </div>
</template>

<script setup>


    // Props and emits

    const props = defineProps({ 
      model: {
        type: Object 
      }
    })
    const emit = defineEmits(['googleLogin'])

    // Custom events

    const handleButtonClick = () => {
        emit('googleLogin')
    }

    const handleButtonlogoutClick = () => {
      emit('googleLogout')
    }

</script>