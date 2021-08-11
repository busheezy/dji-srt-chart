<template>
  <div>
    <LineChart
      :key="componentKey"
      :chart-data="dataSets"
      ref="line"
      :options="options"
    />

    <b-button @click="resetZoom">Reset</b-button>
  </div>
</template>

<script>
import LineChart from "./LineChart.js";
import { map } from "lodash";
import randomColor from "randomcolor";

export default {
  components: {
    LineChart,
  },
  props: {
    pointsCollection: {
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
      return {
        datasets: map(this.pointsCollection, ({ points, fileName }) => {
          return {
            label: fileName,
            data: map(points, (point) => {
              return {
                x: point.time / 1000,
                y: point[this.statObj.name],
              };
            }),
            pointRadius: 0,
            backgroundColor: randomColor({
              luminosity: "dark",
              format: "rgba",
              alpha: 0.2,
            }),
            borderWidth: 0,
          };
        }),
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
