<template>
  <div>
    <b-field class="file">
      <b-upload @input="sendUp" accept=".srt" v-model="file" expanded>
        <a class="button is-primary is-fullwidth">
          <b-icon icon="upload"></b-icon>
          <span>{{ file ? file.name : "Click to upload" }}</span>
        </a>
      </b-upload>
    </b-field>

    <b-field>
      <b-upload @input="sendUp" v-model="file" drag-drop expanded>
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large"></b-icon>
            </p>
            <p>Drop your file here or click to upload</p>
          </div>
        </section>
      </b-upload>
    </b-field>
  </div>
</template>

<script>
export default {
  methods: {
    sendUp(file) {
      this.$emit("file", file);
    },
  },
  data() {
    return {
      file: null,
    };
  },
};
</script>
