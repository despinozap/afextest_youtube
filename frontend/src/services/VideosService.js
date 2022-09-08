const ENDPOINT =
  "https://7lavw682q2.execute-api.us-east-1.amazonaws.com/Test/videos";

// const YoutubeService = require('./YoutubeService');
import YoutubeService from "../services/YoutubeService";

const VideosService = {
  // Remove a video from AWS
  removeVideo(id) {
    return fetch(ENDPOINT, {
      method: "DELETE",
      body: JSON.stringify({
        id: id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.statusCode === 200) {
          return {
            success: true
          };
        } else {
          // Parse JSON content
          const parsedJson = JSON.parse(response.body);

          // Return error from the retrieved JSON content
          return {
            success: false,
            error: parsedJson.error.message
          };
        }
      })
      .catch((error) => {
        console.log(error);
        // Return error
        return {
          success: false,
          error: "Fail on removing video."
        };
      });
  },
  // Store a new video in AWS
  async storeVideo(url) {
    // const id = '_f71BHguJqYOO';

    const reg = /(http)(s)?(:\/\/(www.youtube.com\/watch\?v=|youtu.be\/)?([A-z0-9]+))/;
    const id = url.match(reg)[5];

    const validVideo = await YoutubeService.getVideoInformation(id);
    console.log(validVideo);

    if(validVideo.success)
    {
      return fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify({
          url: url
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((response) => response.json())
        .then((response) => {
          // Parse JSON content
          const parsedJson = JSON.parse(response.body);
          if (response.statusCode === 201) {
            // Return data from the retrieved JSON content
            return {
              success: true,
              data: parsedJson.data
            };
          } else {
            // Return error from the retrieved JSON content
            return {
              success: false,
              error: parsedJson.error.message
            };
          }
        })
        .catch((error) => {
          console.log(error);
          // Return error
          return {
            success: false,
            error: "Fail on storing video."
          };
        });
    }
    else
    {
      return validVideo;
    }
  },
  // Get all videos from AWS
  getVideos() {
    return fetch(ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((response) => {
        // Parse JSON content
        const parsedJson = JSON.parse(response.body);

        // Get videos from the retrieved JSON content
        const videos = parsedJson.data.videos;

        // Sort videos by created DESC.
        videos.sort((video1, video2) => {
          return video2.created - video1.created;
        });

        return {
          success: true,
          data: {
            videos: videos
          }
        };
      })
      .catch(() => {
        // Return error
        return {
          success: false,
          error: "Fail on getting videos."
        };
      });
  }
};

export default VideosService;
