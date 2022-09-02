<template>
  <div v-if="videos.length > 0">
    <div class="columns">
      <div
        v-for="video in videos"
        class="column col-4 col-xs-12"
        :key="video.id"
      >
        <VideoItem
          :id="video.id"
          @remove-video="confirmRemoveVideo"
          @open-video-details="openVideoDetails"
        />
      </div>
    </div>
    <DetailsVideo ref="detailsVideoRef" />
    <!-- Confirm remove video modal -->
    <div class="modal" ref="modalRemoveVideo">
      <div class="modal-container">
        <div class="modal-header">
          <button
            class="btn btn-clear float-right"
            @click="closeRemoveVideoModal"
            :disabled="loading ? 'disabled' : null"
          ></button>
        </div>
        <div class="modal-body">
          <div class="content">
            <h3>¿Seguro que quieres eliminar este video?</h3>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-secondary"
            @click="closeRemoveVideoModal"
            :disabled="loading ? 'disabled' : null"
          >
            Cancelar
          </button>
          <button
            :class="`btn btn-primary ${loading ? 'loading' : ''}`"
            @click="removeVideo"
            :disabled="loading ? 'disabled' : null"
          >
            {{ loading ? "" : "Eliminar" }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <h5 v-else>No se han encontrado videos</h5>
</template>

<script>
import VideosService from "../services/VideosService";
import VideoItemVue from "./VideoItem";
import DetailsVideoVue from "./DetailsVideo";

export default {
  name: "VideosList",
  mounted() {
    // Load videos on component mounted
    this.loadVideos();
  },
  data() {
    return {
      loading: false,
      videos: [],
      removingVideoId: null,
    };
  },
  methods: {
    loadVideos() {
      // Load videos from service
      VideosService.getVideos()
        .then((response) => {
          if (response.success) {
            this.videos = response.data.videos;
          } else {
            // Call the showErrorToast method in parent component (Home)
            this.$emit('show-error-toast', response.error);
          }
        })
        .catch(() => {
          // Call the showErrorToast method in parent component (Home)
          this.$emit('show-error-toast', 'Fail on loading videos.');
        });
    },
    openVideoDetails(videoInfo) {
      // Pass the video information to video details to handle it
      this.$refs.detailsVideoRef.loadVideoInformation(videoInfo);
    },
    confirmRemoveVideo(evt, id) {
      /**
       * Catch event and stop propagation in order to prevent
       * sending the click event to wrapper and open details.
       */
      evt.stopPropagation();

      // Set the removing video ID
      this.removingVideoId = id;

      // Open remove video modal
      this.$refs.modalRemoveVideo.classList.add("active");
    },
    closeRemoveVideoModal() {
      // Close remove video modal
      this.$refs.modalRemoveVideo.classList.remove("active");

      // Clear the removing video ID
      this.removingVideoId = null;
    },
    removeVideo() {
      this.loading = true;
      VideosService.removeVideo(this.removingVideoId)
        .then((response) => {
          if (response.success) {
            // Call the loadVideos method
            this.loadVideos();

            // Call the showSuccessToast method in parent component (Home)
            this.$emit('show-success-toast', 'Video successfully removed.');
          } else {
            // Call the showErrorToast method in parent component (Home)
            this.$emit('show-error-toast', response.error);
          }
        })
        .catch(() => {
          // Call the showErrorToast method in parent component (Home)
          this.$emit('show-error-toast', 'Fail on removing video.');
        })
        .finally(() => {
          // Close remove video modal
          this.closeRemoveVideoModal();
          
          this.loading = false;
        });
    },
  },
  components: {
    VideoItem: VideoItemVue,
    DetailsVideo: DetailsVideoVue,
  },
};
</script>

<style scoped>
.column {
  margin-bottom: 10px;
}

.modal-footer button {
  width: 100px;
}

.modal-footer button:not(:last-child) {
  margin-right: 10px;
}
</style>