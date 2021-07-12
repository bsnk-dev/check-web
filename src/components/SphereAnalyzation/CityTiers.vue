<template>
  <v-card height="500px" outlined class="pa-4">
    <h2 class="text-center">Nations in Each City Tier</h2>
    <bar-chart :data="chartData" v-if="loaded"></bar-chart>
  </v-card>
</template>

<script lang="ts">
import {SphereStatistics} from '@/common/SphereAnalyzation';
import {ChartData, color, Dataset} from '@/common/VueChartJSData';
import store from '@/store';
import {Component, Vue, Prop} from 'vue-property-decorator';
import BarChart from '@/components/GraphWrappers/BarChart.vue';

@Component({
  components: {
    BarChart,
  },
})
export default class CityTierGraph extends Vue {
  chartData = new ChartData();
  loaded = false;

  @Prop(Array) spheres!: SphereStatistics[];

  getNationsByAllianceID(allianceID: string) {
    const nations = [];

    for (const nation of store.cachedNations) {
      if (nation.alliance_id == allianceID) nations.push(nation);
    }

    return nations;
  }

  updateMaxCities(maxCities: number, valueToCheck: number) {
    return (valueToCheck > maxCities) ? valueToCheck : maxCities;
  }

  generateChartData() {
    const cityTierIncrement = 6;
    let maxCities = 0;

    for (const nation of store.cachedNations) maxCities = this.updateMaxCities(maxCities, nation.num_cities);

    for (let i = 0; i < (maxCities / cityTierIncrement); i++) this.chartData.labels.push(`${(i * 6) + 1}-${(i + 1) * 6} Cities`);

    for (const [index, sphere] of this.spheres.entries()) {
      const data = new Dataset();
      data.backgroundColor = color[index];
      data.borderColor = color[index];
      data.label = sphere.name;

      const tiers = [];
      for (let i = 0; i < (maxCities / cityTierIncrement); i++) tiers.push(0);

      for (const alliance of sphere.includedAlliances) {
        const allianceNations = this.getNationsByAllianceID(alliance.id.toString());

        for (let i = 0; i < (maxCities / cityTierIncrement); i++) {
          let citiesInTier = 0;

          for (const nation of allianceNations) {
            if (
              nation.num_cities > (i * cityTierIncrement) &&
              nation.num_cities < ((i + 1) * cityTierIncrement) &&
              nation.alliance_position != 'APPLICANT'
            ) {
              citiesInTier++;
            }
          }

          tiers[i] += citiesInTier;
        }
      }

      data.data = tiers;

      this.chartData.datasets.push(data);
    }
  }

  mounted() {
    this.generateChartData();
    this.loaded = true;
  }
}
</script>
