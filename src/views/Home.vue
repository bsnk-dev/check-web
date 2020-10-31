<template>
  <div class="main">
    <div>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import allianceCard from '@/components/allianceCard.vue';
import {Database, Sphere} from '@/common/types';

export default Vue.extend({
  name: 'Viewer',

  components: {
    allianceCard,
  },

  data: () => ({
    alliancesData: {} as Database,
    alliancesSorted: [] as Array<Sphere>,
  }),

  async mounted() {
    this.alliancesData = await (await fetch('/db.json')).json();
    const spheres = await (await fetch('/spheres.json')).json();

    const alliancesSorted: Array<Sphere> = [];
    let sphere;
    for (sphere of spheres) {
      alliancesSorted.push({name: sphere.name, alliances: []});
    }
    alliancesSorted.push({name: 'Other', alliances: []});

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
              findSortedSphere.alliances.push(alliance);
            }
          }
        }
      }

      if (!inSpecificSphere) {
        alliancesSorted[alliancesSorted.length - 1].alliances.push(alliance);
      }
    }

    this.alliancesSorted = alliancesSorted;
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

  .alliance-card-lg {
    width: 23vw;
  }

  .alliance-card-xl {
    width: 23vw;
  }
</style>
