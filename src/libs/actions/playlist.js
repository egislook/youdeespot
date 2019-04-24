import { POST, fetch } from 'fetchier';

const API_URL = true ? 'https://youdeespot.com' : 'https://youdeespot-noneede.c9users.io:8081';

export function getPlaylist(playlistId) {
  return POST({ url: API_URL + '/api/import', body: { playlistId } })
  // if (!sKey) { return null; }
  // return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

export function getTrack(videoId) {
  
  return POST({ url: API_URL + '/api/url', body: { videoId } })
    .then(res => res.data)
    .then(data => {
      console.log(data);
      const format = data.formats.find( f => f.itag === '140')
      console.log(format.url, data); 
      return format.url;
    });
}