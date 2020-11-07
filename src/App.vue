<template>
  <v-app>
    <v-app-bar
      app
      prominent
      shrink-on-scroll
      fixed
      color="white"
    >
      <v-app-bar-nav-icon @click="drawer = true">
      </v-app-bar-nav-icon>

      <v-toolbar-title v-if="$route.name == 'About'">
        About
      </v-toolbar-title>

      <v-tabs
        class="main-tabs"
        v-if="$vuetify.breakpoint.name !== 'xs' && $route.name != 'About'"
        v-model="tab"
      >
        <v-tab>
          All Blocs
        </v-tab>
        <v-tab>
          Other Alliances
        </v-tab>
         <v-tab v-if="searchString != ''">
          Search Results
        </v-tab>
      </v-tabs>

      <v-select
        v-if="$vuetify.breakpoint.name === 'xs' && $route.name != 'About'"
        v-model="tab"
        item-text="name"
        item-value="id"
        class="mt-auto mb-n3"
        :items="searchString == '' ? noSearchTabsSelect : searchTabsSelect"
      >
      </v-select>

      <v-spacer/>

      <v-slide-x-reverse-transition>
        <v-text-field
          solo
          v-if="showSearch"
          @change="searchString = $event; tab = 2"
          dense
          placeholder="Search"
          class="mt-1 search"
        >
        </v-text-field>
      </v-slide-x-reverse-transition>

      <v-btn
        icon
        @click="showSearch = !showSearch"
      >
        <v-icon>
          mdi-magnify
        </v-icon>
      </v-btn>

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
        temporary
        v-model="drawer"
        fixed
      >
        <v-list
          dense
          rounded
          two-line
        >
         <v-list-item>
            <v-list-item-content>
              <v-list-item-title> Check </v-list-item-title>
              <v-list-item-subtitle> Version 0.9.0 </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="$router.push({ name: 'Home' })">
            <v-list-item-icon>
              <v-icon>
               mdi-view-dashboard
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> Home </v-list-item-title>
              <v-list-item-subtitle>
                View Blocs & Their Stats
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
           <v-list-item @click="$router.push({ name: 'About' })">
            <v-list-item-icon>
              <v-icon>
               mdi-information-outline
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> About </v-list-item-title>
              <v-list-item-subtitle>
                Information
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view
        :mode="tab"
        :searchString="searchString"
      >
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
          factories, 5 hangars, and 3 drydocks. It updates all data every hour.

          <div class="text-h5 mt-5 mb-5 black--text"> Warnings </div>

          Warnings detect any large changes from the start of the graph to the
          latest point and gives you a small alert icon next to the percent.
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
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
    tab: 0,
    showSearch: false,
    searchString: '',

    searchTabsSelect: [{name: 'All Blocs', id: 0},
      {name: 'Other Alliances', id: 1},
      {name: 'Search Results', id: 2}],

    noSearchTabsSelect: [{name: 'All Blocs', id: 0},
      {name: 'Other Alliances', id: 1}],
  }),
});
</script>

<style scoped>
  .exit-button {
    top: 8px;
    right: 8px;
  }

  .main-tabs {
    height: 52px !important;
    margin-top: auto !important;
  }

  .search {
    position: fixed;
    right: 155px;
  }
</style>
