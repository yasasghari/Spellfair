<template>
  <v-row justify="center">

      <v-card :min-width = "1000">
        <v-card-title>
          <span class="text-h5">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            
            <v-row>
                <v-col>
        <v-row>
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
      </v-row>
      <v-row>
                <v-text-field
                  label="Password*"
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
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="login = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="login=true"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-row>
</template>

<script setup>
const props = defineProps({
  login: false, 
})

let login = false


const emit = defineEmits(['change', 'delete'])
// setup code
</script>

