<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
<<<<<<< Updated upstream
=======
          v-if="$route.fullPath.includes('/chat')"
          @click="goBack"
          class="small-screen-only"
          icon="bi-x-lg"
          size="16px"
          flat
          dense
        />
        <q-btn
          class="large-screen-only q-mr-sm"
          to="/camera"
          icon="bi-patch-plus"
          size="16px"
>>>>>>> Stashed changes
          flat
          dense
          round
<<<<<<< Updated upstream
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>
=======
          dense
          class="large-screen-only q-mr-sm"
        />
        <q-separator vertical spaced class="large-screen-only" />
        <q-toolbar-title
          class="text-madimi text-bold"
          v-if="$route.fullPath.includes('/chat')"
        >
          User
        </q-toolbar-title>
        <q-toolbar-title class="text-madimi text-bold" v-else>
          Mitrata
        </q-toolbar-title>
        <q-btn
          to="/"
          icon="bi-house"
          size="16px"
          flat
          round
          dense
          class="large-screen-only q-mr-sm"
        />

        <q-btn
          class="large-screen-only q-mr-sm"
          to="/users"
          icon="bi-chat"
          size="16px"
          flat
          round
          dense
        />
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white small-screen-only" bordered>
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab to="/" icon="bi-house" />
        <q-route-tab to="/search" icon="bi-search" />
        <q-route-tab to="/camera" icon="bi-patch-plus" />
        <q-route-tab to="/users" icon="bi-chat" />
        <q-route-tab to="/profile" icon="bi-person-circle" />
      </q-tabs>
    </q-footer>
>>>>>>> Stashed changes

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
<<<<<<< Updated upstream
import { ref } from 'vue';
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';

defineOptions({
  name: 'MainLayout'
});
=======
console.log('using mainlayout');

import { useRouter } from 'vue-router';
import { supabase } from 'boot/supabase';
const $router = useRouter();

function goBack() {
  $router.go(-1);
}

getUser();
>>>>>>> Stashed changes

const linksList: EssentialLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
