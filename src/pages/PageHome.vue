<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <q-card
          v-for="post in posts"
          :key="post.id"
          class="card-post q-mb-md"
          flat
          bordered
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Norden_sherpa</q-item-label>
              <q-item-label caption> {{ post.location }} </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-img :src="post.imageUrl" />
          <q-card-section>
            <div>{{ post.caption }}</div>
            <div class="text-caption text-grey">{{ niceDate(post.date) }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="48px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <a href="/profile"
              ><q-item-label v-if="username"> {{ username }}</q-item-label></a
            >
            <q-item-label caption> Norden sherpa </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
    <q-btn @click="seeCurrentUser" label="see the user" />
  </q-page>
</template>

<script setup>
import { date } from 'quasar';
import { supabase } from 'boot/supabase';
import { ref } from 'vue';

const username = ref('');
const posts = [
  {
    id: 1,
    caption: 'Golden Gate Bridge',
    date: 1712695011621,
    location: 'San Francisco, United Statees',
    imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg',
  },
  {
    id: 2,
    caption: 'Golden Gate Bridge',
    date: 1712695011621,
    location: 'San Francisco, United Statees',
    imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg',
  },
  // ... other posts
];

const niceDate = (value) => {
  return date.formatDate(value, 'MMMM D h:mmA');
};

const seeCurrentUser = () => {
  const account = ref(null); // Use ref(null) for potentially empty data

  supabase.auth
    .getSession()
    .then((session) => {
      account.value = session;

      if (account.value && account.value.user && account.value.user.username) {
        username.value = account.value.user.username; // Assuming username is a ref
        console.log('the username is ', username.value);
      } else {
        console.log('No user logged in or username not available');

        // Handle the case where no user is logged in or username is missing
      }
    })
    .catch((error) => {
      console.error('Error:', error); // Handle other potential errors
    });
};

seeCurrentUser();
</script>

<style>
.card-post .q-img {
  min-height: 200px;
}
</style>
