<script>
import {Pie, mixins} from 'vue-chartjs';
const {reactiveProp} = mixins;

export default {
  name: 'pie-chart',
  extends: Pie,
  mixins: [reactiveProp],

  props: {
    chartData: Object,
    hideTicks: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    data: {
      handler(value) {
        this.$data._chart.update(value);
      },

      deep: true,
    },
  },

  methods: {
    renderWrapper(value) {
      this.renderChart(value || this.chartData, {
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
    this.renderWrapper(this.chartData);
  },
};
</script>
