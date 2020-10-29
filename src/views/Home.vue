<template>
  <div class="main">
    <div class="alliance-cards-container">
      <alliance-card
        v-for="(alliance, idx) in alliancesData.alliances"
        :key="idx"
        :alliance-data="alliance"
        class="alliance-card"
        :class="$vuetify.breakpoint.name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import allianceCard from '@/components/allianceCard.vue';
import {Database} from '@/common/types';

export default Vue.extend({
  name: 'Viewer',

  components: {
    allianceCard,
  },

  data: () => ({
    alliancesData: {} as Database,
  }),

  async mounted() {
    this.alliancesData = await (await fetch('/db.json')).json();
  },
});
</script>

<style scoped>
  .main {
    margin-top: 20px;
    margin-left: 50px;
    margin-right: 50px;
    width: 100%;
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
