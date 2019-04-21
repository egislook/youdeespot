const { GET } = require('fetchier');
const { YOUTUBE_API_KEY, YOUTUBE_API_ENDPOINT } = require('../../config');
const ytdl = require('ytdl-core');

module.exports.handler = async event => {
  
  const body = event.body && JSON.parse(event.body) || { videoId: 'KeBR6h2UsLI' };
  
  if(!body || !body.videoId)
    return fail({ error: 'body is missing videoId'})
  
  return getVideoInfo(body.videoId)
    .then(success)
    .catch(fail)
  
  // return success({ data, body });
  
  // return getYoutubePlaylist()
  //   .then(success)
  //   .catch(fail)
}

function getVideoInfo(videoId){
  return new Promise((resolve, reject) => 
    ytdl.getInfo('https://www.youtube.com/watch?v=' + videoId, (err, info) => 
      err ? reject(err) : resolve(info)
    )
  )
}

function result(statusCode, data){
  return {
    statusCode,
    body: JSON.stringify({
      statusCode,
      message: statusCode !== 200 && data.error || data.message || null,
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