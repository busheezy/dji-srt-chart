<template>
  <div>
    <b-field class="file">
      <b-upload
        multiple
        @input="sendUp"
        accept=".srt"
        v-model="files"
        native
        expanded
      >
        <a class="button is-primary is-fullwidth">
          <b-icon icon="upload"></b-icon>
          <span>Click to upload</span>
        </a>
      </b-upload>
    </b-field>

    <b-field>
      <b-upload
        multiple
        @input="sendUp"
        accept=".srt"
        v-model="files"
        drag-drop
        expanded
        native
      >
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large"></b-icon>
            </p>
            <p>Drop your files here or click to upload</p>
          </div>
        </section>
      </b-upload>
    </b-field>
  </div>
</template>

<script>
export default {
  methods: {
    sendUp(files) {
      this.$emit("input", files);
    },
  },
  data() {
    return {
      files: [],
    };
  },
};
</script>
