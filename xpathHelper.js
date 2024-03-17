const siteConfigs = require('./siteConfigs');

async function extractVideoData(page, selectedSite) {
  const config = siteConfigs[selectedSite];
  let videoElements;

  try {
    videoElements = await page.$$(config.selectors.videovKey);
    videoElements = await page.$$(config.selectors.videovKey);

    console.log()
    console.log('Number of video elements found:', videoElements.length);
    console.log(`videoElements:`,videoElements)
  } catch (error) {
    console.error('Error querying video elements:', error);
    return [];
  }

  if (!Array.isArray(videoElements) || videoElements.length === 0) {
    console.error('No video elements found or videoElements is not iterable');
    return [];
  }
  let videos = [];

  for (const element of videoElements) {
    try {
      const title = await element.$eval(config.selectors.dataTitle, el => el.getAttribute('data-title'));
      const previewURL = await element.$eval(config.selectors.previewGif, el => el.getAttribute('data-mediabook'));
      const poster = await element.$eval(config.selectors.previewGif, el => el.getAttribute('data-mediumthumb'));
      const videoKey = await element.$eval(config.selectors.videovKey, el => el.getAttribute('data-video-vkey'));
        const videoDuration =  await element.$eval(config.selectors.videoDuration, el => el.textContent);
        const channel = await element.$eval(config.selectors.channel, el => el.textContent);
        

        


      videos.push({
        title: `${title}`,
        videoURL: `${config.baseURL}${videoKey}`,
        embedURL: `${config.embedURL}${videoKey}`,
        previewURL: `${previewURL}`,
        videoDuration:`${videoDuration}`,
        poster: `${poster}`,
        channel:`${channel}`,

      });

    } catch (error) {
      console.error(`Error processing element: ${error}`);
    }
  }

  console.log('Extracted videos:', videos);
  return videos;
}

module.exports = {
  extractVideoData
};
