import { POST, fetch } from 'fetchier';

const API_URL = 'https://youdeespot.com/' || 'https://youdeespot-noneede.c9users.io:8081';

export function getPlaylist(playlistId) {
  return POST({ url: API_URL + '/api/import' })
  // if (!sKey) { return null; }
  // return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

export function getTrack(vid) {
  vid = vid || '3r_Z5AYJJd4';
  const audio_streams = {};

  return new Promise((resolve, reject) => {
    const url = 'https://' + vid + '-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https%3A%2F%2Fwww.youtube.com%2Fget_video_info%3Fvideo_id%3D' + vid;
    fetch(url)
      .then(response => {
          if(!response.ok)
            reject(response.statusText)
            
          return response.text();
        })
        .then(text => {
          var data = parse_str(text),
            streams = (data.url_encoded_fmt_stream_map + ',' + data.adaptive_fmts).split(',');
          
          // console.log(data, streams);
    
          streams.forEach((s, n) => {
            var stream = parse_str(s), itag = stream.itag * 1, quality = false;
            // console.log(vid, stream);
            switch (itag) {
              case 139:
                quality = "48kbps";
                break;
              case 140:
                quality = "128kbps";
                break;
              case 141:
                quality = "256kbps";
                break;
            }
            if (quality) audio_streams[quality] = stream.url;
          });
          
          resolve(audio_streams['128kbps']);
        })
  })

  function parse_str(str) {
    return str.split('&').reduce(function(params, param) {
      var paramSplit = param.split('=').map(function(value) {
        return decodeURIComponent(value.replace('+', ' '));
      });
      params[paramSplit[0]] = paramSplit[1];
      return params;
    }, {});
  }
}