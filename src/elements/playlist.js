import React from 'react'
import { fucss } from 'next-fucss/utils'

export default ({ playlist, onSelectTrack, selectedTrack = {} }) => (
  <div className={classNamePlaylist(!!selectedTrack)}>
    {playlist.map(track => (
      <div 
        key={track.position} 
        onClick={e => onSelectTrack(track)} 
        className={classNamePlaylistTrack(selectedTrack && track.position === selectedTrack.position)}>
          <img src={track.img} className="h:40px" />
          <h2 className="m-l:10px fs:90pc">{track.title}</h2>
      </div>
    ))}
  </div>
)

const classNamePlaylist = (isSelectedTrack) => fucss({
  'bg:black300 c:white ta:l p-t:45px': true,
  'm-b:100px': isSelectedTrack
})

const classNamePlaylistTrack = (isSelectedTrack) => fucss({
  'p:10px bd-b:1px-sld-black dp:flx ai:fs jc:fs ts:bg': true,
  'ac-bg:black crs:pt': !isSelectedTrack,
  'bg:black': isSelectedTrack
})