import React from 'react'
import { fucss } from 'next-fucss/utils'

export default ({ track = {}, elem, src, handleTogglePlay, handleChangeTrack, isPlaying, duration, currentTime, handleChangeTime }) => {
  console.log({ src });
  const percentage = (currentTime / duration) * 100;
  const durationMinsAndSecs = getMinsAndSecs(duration);
  const currentMinsAndSecs = getMinsAndSecs(currentTime);
  
  return (
    <div className="ps:fx b,r:0 m:0-15px m-b:10px w:100pc dp:flx">
      <div className="mxw:calc(704px-5px) w:100pc p-l:25px">
        <div className="bg:prim800 p:3px l:0 w:100pc m-b:5px br:3px" onClick={ e => onChangeTime(e, handleChangeTime, duration)}>
          <div className="bg:prim h:3px m-l:0" style={{ width: percentage + '%' }} />
        </div>
        <div className="bg:prim bs:2 of:hd dp:flx p:10px br:5px bs:2 w:100pc">
          <div className="m-rl:0">
            <div onClick={handleTogglePlay} className="h,w,mnw,lh:45px bg-sz:cv bg-ps:c" style={{backgroundImage: `url(${track.img})`}}>
              {!isPlaying && <i className="fu-triangle-right lh:1 fs:150pc" />}
            </div>
            <p className="fs:40pc m-t:2px">{durationMinsAndSecs.minutes}:{durationMinsAndSecs.seconds} / {currentMinsAndSecs.minutes}:{currentMinsAndSecs.seconds}</p>
          </div>
          <div className="fs:70pc ta:l m-l:10px">
            <h3>{track.name}</h3>
            <p className="m-t:5px">{track.artist}</p>
          </div>
          <div className="m-r:0">
            <i className="fu-fast-forward p:7px br:50pc bd:1px-sld-white bg:blacka2 m-t:7px bs:2" onClick={handleChangeTrack} />
          </div>
          <audio ref={elem} className="dp:n" id="youtube" autoPlay controls src={src} />
        </div>
      </div>
    </div>
  )
}

function onChangeTime(e, action, duration){
  const { width, left } = e.currentTarget.getBoundingClientRect();
  const currentPercentage = e.clientX - left;
  const currentTime = (currentPercentage / width) * duration;
  action && action(currentTime);
}

function getMinsAndSecs(duration){
  const minutes = parseInt(duration / 60);
  const seconds = parseInt(duration - (minutes * 60));
  return { 
    minutes: minutes < 10 ? '0' + minutes : minutes, 
    seconds: seconds < 10 ? '0' + seconds : seconds 
  }
}