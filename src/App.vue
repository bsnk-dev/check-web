<template>
  <v-app>
    <v-app-bar
      app
      prominent
      fixed
      color="white"
    >
      <v-app-bar-nav-icon @click="drawer = true">
      </v-app-bar-nav-icon>

      <v-toolbar-title>
        {{ $router.history.current.path === '/' ? 'All Blocs' : 'About' }}
      </v-toolbar-title>

      <v-spacer/>

      <v-btn
        icon
        @click="feedbackDialog = true"
      >
        <v-icon>
          mdi-heart
        </v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
          >
            <v-icon>
              mdi-dots-vertical
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item class="pr-16" @click="helpDialog = true">
            <v-list-item-title> Help </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
        absolute
        temporary
        v-model="drawer"
      >
        <v-list
          dense
          rounded
        >
          <v-list-item @click="$router.push({ name: 'Home' })">
            <v-list-item-content>
              <v-list-item-title> Home </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
           <v-list-item @click="$router.push({ name: 'About' })">
            <v-list-item-content>
              <v-list-item-title> About </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view>
      </router-view>
    </v-main>

    <v-overlay :value="helpDialog">
      <v-card light width="40vw" min-width="320px">
        <v-card-title> Help </v-card-title>
        <v-btn
          icon
          @click="helpDialog = false"
          absolute
          class="exit-button"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <v-card-text>
          <div class="text-h5 mb-5 black--text"> What is this? </div>
          This is a tool that allows you to see the total militarization of an
          alliance out of 100% maximum militatiztion, typically 5 barracks, 5
          factories, 5 hangars, and 3 drydocks.
          The militarization per member is the amount of militarization
          divided by the number of members. This gives context to the
          total militarization, as you might have 100% militarization but only
          5 members.
          It updates all data every four hours.

          <div class="text-h5 mt-5 mb-5 black--text"> Warnings </div>

          Warnings detect any large changes from the start of the graph to the
          latest point and gives you a small alert icon next to the percent.
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            class="mt-2 mb-4 mr-4"
            depressed
            color="primary"
            @click="helpDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>

    <v-overlay :value="feedbackDialog">
      <feedback @close="feedbackDialog = false" />
    </v-overlay>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Feedback from '@/components/feedback.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Feedback,
  },

  data: () => ({
    helpDialog: false,
    feedbackDialog: false,
    drawer: false,
  }),
});
</script>

<style scoped>
  .exit-button {
    top: 16px;
    right: 16px;
  }
</style>
