<template>
  <v-app>
    <v-app-bar
      app
      prominent
      color="white"
    >
      <v-app-bar-nav-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>All Blocs</v-toolbar-title>

      <v-spacer/>

      <v-btn
        icon
      >
        <v-icon>
          mdi-heart
        </v-icon>
      </v-btn>
      <v-btn
        icon
      >
        <v-icon>
          mdi-dots-vertical
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view>
      </router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>
