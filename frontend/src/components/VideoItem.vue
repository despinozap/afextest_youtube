<template>
  <div class="wrapper" :style="style" @click="openVideoDetails">
    <span class="remove-button" @click="removeVideo">X</span>
    <span class="duration">{{ duration }}</span>
  </div>
</template>

<script>
import YoutubeService from "../services/YoutubeService";
export default {
  name: "VideoItem",
  props: {
    id: String,
  },
  data() {
    return {
      imgSrc: null,
      title: null,
      description: null,
      duration: null,
    };
  },
  methods: {
    openVideoDetails() {
      const videoInfo = {
        id: this.id,
        imgSrc: this.imgSrc,
        title: this.title,
        description: this.description,
        duration: this.duration,
      };

      /**
       * Call the openVideoDetails method with information
       * in parent component (VideosList).
       */
      this.$emit("open-video-details", videoInfo);
    },
    removeVideo(evt) {
      // Call the removeVideo method with ID in parent component (VideosList)
      this.$emit("remove-video", evt, this.id);
    },
  },
  mounted() {
    // Load video information from Youtube API
    YoutubeService.getVideoInformation(this.id)
      .then((response) => {
        // If video's information was gotten
        if (response.success) {
          // Load self data from gotten information
          this.imgSrc = response.data.imgSrc;
          this.title = response.data.title;
          this.description = response.data.description;
          this.duration = response.data.duration;
        } else {
          console.log(response.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    style() {
      /**
       * Computed style value in order to load
       * thumbnail as a background image.
       */
      return `
        background-image: url('${this.imgSrc}');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      `;
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 150px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 10px #aaa;
}

.remove-button,
.duration {
  align-self: flex-end;
  height: 24px;
  line-height: 14px;
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
  margin-left: 5px;
  float: left;
  color: white;
  background-color: black;
  border-radius: 2px;
  margin: 5px;
  padding: 5px;
}

.remove-button {
  width: 24px;
}

.duration {
  width: fit-content;
  margin-top: auto;
}
</style>