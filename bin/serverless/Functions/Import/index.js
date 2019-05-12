const { GET } = require('fetchier');
const { YOUTUBE_API_KEY, YOUTUBE_API_ENDPOINT } = require('../../config');

module.exports.handler = async event => {
  
  const body = JSON.parse(event.body);
  
  return getYoutubePlaylist(body && body.playlistId)
    .then(success)
    .catch(fail)
}

function getYoutubePlaylist(playlistId){
  playlistId = playlistId || 'PLI33t8jpgAnc4p3ROWdz4hD_PERAQ4w0F';
  const part = 'snippet,contentDetails';
  const maxResults = 50;
  const url = `${YOUTUBE_API_ENDPOINT}playlistItems?maxResults=${maxResults}&part=${part}&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`;
  console.log(url);
  return GET({ url })
    .then(data => data && data.items.map(youtubeItemModel))
}

function youtubeItemModel(item){
  const { snippet, contentDetails } = item;
  const name = snippet.title.split('- ');
  return {
    name: name.pop(),
    artist: name.join('- '),
    title: snippet.title,
    img: snippet.thumbnails.medium && snippet.thumbnails.medium.url,
    videoId: contentDetails.videoId,
    playlistAddedAt: snippet.publishedAt,
    channelId: snippet.channelId,
    playlistId: snippet.playlistId,
    position: snippet.position,
    videoCreatedAt: contentDetails.videoPublishedAt,
  }
}

function result(statusCode, data){
  return {
    statusCode,
    body: JSON.stringify({
      statusCode,
      message: statusCode !== 200 && data.error || null,
      data: statusCode === 200 && data
    })
  }
}

function success(data){
  return result(200, data);
}

function fail(data){
  return result(500, data);
}