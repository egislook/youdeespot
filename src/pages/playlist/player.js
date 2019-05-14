import React from 'react'
import { fucss } from 'next-fucss/utils'

export default ({ track = {}, elem, src, handleTogglePlay, handleChangeTrack, isPlaying, duration, currentTime, handleChangeTime }) => {
  
  const percentage = (currentTime / duration) * 100;
  const durationMinsAndSecs = getMinsAndSecs(duration);
  const currentMinsAndSecs = getMinsAndSecs(currentTime);
  
  return (
    <div className="ps:fx b,l:0 w:100pc dp:flx">
      <div className="w:100pc mxw:700px">
        <div className="bg:sec bs:2 of:hd dp:flx bs:2 w:100pc">
          <div className="m-rl:0">
            <div onClick={handleTogglePlay} className="h,w,mnw,lh:60px bg-sz:cv bg-ps:c" style={{backgroundImage: `url(${track.img})`}}>
              {!isPlaying 
                ? <i className="fu-triangle-right lh:1 fs:150pc" /> 
                : <a className="fs:70pc fw:700 bg:blacka5 w,h:100pc t:0 m-t:3npx">{currentMinsAndSecs.minutes}:{currentMinsAndSecs.seconds}</a> }
            </div>
          </div>
          <div className="w:100pc dp:flx flxd:col jc:sb">
            <div className="dp:flx w:100pc h:100pc ai:c">
              <div className="fs:70pc ta:l m-l:10px">
                <h3>{track.name}</h3>
                <p className="m-t:3px">{track.artist}</p>
              </div>
              <div className="m-r:10px">
                <i className="fu-fast-forward p:7px br:50pc bg:sec600 c:sec300 fs:90pc" onClick={handleChangeTrack} />
              </div>
            </div>
            <div className="bg:blacka3 p-t:3px p-b:5px l:0 w:100pc crs:pt" onClick={ e => onChangeTime(e, handleChangeTime, duration)}>
              <div className="bg:sec h:3px m-l:0" style={{ width: percentage + '%' }} />
            </div>
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