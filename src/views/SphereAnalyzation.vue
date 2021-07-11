<template>
  <div class="main">
    <v-container>
      <v-row>
        <v-col>
          <militarization-pie :spheres="spheres" :timeIndex="1" v-if="loaded"></militarization-pie>
        </v-col>
        <v-col>
          <score-table :spheres="spheres" :timeIndex="1" v-if="loaded" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <militarization-over-time :spheres="spheres" v-if="loaded"></militarization-over-time>
        </v-col>
        <v-col>
          <city-tier-graph :spheres="spheres" v-if="loaded"></city-tier-graph>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import {Component, Vue} from 'vue-property-decorator';
import {MilitarizationMap, SphereStatistics} from '../common/SphereAnalyzation';

import MilitarizationPie from '../components/SphereAnalyzation/MilitarizationPie.vue';
import ScoreTable from '../components/SphereAnalyzation/ScoreTable.vue';
import MilitarizationOverTime from '@/components/SphereAnalyzation/MilitarizationOverTime.vue';
import CityTierGraph from '@/components/SphereAnalyzation/CityTiers.vue';

@Component({
  components: {
    MilitarizationPie,
    ScoreTable,
    MilitarizationOverTime,
    CityTierGraph,
  },
})
export default class SphereAnalyzationGraphs extends Vue {
  spheres: SphereStatistics[] = [];

  loaded = false;

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
      stats.ships =
      stats.totalScore = 0;

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

      for (const allianceID of sphere.alliances) {
        const alliance = this.db.alliances.find((el) => el.id == allianceID.toString());
        if (!alliance) continue;

        stats.includedAlliances.push(alliance);

        for (const key of Object.keys(militarizationToBeAveraged)) {
          const otherKey = (key == 'aircraft') ? 'planes' : key;

          militarizationToBeAveraged[key].push(alliance.allDataPoints[otherKey]);
        }

        stats.soldiers += alliance.soldiers;
        stats.tanks += alliance.tanks;
        stats.aircraft += alliance.planes;
        stats.ships += alliance.ships;
        stats.totalScore += alliance.score;
      }

      for (const key of Object.keys(stats.militarization)) {
        for (let i = 0; i < militarizationToBeAveraged[key][0].length; i++) {
          let elementAverageAtIndex = 0;

          for (const arr of militarizationToBeAveraged[key]) {
            elementAverageAtIndex += (arr[i] || 0);
          }

          stats.militarization[key].push(elementAverageAtIndex / sphere.alliances.length);
        }
      }

      this.spheres.push(stats as SphereStatistics);
    }
  }

  async mounted() {
    const allAlliances: number[] = [];
    for (const sphere of store.spheres) {
      allAlliances.push(...sphere.alliances);
    }

    if (!store.cachedNations.length) {
      const nations = await (await fetch(`https://untitled-fv6p52y7540t.runkit.sh/nations?allianceID=[${allAlliances.join(',')}]`)).json();
      store.cachedNations.push(...nations.data);

      if (nations.paginatorInfo) {
        for (let i = 1; i < nations.paginatorInfo.lastPage + 1; i++) {
          const nations = await (await fetch(`https://untitled-fv6p52y7540t.runkit.sh/nations?allianceID=[${allAlliances.join(',')}]&page=${i}`)).json();
          store.cachedNations.push(...nations.data);
        }
      }
    }

    this.generateSphereData();

    this.loaded = true;
  }
}
</script>
