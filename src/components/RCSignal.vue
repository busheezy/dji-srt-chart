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
    rcSignalData() {
      return map(this.points, (point) => {
        return {
          x: point.time / 1000,
          y: point.rcSignal,
        };
      });
    },
    signalData() {
      return map(this.points, (point) => {
        return {
          x: point.time / 1000,
          y: point.signal,
        };
      });
    },
    chData() {
      return map(this.points, (point) => {
        return {
          x: point.time / 1000,
          y: point.ch,
        };
      });
    },
    chartData() {
      return {
        datasets: [
          {
            label: "RC Signal",
            data: this.rcSignalData,
            pointRadius: 0,
          },
          {
            label: "Channel",
            data: this.signalData,
            pointRadius: 0,
            hidden: true,
          },
          {
            label: "RC Signal",
            data: this.chData,
            pointRadius: 0,
            hidden: true,
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
                labelString: "Delay",
              },
            },
          ],
        },
      },
    };
  },
};
</script>
