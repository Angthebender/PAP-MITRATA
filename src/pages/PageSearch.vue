<template>
  <q-page>
    <div class="row justify-center q-ma-md custom-margin">
      <q-input
        v-model="searchTerm"
        class="col col-sm-10"
        label="Search Username"
        dense
        @keyup.enter="searchForUsernames"
      >
        <template v-slot:append>
          <q-btn
            round
            dense
            flat
            icon="bi-search"
            @click="searchForUsernames"
          />
        </template>
      </q-input>
    </div>
    <div class="search-results">
      <q-card
        v-for="user in searchResults"
        :key="user.id"
        class="q-mb-md small-card"
      >
        <q-card-section>
          <div class="row no-wrap items-center">
            <q-avatar>
              <q-img :src="user.profile_pic" alt="Profile Picture" />
            </q-avatar>
            <div class="q-ml-md">
              <div class="text-bold">{{ user.username }}</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script setup>
import { supabase } from 'boot/supabase';
import { ref, watch } from 'vue';
// Adjust as needed

// Reactive variables for search term and search results
const searchTerm = ref('');
const searchResults = ref([]);

// Function to search for usernames in Supabase
const searchForUsernames = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles') // Change to your custom table
      .select('id, username, avatar_url') // Select ID, username, and profile picture directly from the profiles table
      .ilike('username', `%${searchTerm.value}%`); // Search by username
    if (error) {
      console.error('Error searching usernames:', error);
      return;
    }

    // Store the search results
    searchResults.value = data || [];
  } catch (error) {
    console.error('An error occurred while searching:', error);
  }
};

// Watcher that triggers the search function when `searchTerm` changes
watch(
  () => searchTerm.value,
  (newValue) => {
    if (newValue.trim() !== '') {
      searchForUsernames(); // Trigger the search when there's input
    } else {
      searchResults.value = []; // Clear results if search term is empty
    }
  }
);
</script>

<style>
.search-results {
  margin-top: 20px; /* Margin to separate the search results from other content */
}

.small-card {
  padding: 10px; /* Additional padding for smaller cards */
}

.q-avatar {
  width: 40px; /* Smaller avatar size */
  height: 40px;
}
</style>
