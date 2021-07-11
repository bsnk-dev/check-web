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
        this.renderWrapper(value);
      },

      deep: true,
    },
  },

  methods: {
    renderWrapper(value) {
      this.renderChart(value || this.data, {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 1,
              // format tick number
              callback: function(value) {
                return value.toLocaleString();
              },
            },
          }],
          xAxes: [{
            gridLines: {
              display: false,
            },
          }],
        },
        legend: {
          display: true,
          labels: {
            fontSize: 11,
            boxWidth: 20,
            padding: 5,
          },
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              let label = data.datasets[tooltipItem.datasetIndex].label || '';

              if (label) {
                label += ': ';
              }

              return label + tooltipItem.yLabel.toLocaleString();
            },
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
