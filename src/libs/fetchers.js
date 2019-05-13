import { POST, GQL } from 'fetchier';
const HASURA_URL = 'https://youdeespot.com/v1alpha1/graphql';

const API_URL = false ? 'https://youdeespot.com' : 'https://pwa-noneede.c9users.io:8081';

const queries = {
  tracks: `query($videoIds: [String]) { track(where: { videoId: { _in: $videoIds } }) { id title name artist img videoId } }`,
  playlists: `query { playlist (order_by: {createdAt: desc}, limit: 50) { id title playlistId title description img channelTitle itemCount videoIds } }`
}

export function fetchPlaylists() {
  return GQL({ url: HASURA_URL, query: queries.playlists })
    .then(data => data.playlist)
}

export function importPlaylist(playlistId){
  return POST({ url: API_URL + '/api/import', body: { playlistId } })
    .then(console.log)
}

export function fetchTrack(videoId) {
  
  return POST({ url: API_URL + '/api/url', body: { videoId } })
    .then(res => res.data)
    .then(data => {
      console.log(data);
      const format = data.formats.find( f => f.itag === '140')
      console.log(format.url, data); 
      return format.url;
    });
}