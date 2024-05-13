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

          <q-img :src="getImageUrl(post.image_url)" />
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
              ><q-item-label
                ><p v-if="Username">{{ Username }}</p>
              </q-item-label></a
            >
            <q-item-label caption> norden </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { date } from 'quasar';
import { useRouter } from 'vue-router';
import { supabase } from 'boot/supabase';
import { ref } from 'vue';
const $router = useRouter();
const Username = ref('');
const account = ref('');

const posts = ref();

const niceDate = (value) => {
  return date.formatDate(value, 'MMMM D h:mmA');
};
getSession();
async function getSession() {
  account.value = await supabase.auth.getSession();
  if (account.value.data.sesion === null) {
    console.error('Error getting session:', error);
    console.log('no user');
    $router.push('/login');
  }
  Username.value = account.value.data.session.user.user_metadata.username;
}

///fetching posts

async function fetchPosts() {
  const { data, error } = await supabase
    .from('posts') // Your Supabase table name
    .select('*'); // Adjust selection as needed

  if (error) {
    console.error('Error fetching posts:', error);
  } else {
    posts.value = data; // Store fetched data
  }
}

function getImageUrl(filename) {
  const { publicURL, error } = supabase.storage
    .from('posts') // Your bucket name
    .getPublicUrl(filename);
  if (error) {
    console.error('Error getting public URL:', error);
  }
  console.log(filename);
  return publicURL;
}

fetchPosts();
</script>

<style>
.card-post .q-img {
  min-height: 200px;
}
</style>
