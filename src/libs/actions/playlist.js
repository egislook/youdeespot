import { POST, fetch } from 'fetchier';

export function getPlaylist(playlistId) {
  return POST({ url: 'https://pwa-noneede.c9users.io:8081/import' })
  // if (!sKey) { return null; }
  // return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

export function getTrack(vid){
  var vid = vid || '3r_Z5AYJJd4',audio_streams = {};
    // audio_tag = document.getElementById('youtube');

  return new Promise((resolve, reject) => 
    fetch('https://' + vid + '-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https%3A%2F%2Fwww.youtube.com%2Fget_video_info%3Fvideo_id%3D' + vid)
      .then(response => {
        if (response.ok) {
            response.text().then(data => {
    
                var data = parse_str(data),
                    streams = (data.url_encoded_fmt_stream_map + ',' + data.adaptive_fmts).split(',');
    
                streams.forEach(function(s, n) {
                    var stream = parse_str(s),
                        itag = stream.itag * 1,
                        quality = false;
                    console.log(stream);
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
    
                // console.log(audio_streams);
                
                resolve(audio_streams['128kbps']);
                // audio_tag.src = audio_streams['128kbps'];
                // audio_tag.play();
            })
        }
    })
  )
  
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