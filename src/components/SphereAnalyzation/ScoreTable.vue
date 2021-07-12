<template>
  <v-card
    outlined
    class="pa-4"
    height="500px"
  >
    <v-row class="align-center">
      <v-col
        cols="12"
        sm="7"
      >
        <segmented-control
          v-model="mode"
          :segments="[
            {title: 'Sphere', id: '0'},
            {title: 'Members', id: '1'},
          ]"
        />
      </v-col>
      <v-col>
        <h3>Ranking Table</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div
          style="height: 400px; overflow: hidden"
        >
          <v-data-table
            :items="(mode == '0') ? spheres : allAlliances"
            :headers="(mode == '0') ? sphereHeaders : allianceHeaders"
            dense
            :items-per-page="10"
            :footer-props="{'disable-items-per-page': true}"
          >
            <template v-slot:item.soldiers="{ value }">
              {{ value.toLocaleString() }}
            </template>
            <template v-slot:item.tanks="{ value }">
              {{ value.toLocaleString() }}
            </template>
            <template v-slot:item.aircraft="{ value }">
              {{ value.toLocaleString() }}
            </template>
            <template v-slot:item.ships="{ value }">
              {{ value.toLocaleString() }}
            </template>
            <template v-slot:item.totalScore="{ value }">
              {{ value.toLocaleString() }}
            </template>
            <template v-slot:item.score="{ value }">
              {{ value.toLocaleString() }}
            </template>
          </v-data-table>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

// eslint-disable-next-line
// @ts-ignore
import segmentedControl from 'vue-ios13-segmented-control';
import {SphereStatistics} from '@/common/SphereAnalyzation';
import {Alliance} from '@/common/types';

@Component({
  components: {
    segmentedControl,
  },
})
export default class ScoreTable extends Vue {
  mode = '0';

  @Prop(Array) spheres!: SphereStatistics[];
  @Prop(Number) timeIndex!: number;

  sphereHeaders = [
    {
      text: 'Name',
      value: 'name',
    },
    {
      text: 'Soldiers',
      value: 'soldiers',
    },
    {
      text: 'Tanks',
      value: 'tanks',
    },
    {
      text: 'Aircraft',
      value: 'aircraft',
    },
    {
      text: 'Ships',
      value: 'ships',
    },
    {
      text: 'Score',
      value: 'totalScore',
    },
  ];

  allianceHeaders = [
    {
      text: 'Name',
      value: 'name',
    },
    {
      text: 'Soldiers',
      value: 'soldiers',
    },
    {
      text: 'Tanks',
      value: 'tanks',
    },
    {
      text: 'Aircraft',
      value: 'planes',
    },
    {
      text: 'Ships',
      value: 'ships',
    },
    {
      text: 'Score',
      value: 'score',
    },
  ];

  allAlliances: Alliance[] = [];

  mounted() {
    for (const sphere of this.spheres) {
      this.allAlliances = this.allAlliances.concat(sphere.includedAlliances);
    }
  }
}
</script>

<style>
  .vue-ios13-segmented-control {
    overflow-x: hidden !important;
  }
</style>
