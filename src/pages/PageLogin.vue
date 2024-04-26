<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
            <div class="text-grey-8">Sign in below to access your account</div>
          </q-card-section>
          <q-card-section>
            <p v-show="LoginError" class="text-red-6">Incorrect Credentials</p>
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
              v-model="password"
              type="password"
              label="Password"
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              style="border-radius: 8px"
              color="dark"
              rounded
              size="md"
              label="Sign in"
              type="submit"
              no-caps
              @click="handleSubmit()"
              class="full-width"
            />
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">
              Don't have an account yet?
              <a
                href="/signup"
                class="text-dark text-weight-bold"
                style="text-decoration: none"
                >Sign up.</a
              >
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { supabase } from 'boot/supabase';
import { ref } from 'vue';

const router = useRouter();

const email = ref('');
const password = ref('');
const LoginError = ref(false);
const error = ref('');

const handleSubmit = async () => {
  error.value = '';
  supabase.auth
    .signInWithPassword({
      email: email.value,
      password: password.value,
    })
    .then(({ data, error }) => {
      if (error && error.message === 'Invalid login credentials') {
        console.log('invalid credentials');
        LoginError.value = true;
      } else {
        // Login successful
        LoginError.value = false;
        console.log('valid credentials');
        console.log('Logged in user:', data);
        router.push('/');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle other potential errors here
    });
};
</script>
<style>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
.q-footer {
  display: none;
}
</style>
