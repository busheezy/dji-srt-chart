<template>
  <div id="app">
    <div class="container">
      <section class="section has-text-centered">
        <h1 class="title">DJI SRT Chart</h1>
        <div class="notification mt-4">
          <div v-if="!file">
            <FileInput @file="onInput" />
          </div>

          <div v-else>
            <div class="columns">
              <div class="column">
                <b-field
                  class="file is-primary is-fullwidth"
                  :class="{ 'has-name': !!file }"
                >
                  <b-upload v-model="file" @input="onInput" class="file-label">
                    <span class="file-cta">
                      <b-icon class="file-icon" icon="upload"></b-icon>
                      <span class="file-label">Click to upload</span>
                    </span>
                    <span class="file-name" v-if="file">
                      {{ file.name }}
                    </span>
                  </b-upload>
                </b-field>
              </div>

              <div class="column">
                <b-select v-model="currentStat" expanded>
                  <option
                    v-for="stat in stats"
                    :key="stat.name"
                    :value="stat.name"
                  >
                    {{ stat.label }}
                  </option>
                </b-select>
              </div>
            </div>

            <Stat
              :points="points"
              :key="currentStatObj.name"
              :statObj="currentStatObj"
            />
          </div>
        </div>
        <div v-if="!file">
          <a :href="`${publicPath}DJIG0004.srt`">Download Sample</a>
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
      publicPath: process.env.BASE_URL,
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
