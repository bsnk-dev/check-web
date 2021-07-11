<template>
  <v-card
    outlined
    class="pa-4"
    height="500px"
  >
    <h2
      class="text-center mb-4"
    >
      Sphere Shares of Total Militarization
    </h2>
    <pie-chart
      v-if="loaded"
      :data="chartData"
    />
  </v-card>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import PieChart from '../GraphWrappers/PieChart.vue';
import {ChartData, color, Dataset} from '../../common/VueChartJSData';
import {SphereStatistics} from '@/common/SphereAnalyzation';

@Component({
  components: {
    PieChart,
  },
})
export default class MilitarizationPie extends Vue {
  chartData = new ChartData();

  loaded = false;

  @Prop(Array) spheres!: SphereStatistics[];
  @Prop(Number) timeIndex!: number;

  generateChartData() {
    const data = new Dataset();
    data.label = '';
    data.backgroundColor = [];

    const allMilitarization = this.spheres.length * 100;
    let totalUsedMilitarization = 0;

    for (const [index, sphere] of this.spheres.entries()) {
      data.data.push(Math.round(sphere.militarization.total[this.timeIndex] * 100));
      data.backgroundColor.push(color[index]);

      totalUsedMilitarization += sphere.militarization.total[this.timeIndex] * 100;

      this.chartData.labels.push(sphere.name);
    }

    data.data.push(Math.round(allMilitarization - totalUsedMilitarization));
    data.backgroundColor.push('rgb(89, 89, 89');
    this.chartData.labels.push('Not Militarized');

    this.chartData.datasets.push(data);
    this.loaded = true;
  }

  mounted() {
    this.generateChartData();
  }
}
</script>
