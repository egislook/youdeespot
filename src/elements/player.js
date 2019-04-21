import React from 'react'
import { fucss } from 'next-fucss/utils'

export default ({ track, onTogglePlay, onChangeTrack, isPlaying }) => (
  <div className="ps:fx b,r:0 w:calc(100pc-30px) bg:prim bs:2 of:hd dp:flx p:10px m:15px br:5px bs:2">
    <div onClick={onTogglePlay} className="h,w,mnw,lh:45px bg-sz:cv bg-ps:c m-rl:0" style={{backgroundImage: `url(${track.img})`}}>
      {!isPlaying && <i className="fu-triangle-right lh:1 fs:150pc" />}
    </div>
    <div className="fs:70pc ta:l m-l:10px">
      <h3>{track.name}</h3>
      <p className="m-t:5px">{track.artist}</p>
    </div>
    <div className="m-r:0">
      <i className="fu-fast-forward p:7px br:50pc bd:1px-sld-white bg:blacka2 m-t:7px bs:2" onClick={onChangeTrack} />
    </div>
    <audio className="dp:n" id="youtube" autoPlay controls loop src={track.src} />
  </div>
)