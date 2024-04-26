<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="constrain">
        <q-btn
          class="large-screen-only q-mr-sm"
          to="/camera"
          icon="bi-patch-plus"
          size="16px"
          flat
          round
          dense
        />
        <q-btn
          to="/search"
          icon="bi-search"
          size="16px"
          flat
          round
          dense
          class="large-screen-only q-mr-sm"
        />
        <q-separator vertical spaced class="large-screen-only" />
        <q-toolbar-title class="text-madimi text-bold">
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
          to="/chat"
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
        <q-route-tab to="/chat" icon="bi-chat" />
        <q-route-tab to="/profile" icon="bi-person-circle" />
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
console.log('using mainlayout');
import { useRouter } from 'vue-router';
import { supabase } from 'boot/supabase';
const $router = useRouter();

getUser();
async function getUser() {
  const user = await supabase.auth.getSession();

  if (!user || !user.data.session) {
    // You're not authenticated. Do stuff here like redirect to login
    console.log('no user');
    $router.push('/login');
    return;
  }
}
</script>

<style lang="scss">
.q-toolbar__title {
  font-size: 30px;
  @media (max-width: $breakpoint-xs-max) {
    text-align: center;
  }
}

.q-footer {
  .q-tab__icon {
    font-size: 30px;
  }
}
.q-toolbar {
  @media (min-width: $breakpoint-sm-min) {
    height: 70px;
  }
}
</style>
