<script>
import {Line} from 'vue-chartjs';

export default {
  name: 'line-chart',
  extends: Line,

  props: {
    data: Object,
  },

  watch: {
    data: {
      handler(value) {
        this.renderChart(value);
      },
    },
  },
};
</script>
