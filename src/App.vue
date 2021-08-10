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
            <h2 class="subtitle">{{ file.name }}</h2>

            <b-select v-model="currentStat">
              <option value="delay">Delay</option>
              <option value="uavBat">Quad Battery</option>
              <option value="glsBat">Goggles Battery</option>
              <option value="bitrate">Bitrate</option>
              <option value="rcSignal">RC Signal</option>
            </b-select>

            <Delay v-if="currentStat === 'delay'" :points="points" />
            <Bitrate v-if="currentStat === 'bitrate'" :points="points" />
            <GlsBat v-if="currentStat === 'glsBat'" :points="points" />
            <UAVBat v-if="currentStat === 'uavBat'" :points="points" />
            <RCSignal v-if="currentStat === 'rcSignal'" :points="points" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import FileInput from "./components/FileInput.vue";
import Delay from "./components/Delay.vue";
import Bitrate from "./components/Bitrate.vue";
import GlsBat from "./components/GlsBat.vue";
import RCSignal from "./components/RCSignal.vue";
import UAVBat from "./components/UAVBat.vue";

import { map, each } from "lodash";
import { parseSync } from "subtitle";

export default {
  name: "App",
  metaInfo: {
    title: "DJI SRT Chart",
  },
  components: {
    FileInput,
    Delay,
    Bitrate,
    GlsBat,
    RCSignal,
    UAVBat,
  },
  data() {
    return {
      file: null,
      currentStat: "delay",
      points: [],
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
