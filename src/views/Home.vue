<template>
  <div class="main pb-6">
    <div>
      <div class="grey lighten-3 rounded font-weight-bold text-center">
        From {{ new Date(alliancesData.date).toLocaleString() }}
      </div>
      <div v-show="mode == 0 && doneLoading">
        <template v-for="(sphere, idx) in alliancesSorted">
          <div :key="idx * 2">
            <div class="text-h2 mt-5" > {{ sphere.name }} </div>
            <v-divider class="mb-3" />
          </div>
          <div :key="idx * 2 + 1" class="alliance-cards-container">
              <alliance-card
                v-for="(alliance, idx) in sphere.alliances"
                :key="idx"
                :alliance-data="alliance"
                class="alliance-card"
                :class="$vuetify.breakpoint.name"
              />
          </div>
        </template>
      </div>
      <div v-show="mode == 1 && doneLoading">
        <div class="text-h2 mt-5" > Other </div>
        <v-divider class="mb-3" />
        <div class="alliance-cards-container">
            <alliance-card
              v-for="(alliance, idx) in
                otherAlliances.slice((page - 1) * 20, (page * 20))"

              :key="idx"
              :alliance-data="alliance"
              class="alliance-card"
              :class="$vuetify.breakpoint.name"
            />
        </div>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="Math.ceil(otherAlliances.length / 20)"
          ></v-pagination>
        </div>
      </div>
      <div v-show="mode == 2">
        <div class="text-h2 mt-5" > Search Results </div>
        <v-divider class="mb-3" />
        <div class="alliance-cards-container">
            <alliance-card
              v-for="(alliance, idx) in
              filteredAlliances.slice((searchPage -1 ) * 20, (searchPage * 20))"

              :key="idx"
              :alliance-data="alliance"
              class="alliance-card"
              :class="$vuetify.breakpoint.name"
            />
        </div>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="Math.ceil(filteredAlliances.length / 20)"
          ></v-pagination>
        </div>
      </div>
    </div>
    <v-snackbar
      v-model="problemSnackbar"
      multi-line
      :timeout="-1"
    >
      Check has been experiencing problems,
      wait for data to repopulate to get one week of stats.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="problemSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import allianceCard from '@/components/allianceCard.vue';
import {Database, Sphere, Alliance} from '@/common/types';
import Fuse from 'fuse.js';

export default Vue.extend({
  name: 'Viewer',

  props: {
    mode: Number,
    searchString: String,
  },

  components: {
    allianceCard,
  },

  data: () => ({
    alliancesData: {} as Database,
    alliancesSorted: [] as Array<Sphere>,
    otherAlliances: [] as Alliance[],
    filteredAlliances: [] as Alliance[],
    page: 1,
    searchPage: 1,
    doneLoading: false,
    fuse: {} as Fuse<Alliance>,
    problemSnackbar: true,
  }),

  async mounted() {
    this.alliancesData = await (await fetch('/db.json')).json();
    const spheres = await (await fetch('/spheres.json')).json();

    setTimeout(() => this.doneLoading = true, 100);

    const alliancesSorted: Array<Sphere> = [];
    let sphere;
    for (sphere of spheres) {
      alliancesSorted.push({name: sphere.name, alliances: []});
    }

    let alliance;
    for (alliance of this.alliancesData.alliances) {
      let inSpecificSphere = false;

      let sphere;
      for (sphere of spheres) {
        if (sphere.alliances.includes(parseInt(alliance.id))) {
          inSpecificSphere = true;

          let findSortedSphere;
          for (findSortedSphere of alliancesSorted) {
            if (findSortedSphere.name === sphere.name) {
              alliance.sphere = sphere.name;
              findSortedSphere.alliances.push(alliance);
            }
          }
        }
      }

      if (!inSpecificSphere) {
        alliance.sphere = 'Other';
        this.otherAlliances.push(alliance);
      }
    }

    this.alliancesSorted = alliancesSorted;

    this.filteredAlliances = this.alliancesData.alliances;
    this.fuse = new Fuse(this.alliancesData.alliances, {
      keys: ['name', 'id'],
    });
  },

  watch: {
    searchString(value) {
      if (value != '') {
        const results = this.fuse.search(value);
        this.filteredAlliances = [];

        let result;
        for (result of results) {
          this.filteredAlliances.push(result.item);
        }
      }
    },
  },
});
</script>

<style scoped>
  .main {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    width: 97vw;
  }

  .alliance-cards-container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 100%;
  }

  .alliance-card {
    margin-bottom: 10px;
    margin-right: 10px;
  }

  .alliance-card.xs {
    width: 100%;
  }

  .alliance-card.sm {
    width: 40vw;
  }

  .alliance-card.md {
    width: 30vw;
  }

  .alliance-card.lg {
    width: 26vw;
  }

  .alliance-card.xl {
    width: 23vw;
  }

  .max {
    width: 97vw;
  }
</style>
