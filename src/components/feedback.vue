<template>
  <v-card light width="40vw" min-width="320px">
    <v-card-title> Feedback </v-card-title>
    <v-btn
      icon
      @click="$emit('close')"
      absolute
      class="exit-button"
    >
      <v-icon>
        mdi-close
      </v-icon>
    </v-btn>
    <v-card-text>
      <v-text-field
        outlined
        v-model="feedbackID"
        placeholder="Optional"
        label="Your Name or Identifier"
      ></v-text-field>
      <v-textarea
        outlined
        v-model="feedbackText"
        label="Request changes, report bugs, or anything else"
      ></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        class="mt-2"
        depressed
        color="primary"
        @click="send(); $emit('close')"
      >
        Send
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'feedback',

  data: () => {
    return {
      feedbackID: '',
      feedbackText: '',
    };
  },

  methods: {
    send() {
      fetch(`https://us-central1-bsnk-dev.cloudfunctions.net/feedback?id=${encodeURI(this.feedbackID)}&text=${encodeURI(this.feedbackText)}`);
    },
  },
});
</script>

<style scoped>
  .exit-button {
    top: 8px;
    right: 8px;
  }
</style>
