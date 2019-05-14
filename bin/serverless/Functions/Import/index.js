const { GET, GQL } = require('fetchier');
const { YOUTUBE_API_KEY, YOUTUBE_API_ENDPOINT, HASURA_ENDPOINT } = require('../../config');
const queries = require('../queries');


module.exports.handler = async event => {
  
  const body = JSON.parse(event.body);
  const playlistId = body && body.playlistId || 'PLI33t8jpgAnc4p3ROWdz4hD_PERAQ4w0F';
  
  try {
    
    let tracks = await getYoutubePlaylist(playlistId);
    await storeData('track', tracks, 'videoId');
    
    const playlist = await getYoutubePlaylistData(playlistId);
    const videoIds = tracks.map( ({ videoId }) => videoId );
    const storedPlaylist = await storeData('playlist', { ...playlist, videoIds }, 'playlistId');
    
    return success({ ...playlist, ...storedPlaylist, tracks });
  } catch (error){
    return fail(error);
  }
}


function getYoutubePlaylistData(playlistId){
  const part = 'snippet,contentDetails';
  const url = `${YOUTUBE_API_ENDPOINT}playlists?id=${playlistId}&part=${part}&key=${YOUTUBE_API_KEY}`;
  
  return GET({ url })
    .then( ({ items: [ item ] }) => youtubePlaylistModel(item))
}

function storeData(table, values, key){
  const query = Array.isArray(values) 
    ? queries.upsertMultiple(table, { columns: Object.keys(values[0]), key }) 
    : queries.upsert(table, { columns: Object.keys(values), key });
    
  const variables = { values };
  console.log({ query, variables });
  return GQL({ url: HASURA_ENDPOINT, query, variables })
    .then( data => (data['insert_' + table].returning.shift() || {}) )
}

async function getYoutubePlaylist(playlistId, pageToken, tracks = []){
  playlistId = playlistId || '';
  
  const pageTokenQuery = pageToken ? `&pageToken=${pageToken}` : '';
  
  const part = 'snippet,contentDetails';
  const maxResults = 50;
  const url = `${YOUTUBE_API_ENDPOINT}playlistItems?maxResults=${maxResults}&part=${part}&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}${pageTokenQuery}`;
  console.log(url);
  return GET({ url })
    .then(data => {
      const pageToken = data.nextPageToken;
      tracks = tracks.concat(data && data.items.map(item => youtubeTrackModel(item)) || []);
      if(!pageToken){
        // tracks = tracks
        //   .sort((a, b) => a.position > b.position)
        //   .reduce((arr, item) => {
        //     delete item.position;
        //     return arr.concat([item]);
        //   }, []);
        return tracks;
      }
      return getYoutubePlaylist(playlistId, pageToken, tracks);
    })
}

function youtubePlaylistModel(item){
  const { snippet: { publishedAt, channelId, title, description, thumbnails, channelTitle, position }, contentDetails: { itemCount } } = item || {};
  return {
    playlistId: item.id,
    publishedAt,
    channelId,
    title,
    description,
    img: thumbnails.medium && thumbnails.medium.url,
    channelTitle,
    itemCount
  }
}

function youtubeTrackModel(item){
  const { snippet, contentDetails } = item;
  const name = snippet.title.split('- ');
  return {
    name: name.pop(),
    artist: name.join('- '),
    title: snippet.title,
    // position: snippet.position,
    img: snippet && snippet.thumbnails && snippet.thumbnails.medium && snippet.thumbnails.medium.url,
    videoId: contentDetails.videoId,
    videoCreatedAt: contentDetails.videoPublishedAt,
  }
}

function result(statusCode, data){
  console.log(data);
  return {
    statusCode,
    body: JSON.stringify({
      statusCode,
      message: statusCode !== 200 && data.message || data.error && data.error.message || String(data) || null,
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