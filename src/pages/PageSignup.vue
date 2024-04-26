<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign up</div>
            <div class="text-grey-8">
              Sign up below if you want to create an account
            </div>
          </q-card-section>
          <q-card-section>
            <q-input
              dense
              outlined
              v-model="email"
              label="Email Address"
              type="email"
            ></q-input>
            <q-input
              dense
              outlined
              class="q-mt-md"
              v-model="username"
              type="username"
              label="username"
            ></q-input>

            <q-input
              dense
              outlined
              class="q-mt-md"
              v-model="password"
              type="password"
              label="Password"
            ></q-input>
            <q-input
              dense
              outlined
              class="q-mt-md"
              v-model="dob"
              type="date"
              label="Date of birth"
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              style="border-radius: 8px"
              color="dark"
              rounded
              size="md"
              label="Create account"
              no-caps
              class="full-width"
              @click="handleSubmit()"
            ></q-btn>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">
              Do you already have an account?
              <a
                href="/login"
                class="text-dark text-weight-bold"
                style="text-decoration: none"
                >sign in.</a
              >
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { supabase } from 'boot/supabase';
import { ref } from 'vue';

const email = ref('');
const username = ref('');
const password = ref('');
const dob = ref(null); // use ref(null) for dates

const handleSubmit = async () => {
  console.log('submitting..');

  supabase.auth
    .signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          username: username.value,
          dob: dob.value, // Use dob.value for date
        },
      },
    })

    .then(({ data, error }) => {
      if (error) {
        console.error(error); // Log the actual error object
      } else {
        console.log(data);
      }
    })
    .catch((error) => {
      console.error('Error:', error); // Handle other potential errors here
    });
};
</script>

<style>
.q-footer {
  display: none;
}
</style>
