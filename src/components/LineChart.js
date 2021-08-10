import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
import zoomPlugin from "chartjs-plugin-zoom";

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    this.addPlugin(zoomPlugin);
    this.renderChart(this.chartData, this.options);
  },
};
