<template>
  <div id="app">
    <div class="container">
      <section class="section has-text-centered">
        <h1 class="title">DJI SRT Chart</h1>
        <div class="notification mt-4">
          <div v-if="!file">
            <h2 class="subtitle">Upload the srt file</h2>
            <FileInput @file="onInput" />
          </div>

          <div v-else>
            <h2 class="subtitle">
              {{ file.name }}
              <b-button @click="file = null" size="is-small" class="is-warning">
                Upload New
              </b-button>
            </h2>

            <b-select v-model="currentStat">
              <option v-for="stat in stats" :key="stat.name" :value="stat.name">
                {{ stat.label }}
              </option>
            </b-select>

            <Stat
              :points="points"
              :key="currentStatObj.name"
              :statObj="currentStatObj"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import FileInput from "./components/FileInput.vue";
import Stat from "./components/Stat.vue";

import { map, each, find } from "lodash";
import { parseSync } from "subtitle";

export default {
  name: "App",
  metaInfo: {
    title: "DJI SRT Chart",
  },
  components: {
    FileInput,
    Stat,
  },
  computed: {
    currentStatObj() {
      return find(this.stats, { name: this.currentStat });
    },
  },
  data() {
    return {
      file: null,
      currentStat: "delay",
      points: [],
      stats: [
        {
          name: "delay",
          label: "Delay",
          unit: "ms",
        },
        {
          name: "bitrate",
          label: "Bitrate",
          unit: "Mbps",
        },
        {
          name: "glsBat",
          label: "Goggles Battery",
          unit: "%",
        },
        {
          name: "rcSignal",
          label: "RC Signal",
          unit: "Signal",
        },
        {
          name: "uavBat",
          label: "Drone Battery",
          unit: "Voltage",
        },
      ],
    };
  },
  methods: {
    async onInput(file) {
      this.file = file;

      const fileText = await file.text();
      const subtitles = parseSync(fileText);

      const points = map(subtitles, (subtitle) => {
        const stats = subtitle.data.text.split(" ");
        const statsObj = {};

        each(stats, (stat) => {
          const [statName, statValue] = stat.split(":");
          const realStatValue = statValue
            .replace("V", "")
            .replace("ms", "")
            .replace("Mbps", "")
            .replace("%", "");
          statsObj[statName] = Number(realStatValue);
        });

        return {
          ...statsObj,
          time: subtitle.data.start,
        };
      });

      this.points = points;
    },
  },
};
</script>
