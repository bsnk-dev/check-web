<template>
  <v-card>
    <v-card-title>
      {{ allianceData.name }}
    </v-card-title>
    <v-card-text>
      <line-chart :data="chartData" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import LineChart from './LineChart.vue';
import {Dataset, ChartData} from '@/common/types';

export default Vue.extend({
  name: 'alliance-card',

  props: {
    allianceData: Object,
  },

  components: {
    LineChart,
  },

  data() {
    return {
      chartData: {},

      colors: [
        'rgb(0, 123, 255)',
        'rgb(0, 125, 12)',
        'rgb(219, 0, 0)',
        'rgb(219, 106, 0)',
        'rgb(0, 0, 0)',
      ],
    };
  },

  methods: {
    createDataSet() {
      return {
        label: '',
        data: [],
        borderColor: this.colors[0],
      } as Dataset;
    },

    createChartData() {
      const chartData: ChartData = {
        labels: [],
        datasets: [],
      };

      for (let i = 1; i < this.allianceData.allDataPoints.total.length; i++) {
        if (i < 7) {
          chartData.labels.push(`${i * 4} Hours Ago`);
        } else if (i < 42) {
          chartData.labels.push(`${((i * 4) / 24).toFixed(1)} Days Ago`);
        } else {
          chartData.labels.push('One week ago');
        }
      }

      chartData.labels.reverse();

      // Total Militarization
      const dataSet = this.createDataSet();
      dataSet.label = 'Total Militarization';
      dataSet.filled = false;
      dataSet.data = this.allianceData.allDataPoints.total;
      chartData.datasets.push(dataSet);

      this.chartData = chartData;
    },
  },

  watch: {
    allianceData() {
      this.createChartData();
    },
  },

  mounted() {
    this.createChartData();
  },
});
</script>
