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
  const { playlist } = usePlaylist(global, playlistId);
  const playerState = usePlayer(global, playlist);
  
  return (
    <section className="prim:8D34D5 sec:26292D dp:flx ai:c mnh:100vh jc:c c:F9FBFD mxw:100pc of:hd bg:1A1D22">
      
      { (isLoading || errorMessage) && <ElemFog 
        image={image} 
        onClose={handleInfo} 
        message={!isLoading && errorMessage} /> } 
      
      {!!playlist && <div className="p-t:30px">
        <header className="ps:fx l,t:0 w:100pc">
          <div className="dp:flx bg:sec ai:c jc:sb w:100pc mxw:700px p-rl:10px br:0-0-3px-3px bs:1">
            <Link className="fu-arrow-left p-tb:10px crs:pt p:10px" to="/" />
            <h3 className="p:10px fs:85pc c:grey200 bg:ts ta:r lh:1"><strong>{playlist.title}</strong><br/><small className="fw:100">{playlist.channelTitle}</small></h3>
          </div>
        </header>
        <Playlist 
          playlist={playlist} 
          selectedTrack={playerState.track}
          onSelectTrack={playerState.handleTrack} />
        
        {playerState.track && <Player
          {...playerState}
          {...playerState.trackInfo}/>}
        
      </div>}
        
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