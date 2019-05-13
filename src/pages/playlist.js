import React from 'react';

export default (props) => {
  
  const { playlist, track, isPlaying, duration, currentTime } = props || {};
  
  return (
    <div>
      <h1>Home</h1>
      { false && playlist && <div>
        { track && <ElemPlayer 
          // onTogglePlay={this.handleTogglePlay.bind(this)}
          // onChangeTrack={this.handleChangeTrack.bind(this)}
          // onChangeTime={this.handleChangeTime.bind(this)}
          isPlaying={isPlaying}
          duration={duration}
          currentTime={currentTime}
          track={track} />}
        
        { false && <ElemPlaylist 
          playlist={playlist} 
          selectedTrack={track} 
          //onSelectTrack={this.handleSelectTrack.bind(this)} 
          />}
      </div> }
    </div>
  )
}
