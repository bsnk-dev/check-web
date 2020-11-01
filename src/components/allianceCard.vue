<template>
  <v-card>
    <v-card-title class="text-md-subtitle-1 text-lg-h5 font-weight-bold">
      <v-img
        max-width="60px"
        class="mr-3 rounded"
        :src="allianceData.flag"
      >
      </v-img>
      {{ allianceData.name }}
      <v-icon class="ml-5" color="red" v-if="allianceData.isPotentialHazard">
          mdi-alert-circle
      </v-icon>
    </v-card-title>
    <v-card-text>
      <line-chart :data="chartData"/>
      <v-divider class="mb-3 mt-3" />
      <div class="d-flex">
        <div>
          <div class="text-subtitle-1"> Overall </div>
         <div>
            Soldiers:
            <span class="font-weight-bold">
              {{ (allianceData.soldiersPercent * 100).toFixed(2) }}%
            </span>
            <v-icon
              v-if="allianceData.alerts['soldiers']"
              color="red"
              small
            >
              mdi-alert
            </v-icon>
          </div>
          <div>
            Tanks:
            <span class="font-weight-bold">
              {{ (allianceData.tanksPercent * 100).toFixed(2) }}%
            </span>
            <v-icon
              v-if="allianceData.alerts['tanks']"
              color="red"
              small
            >
              mdi-alert
            </v-icon>
          </div>
          <div>
            Aircraft:
            <span class="font-weight-bold">
              {{ (allianceData.planesPercent * 100).toFixed(2) }}%
            </span>
            <v-icon
              v-if="allianceData.alerts['planes']"
              color="red"
              small
            >
              mdi-alert
            </v-icon>
          </div>
          <div>
            Ships:
            <span class="font-weight-bold">
              {{ (allianceData.shipsPercent * 100).toFixed(2) }}%
            </span>
            <v-icon
              v-if="allianceData.alerts['ships']"
              color="red"
              small
            >
              mdi-alert
            </v-icon>
          </div>
        </div>
        <div class="ml-auto">
          <div class="text-subtitle-1"> Per Member </div>
          <div>
            Soldiers:
            <span class="font-weight-bold">
              {{ (allianceData.soldiersPercentPM * 100).toFixed(2) }}%
            </span>
          </div>
          <div>
            Tanks:
            <span class="font-weight-bold">
              {{ (allianceData.tanksPercentPM * 100).toFixed(2) }}%
            </span>
          </div>
          <div>
            Aircraft:
            <span class="font-weight-bold">
              {{ (allianceData.planesPercentPM * 100).toFixed(2) }}%
            </span>
          </div>
          <div>
            Ships:
            <span class="font-weight-bold">
              {{ (allianceData.shipsPercentPM * 100).toFixed(2) }}%
            </span>
          </div>
          <div>
            {{ allianceData.totalMembers }} Total Members
          </div>
        </div>
      </div>
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
        fill: false,
        pointHitRadius: 5,
        pointRadius: 0,
      } as Dataset;
    },

    createChartData() {
      const chartData: ChartData = {
        labels: [],
        datasets: [],
      };

      for (let i = 1;
        i < this.allianceData.allDataPoints.total.length + 1;
        i++) {
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
      let dataSet = this.createDataSet();
      dataSet.label = 'Total Militarization';
      dataSet.data = this.allianceData.allDataPoints.total;
      chartData.datasets.push(dataSet);

      // Soldier Militarization
      dataSet = this.createDataSet();
      dataSet.label = 'Soldier Militarization';
      dataSet.data = this.allianceData.allDataPoints.soldiers;
      dataSet.borderColor = this.colors[1];
      chartData.datasets.push(dataSet);

      // Tank Militarization
      dataSet = this.createDataSet();
      dataSet.label = 'Tank Militarization';
      dataSet.data = this.allianceData.allDataPoints.tanks;
      dataSet.borderColor = this.colors[2];
      chartData.datasets.push(dataSet);

      // Aircraft Militarization
      dataSet = this.createDataSet();
      dataSet.label = 'Aircraft Militarization';
      dataSet.data = this.allianceData.allDataPoints.planes;
      dataSet.borderColor = this.colors[3];
      chartData.datasets.push(dataSet);

      // Naval Militarization
      dataSet = this.createDataSet();
      dataSet.label = 'Naval Militarization';
      dataSet.data = this.allianceData.allDataPoints.ships;
      dataSet.borderColor = this.colors[4];
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
