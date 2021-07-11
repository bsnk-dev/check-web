<template>
  <v-card class="pa-4" outlined height="500px">
    <h2 class="text-center">
      Spheres Total Militarization
    </h2>
    <line-chart :data="chartData" v-if="loaded" />
  </v-card>
</template>

<script lang="ts">
import {SphereStatistics} from '@/common/SphereAnalyzation';
import {ChartData, color, Dataset} from '@/common/VueChartJSData';
import {Component, Vue, Prop} from 'vue-property-decorator';
import LineChart from '@/components/GraphWrappers/LineChart.vue';

@Component({
  components: {
    LineChart,
  },
})
export default class MilitarizationOverTime extends Vue {
  @Prop(Array) spheres!: SphereStatistics[];

  chartData = new ChartData();
  loaded = false;

  generateChartData() {
    for (const [key, sphere] of this.spheres.entries()) {
      const data = new Dataset();

      data.data = sphere.militarization.total;
      data.backgroundColor = color[key];
      data.borderColor = color[key];
      data.fill = false;
      data.label = sphere.name;
      this.chartData.datasets.push(data);
    }

    for (let i = 0; i < this.spheres[0].militarization.total.length; i++) {
      if (i < 24) {
        this.chartData.labels.push(`${i * 1} Hours Ago`);
      } else if (i < 168) {
        this.chartData.labels.push(`${(i / 24).toFixed(1)} Days Ago`);
      } else {
        this.chartData.labels.push('One week ago');
      }
    }

    this.chartData.labels.reverse();

    this.loaded = true;
  }

  mounted() {
    this.generateChartData();
  }
}
</script>
