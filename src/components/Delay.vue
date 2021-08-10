<template>
  <div>
    <LineChart
      :key="componentKey"
      :chart-data="chartData"
      ref="line"
      :options="options"
    />
    <b-button @click="resetZoom">Reset</b-button>
  </div>
</template>

<script>
import LineChart from "./LineChart.js";
import { map } from "lodash";

export default {
  components: {
    LineChart,
  },
  props: {
    points: {
      type: Array,
      required: true,
    },
  },
  computed: {
    dataSets() {
      return map(this.points, (point) => {
        return {
          x: point.time / 1000,
          y: point.delay,
        };
      });
    },
    chartData() {
      return {
        datasets: [
          {
            label: "Delay",
            data: this.dataSets,
            pointRadius: 0,
          },
        ],
      };
    },
  },
  methods: {
    resetZoom() {
      this.componentKey += 1;
    },
  },
  data() {
    return {
      componentKey: 0,
      options: {
        animation: {
          duration: 0,
        },
        plugins: {
          zoom: {
            zoom: { enabled: true, mode: "x", drag: true },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "linear",
              scaleLabel: {
                display: true,
                labelString: "Time",
              },
            },
          ],
          yAxes: [
            {
              type: "linear",
              scaleLabel: {
                display: true,
                labelString: "ms",
              },
            },
          ],
        },
      },
    };
  },
};
</script>
