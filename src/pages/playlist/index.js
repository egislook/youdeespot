import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobal, usePlaylist, usePlayer } from './hooks';
import Playlist from './playlist';
import Player from './player';
import ElemFog from '../../elements/fog';
const image = '/resources/img/youdeespot.png';

export default (props) => {
  
  const { playlistId } = props.match.params;
  const global = useGlobal();
  const { isLoading, errorMessage, handleInfo } = global;
  const { playlist = {} } = usePlaylist(global, playlistId);
  const playerState = usePlayer(global, playlist);
  
  return (
    <section className="prim:8D34D5 dp:flx ai:c mnh:100vh jc:c c:F9FBFD mxw:100pc of:hd bg:1A1D22">
      
      { (isLoading || errorMessage) && <ElemFog 
        image={image} 
        onClose={handleInfo} 
        message={!isLoading && errorMessage} /> } 
      
      <div>
        <Link className="fu-arrow-left ps:fx l,t:0 p:10px" to="/" />
        
        <Playlist 
          playlist={playlist} 
          selectedTrack={playerState.track}
          onSelectTrack={playerState.handleTrack} />
        
        <Player 
          // onTogglePlay={this.handleTogglePlay.bind(this)}
          // onChangeTrack={this.handleChangeTrack.bind(this)}
          // onChangeTime={this.handleChangeTime.bind(this)}
          // isPlaying={isPlaying}
          // duration={duration}
          // currentTime={currentTime}
          {...playerState}
          {...playerState.trackInfo}/>
        
      </div>
        
    </section>
  )
}


// export default (props) => {
  
//   const { playlistId } = props.match.params;
//   console.log(playlistId);
  
//   const { playlist, track, isPlaying, duration, currentTime } = props || {};
  
//   return (
//     <div>
//       <h1>Playlist {playlistId}</h1>
//       { false && playlist && <div>
//         { track && <ElemPlayer 
//           // onTogglePlay={this.handleTogglePlay.bind(this)}
//           // onChangeTrack={this.handleChangeTrack.bind(this)}
//           // onChangeTime={this.handleChangeTime.bind(this)}
//           isPlaying={isPlaying}
//           duration={duration}
//           currentTime={currentTime}
//           track={track} />}
        
//         { false && <ElemPlaylist 
//           playlist={playlist} 
//           selectedTrack={track} 
//           //onSelectTrack={this.handleSelectTrack.bind(this)} 
//           />}
//       </div> }
//     </div>
//   )
// }