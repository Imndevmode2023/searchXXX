module.exports = {
    pornhub: {
      baseURL: 'https://www.pornhub.com/view_video.php?viewkey=',
      embedURL: 'https://www.pornhub.com/embed/',
      searchURL: 'https://www.pornhub.com/video/search?search=',
      joiner: '+',
      selectors: { dataTitle : '#videoSearchResult .img',
           imageTag: '#videoSearchResult .img img',
           videovKey: '#videoSearchResult li[id]',
           previewGif: '#videoSearchResult .img img',
           videoDuration: '#videoSearchResult var[class="duration"]',
           channel: '#videoSearchResult  .usernameWrap a' 
  
    },
  },
  //xhamster: {
  //  baseURL: '',
   // embedURL: 'https://xhamster.com/embed/',
   //searchURL: 'https://xhamster.com/search/',
   // joiner: '+',
   // selectors: { dataTitle : '#videoSearchResult .img',
       //  imageTag: '#videoSearchResult .img img',
      // https://www.pornhub.com/ videovKey: '#videoSearchResult li[id]',
       //  previewGif: '#videoSearchResult .img img',
       //  videoDuration: '#videoSearchResult var[class="duration"]',
      //   channel: '#videoSearchResult  .usernameWrap a' ,
      //  }
      //}
  // Add more sites here
  };