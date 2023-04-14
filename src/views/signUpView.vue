<template>
  <v-row justify="center">
    <v-card :min-width="1000">
      <v-card-title>
        <span class="text-h5">Sign Up</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-row>
                <v-text-field label="Email*" 
                required
                 @input = "handleEmail"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  label="Password*"
                  type="password"
                  @input="handlePass"
                  required
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  label="Confirm Password*"
                  @input="handleConfirmPass"
                  type="password"
                  required
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue-darken-1" variant="text" @click="closeAct"> Close </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="signAct"> Sign Up </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script setup>
// Variables
let inputArray = []

const userNameRules = [value => !!value || 'required.', value => (value && value.length >= 3) || 'Min 3 characters',] 

const emit = defineEmits(["signUpClicked"])

// Custom events
const handleEmail = (input) => {
  inputArray[1] = input.target.value
};

const handlePass = (input) => {
  inputArray[2] = input.target.value
};

const handleConfirmPass = (input) => {
  inputArray[3] = input.target.value
};

const signAct = () => {
  if( inputArray[2] ==  inputArray[3] &&  inputArray[1] &&  inputArray[2] &&  inputArray[3]){
    emit('signUpClicked', inputArray )

  }
};

const props = defineProps({
  signup: Boolean,
});

// setup code
</script>

//model view presenter, assign data to prop is not allowed, have a method to fire costum
event to the presenter //and set signup to false in presenter. in prop change data to
presenter and pass it down to view
