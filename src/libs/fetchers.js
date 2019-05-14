import { POST, GQL } from 'fetchier';
const HASURA_URL = 'https://youdeespot.com/v1alpha1/graphql';

const API_URL = true ? 'https://youdeespot.com' : 'https://pwa-noneede.c9users.io:8081';

const queries = {
  tracks: `query($videoIds: [String]) { track(where: { videoId: { _in: $videoIds } }) { id title name artist img videoId altVideoId } }`,
  playlists: `query { playlist (order_by: {createdAt: desc}, limit: 50) { id title playlistId title description img channelTitle itemCount } }`,
  playlist: (playlistId) => `query { playlist(where: { playlistId: { _eq: "${playlistId}"}}) { id title playlistId title description img channelTitle itemCount videoIds } }`
}

export function fetchPlaylists() {
  return GQL({ url: HASURA_URL, query: queries.playlists })
    .then(data => data.playlist)
}

export function importPlaylist(playlistId){
  return POST({ url: API_URL + '/api/import', body: { playlistId } })
}

export function fetchTrack(body) {
  
  return POST({ url: API_URL + '/api/url', body })
    .then(res => res.data)
    .then(data => {
      console.log(data);
      const format = data && data.formats && data.formats.find( f => f.itag === '140') || {};
      return format.url;
    });
}

export async function fetchPlaylist(playlistId){
  
  const playlist = await GQL({ url: HASURA_URL, query: queries.playlist(playlistId)})
    .then(({ playlist: [playlist] }) => playlist);
    
  const { videoIds } = playlist;
  
  return GQL({ url: HASURA_URL, query: queries.tracks, variables: { videoIds }  })
    .then(data => {
      const tracks = videoIds.map( videoId => data.track.find(track => track.videoId === videoId) )
      return ({ ...playlist, tracks })
    })
}