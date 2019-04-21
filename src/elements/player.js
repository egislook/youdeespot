import React from 'react'
import { fucss } from 'next-fucss/utils'

export default ({ track }) => (
  <div className="ps:fx b,r:0 w:100pc bg:grey100 bs:2 of:hd">
    <audio id="youtube" autoPlay controls loop src={track.src} />
    <h3 className="fs:70pc w:100pc ws:np p:3px-10px bg:white bd-t:1px-sld-grey200">
      <img src={track.img} className="h:10px m-r:5px m-b:2px" />
      {track.title}
    </h3>
  </div>
)