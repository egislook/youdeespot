import React from 'react'
import { fucss } from 'next-fucss/utils'

export default ({ playlist, onSelectTrack, selectedTrack = {} }) => {
  return (
    <div className={classNamePlaylist(!!selectedTrack)}>
      <h3 className="fs:100pc">{playlist.title} by {playlist.channelTitle}</h3>
      {playlist && playlist.tracks && playlist.tracks.map( track => (
        <div 
          key={track.videoId}
          onClick={e => onSelectTrack(track)} 
          className={classNamePlaylistTrack(selectedTrack && track.videoId == selectedTrack.videoId)}>
            <img src={track.img} className="h:25px m-t:2px" />
            <div className="m-l:10px">
              <h2 className="fs:80pc">{track.name}</h2>
              <p className="c:4B4D51 fs:80pc m-t:3px fw:600">{track.artist}</p>
            </div>
        </div>
      ))}
    </div>
  )
}

const classNamePlaylist = (isSelectedTrack) => fucss({
  'ta:l p-t:70px p-rl:15px p-b:20px w:100vw mxw:704px': true,
  'm-b:100px': isSelectedTrack
})

const classNamePlaylistTrack = (isSelectedTrack) => fucss({
  'dp:flx ai:fs jc:fs ts:bg p:10px br:5px bg:1F2126 m-t:10px bs:1 c:D7D9DC': true,
  'ac-bg:black crs:pt': !isSelectedTrack,
  'bg:black': isSelectedTrack
})