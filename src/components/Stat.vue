<template>
  <div>
    <LineChart
      :key="componentKey"
      :chart-data="chartData"
      ref="line"
      :options="options"
    />
    <b-button @click="resetZoom">Reset Zoom</b-button>
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
    statObj: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dataSets() {
      return map(this.points, (point) => {
        return {
          x: point.time / 1000,
          y: point[this.statObj.name],
        };
      });
    },
    chartData() {
      return {
        datasets: [
          {
            label: this.statObj.label,
            data: this.dataSets,
            pointRadius: 0,
            backgroundColor: "rgba(205, 0, 255, 0.2)",
            borderColor: "rgba(205, 0, 255, 0.2)",
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
                labelString: this.statObj.unit,
              },
            },
          ],
        },
      },
    };
  },
};
</script>
