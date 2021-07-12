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
      :chart-data="chartData"
    />

    <v-sheet
      class="floating-block rounded-xl elevation-4"
    >
      <v-slider
        v-model="timeIndex"
        @input="debouncedGenerateChartData()"
        :max="spheres[0].militarization.total.length - 1"
        :min="0"
        label="Hours Ago"
        :value="1"
        width="150px"
        color="black"
        track-color="grey"
        thumb-label
        hide-details
      />
    </v-sheet>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import PieChart from '../GraphWrappers/PieChart.vue';
import {ChartData, color, Dataset} from '../../common/VueChartJSData';
import {SphereStatistics} from '@/common/SphereAnalyzation';
import debounce from 'debounce';

@Component({
  components: {
    PieChart,
  },
})
export default class MilitarizationPie extends Vue {
  chartData = new ChartData();
  timeIndex = 0;

  loaded = false;

  @Prop(Array) spheres!: SphereStatistics[];

  debouncedGenerateChartData = () => {/* ... */};

  generateChartData() {
    this.chartData = new ChartData();

    const data = new Dataset();
    data.label = '';
    data.backgroundColor = [];
    data.borderColor = [];

    const allMilitarization = this.spheres.length * 100;
    let totalUsedMilitarization = 0;

    const totalLength = this.spheres[0].militarization.total.length - 1;

    for (const [index, sphere] of this.spheres.entries()) {
      data.data.push(Math.round(sphere.militarization.total[totalLength - this.timeIndex] * 100));
      data.backgroundColor.push(color[index]);
      data.borderColor.push(color[index]);

      totalUsedMilitarization += sphere.militarization.total[totalLength - this.timeIndex] * 100;

      this.chartData.labels.push(sphere.name);
    }

    data.data.push(Math.round(allMilitarization - totalUsedMilitarization));
    data.backgroundColor.push('rgb(89, 89, 89');
    data.borderColor.push('rgb(89, 89, 89');
    this.chartData.labels.push('Not Militarized');

    this.chartData.datasets.push(data);
    this.loaded = true;
  }

  mounted() {
    this.generateChartData();

    this.debouncedGenerateChartData = debounce(this.generateChartData, 50, true);
  }
}
</script>

<style scoped>
  .floating-block {
    position: absolute;
    bottom: 20px;
    left: 20px;

    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;

    width: 300px;
  }
</style>
