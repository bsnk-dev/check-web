<script>
import {Pie} from 'vue-chartjs';

export default {
  name: 'pie-chart',
  extends: Pie,

  props: {
    data: Object,
    hideTicks: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    data: {
      handler(value) {
        this.renderWrapper(value);
      },

      deep: true,
    },
  },

  methods: {
    renderWrapper(value) {
      this.renderChart(value || this.data, {
        legend: {
          display: true,
          labels: {
            fontSize: 11,
            boxWidth: 20,
            padding: 5,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      });
    },
  },

  mounted() {
    this.renderWrapper();
  },
};
</script>
