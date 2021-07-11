<template>
  <div class="main">

  </div>
</template>

<script lang="ts">
import store from '@/store';
import {Component, Vue} from 'vue-property-decorator';
import {MilitarizationMap, SphereStatistics} from '../common/SphereAnalyzation';

@Component
export default class SphereAnalyzationGraphs extends Vue {
  spheres: SphereStatistics[] = [];

  get sphereProfiles() {
    return store.spheres;
  }

  get db() {
    return store.alliancesData;
  }

  generateSphereData() {
    for (const sphere of this.sphereProfiles) {
      const stats: Partial<SphereStatistics> = {};

      stats.name = sphere.name;
      stats.includedAlliances = [];

      stats.soldiers =
      stats.tanks =
      stats.aircraft =
      stats.ships = 0;

      stats.militarization = {
        total: [],
        soldiers: [],
        tanks: [],
        aircraft: [],
        ships: [],
      };

      const militarizationToBeAveraged: MilitarizationMap = {
        total: [],
        soldiers: [],
        tanks: [],
        aircraft: [],
        ships: [],
      };

      for (const alliance of this.db.alliances) {
        stats.includedAlliances.push(alliance);

        for (const [key] of Object.keys(militarizationToBeAveraged)) {
          const otherKey = (key == 'aircraft') ? 'planes' : key;

          militarizationToBeAveraged[key].push(alliance.allDataPoints[otherKey]);
        }

        stats.soldiers += alliance.soldiers;
        stats.tanks += alliance.tanks;
        stats.aircraft += alliance.planes;
        stats.ships += alliance.ships;
      }

      for (const [key] of Object.keys(stats.militarization)) {
        for (let i = 0; i < militarizationToBeAveraged[key][0].length; i++) {
          let elementAverageAtIndex = 0;

          for (const arr of militarizationToBeAveraged[key]) {
            elementAverageAtIndex += (arr[i] || 0);
          }

          stats.militarization[key].push(elementAverageAtIndex / militarizationToBeAveraged[key][0].length);
        }
      }

      this.spheres.push(stats as SphereStatistics);
    }
  }

  mounted() {
    this.generateSphereData();
  }
}
</script>
