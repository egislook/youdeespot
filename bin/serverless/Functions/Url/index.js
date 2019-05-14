const { GET, GQL, fetch } = require('fetchier');
const { YOUTUBE_API_KEY, YOUTUBE_API_ENDPOINT, HASURA_ENDPOINT } = require('../../config');
const queries = require('../queries');
const ytdl = require('ytdl-core');

module.exports.handler = async event => {
  
  const body = event.body && JSON.parse(event.body) || { videoId: 'KeBR6h2UsLI' };
  
  if(!body || !body.videoId)
    return fail({ error: 'body is missing videoId'})
  
  return getVideoInfo(body)
    .then(success)
    .catch(fail)
  
  // return success({ data, body });
  
  // return getYoutubePlaylist()
  //   .then(success)
  //   .catch(fail)
}

async function getVideoInfo(track){
  let { videoId, altVideoId, title } = track;
  
  if(!altVideoId && title){
    altVideoId = await getVideoAlts(title).then(({ items: [item] }) => item.id && item.id.videoId);
    storeTrackAlt({ ...track, altVideoId });
  }
  
  return new Promise((resolve, reject) => 
    ytdl.getInfo('https://www.youtube.com/watch?v=' + (altVideoId || videoId), (err, info) => {
      if(err)
        return reject(err);
        
      resolve(info)
    })
  )
}

function storeTrackAlt(values){
  const query = queries.upsert('track', { columns: Object.keys(values), key: 'videoId' });
  const variables = { values };
  return GQL({ url: HASURA_ENDPOINT, query, variables })
}

function getVideoAlts(title){
  const url = YOUTUBE_API_ENDPOINT + 'search?maxResults=2&part=snippet&q=' + encodeURIComponent(title) + '&type=video&videoSyndicated=true&key=' + YOUTUBE_API_KEY;
  console.log({ url });
  return GET({ url });
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