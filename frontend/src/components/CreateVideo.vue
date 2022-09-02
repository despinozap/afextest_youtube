<template>
  <div>
    <h2 class="title">Añadir nuevo video</h2>
    <form class="video" action="#" @submit="addVideo">
      <fieldset :disabled="loading">
        <!-- normal input group with button -->
        <div class="input-group">
          <input
            type="text"
            class="form-input"
            placeholder="Añadir (ex: https://www.youtube.com/watch?v=3MWfFOJl3H0)"
            required
            v-model="url"
          />
          <button
            :class="`btn btn-primary input-group-btn ${
              loading ? 'loading' : ''
            }`"
          >
            {{ loading ? "" : "Añadir" }}
          </button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import VideosService from "../services/VideosService";

export default {
  name: "CreateVideo",
  data() {
    return {
      loading: false,
      url: "",
    };
  },
  methods: {
    addVideo(evt) {
      // Prevent form submit
      evt.preventDefault();

      this.loading = true;
      VideosService.storeVideo(this.url)
        .then((response) => {
          if (response.success) {
            // Clear URL
            this.url = "";

            // Reload videos
            this.reloadVideos();
            
            // Call the showSuccessToast method in parent component (Home)
            this.$emit('show-success-toast', 'Video successfully added.');
          } else {
            /*
             * Call the showErrorToast method in parent component (Home)
             * passing the gotten error.
             */
            this.$emit('show-error-toast', response.error);
          }
        })
        .catch(() => {
          // Call the showErrorToast method in parent component (Home)
          this.$emit('show-error-toast', 'Fail on adding video.');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reloadVideos() {
      // Call the reloadVideos method in parent component (Home)
      this.$emit("reload-videos");
    },
  },
};
</script>

<style scoped>
h2.title {
  text-align: left;
}
button {
  width: 100px;
}
</style>