<template>
  <!-- Details modal -->
  <div class="modal" ref="modal">
    <div class="modal-container">
      <div class="modal-header">
        <button class="btn btn-clear float-right" @click="closeModal"></button>
      </div>
      <div class="modal-body">
        <div class="content">
          <div class="columns">
            <div class="column col-4 col-sm-12">
              <div class="cover" :style="style">
                <span class="play" @click="openYoutubeVideoLink"></span>
              </div>
            </div>
            <div class="column col-8 col-sm-12">
              <div class="info">
                <h3 class="title">{{ title }}</h3>
                <p class="description">
                  {{ description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsVideo",
  data() {
    return {
      id: null,
      imgSrc: null,
      title: null,
      description: null,
    };
  },
  methods: {
    loadVideoInformation(videoInfo) {
      if (
        videoInfo.id &&
        videoInfo.title &&
        videoInfo.description &&
        videoInfo.imgSrc
      ) {
        this.id = videoInfo.id;
        this.imgSrc = videoInfo.imgSrc;
        this.title = videoInfo.title;
        this.description = videoInfo.description;

        // Open video details modal
        this.$refs.modal.classList.add("active");
      } else {
        console.log("Given video information is invalid");
      }
    },
    openYoutubeVideoLink() {
      // Create new anchor element
      const aElement = document.createElement("a");
      // Set link
      aElement.href = `https://www.youtube.com/watch?v=${this.id}`;
      // Set target to open in new tab
      aElement.target = "_blank";
      // Simulates a click event to open link
      aElement.click();
    },
    closeModal(evt) {
      evt.preventDefault();

      // Close video details modal
      this.$refs.modal.classList.remove("active");
    },
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
.columns {
  align-items: center;
  justify-content: center;
}

.columns .column:not(:last-child) {
  margin-bottom: 20px;
}

.cover {
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover .play {
  background-color: red;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover .play::after {
  content: "▶";
  font-size: 20px;
  line-height: 20px;
}

.info {
  word-break: break-word;
}
</style>