const YoutubeService = {
  getVideoInformation(id) {
    // Load Youtube API key from .env file
    const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY;
    
    const endpoint = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${API_KEY}&part=snippet,contentDetails`;

    return fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        // If video information was found
        if (response.pageInfo.totalResults === 1) {
          return {
            success: true,
            data: {
              imgSrc: response.items[0].snippet.thumbnails.high.url,
              title: response.items[0].snippet.title,
              description: response.items[0].snippet.description,
              duration: this.getDuration(
                response.items[0].contentDetails.duration
              )
            }
          };
        } else {
          return {
            success: false,
            error: "Video not found in Youtube."
          };
        }
      })
      .catch(() => {
        return {
          success: false,
          error: "Fail on loading video information from Youtube."
        };
      });
  },
  // Transform Youtube duration to time string
  getDuration(durationString = "") {
    if (durationString.toUpperCase() === "P0D") {
      // It's a live video
      return "LIVE";
    } else {
      // Try statement for catching parse exceptions
      try {
        // Define regular expressions
        const reH = /[0-9]{1,2}H/g;
        const reM = /[0-9]{1,2}M/g;
        const reS = /[0-9]{1,2}S/g;

        // Match regular expressions
        const matchH = durationString.replace("PT", "").match(reH);
        const matchM = durationString.replace("PT", "").match(reM);
        const matchS = durationString.replace("PT", "").match(reS);

        // Construct the duration object
        const duration = {
          hours: matchH ? parseInt(matchH[0].replace("H", ""), 10) : 0,
          minutes: matchM ? parseInt(matchM[0].replace("M", ""), 10) : 0,
          seconds: matchS ? parseInt(matchS[0].replace("S", ""), 10) : 0
        };

        return `${
          duration.hours > 0
            ? (duration.hours > 9 ? duration.hours : "0" + duration.hours) + ":"
            : ""
        }${duration.minutes > 9 ? duration.minutes : "0" + duration.minutes}:${
          duration.seconds > 9 ? duration.seconds : "0" + duration.seconds
        }`;
      } catch (ex) {
        return "--:--:--";
      }
    }
  }
};

export default YoutubeService;
