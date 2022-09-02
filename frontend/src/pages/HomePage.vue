<template>
  <main class="container grid-lg">
    <div :class="`toast ${toast.type ? 'toast-' + toast.type : ''}`" v-if="this.toast.type !== null">
      <button class="btn btn-clear float-right" @click="clearToast"></button>
      {{ toast.message }}
    </div>
    <CreateVideo 
      @reload-videos="reloadVideos" 
      @show-success-toast="showSuccessToast" 
      @show-error-toast="showErrorToast"
    />
    
    <VideosList 
      ref="videosListRef"
      @show-success-toast="showSuccessToast" 
      @show-error-toast="showErrorToast"
    />
  </main>
</template>

<script>
import CreateVideoVue from "../components/CreateVideo";
import VideosListVue from "../components/VideosList";

export default {
  name: "HomePage",
  data() {
    return {
      toast: {
        type: null,
        message: null
      }
    }
  },
  components: {
    CreateVideo: CreateVideoVue,
    VideosList: VideosListVue,
  },
  methods: {
    reloadVideos() {
      /**
       * Call the loadVideos method in VideosList component
       * from parent component (this).
       */
      this.$refs.videosListRef.loadVideos();
    },
    showSuccessToast(msg) {
      this.toast.type = 'success';
      this.toast.message = msg;
    },
    showErrorToast(msg) {
      this.toast.type = 'error';
      this.toast.message = msg;
    },
    clearToast() {
      this.toast.type = null;
      this.toast.message = null;
    }
  },
};
</script>

<style>
</style>