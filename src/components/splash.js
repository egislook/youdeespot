import { Link } from 'react-router-dom';
import React from 'react';
import { getPlaylist, getTrack } from '../libs/actions/playlist';
import { fucss } from 'next-fucss/utils';

import ElemHeader from '../elements/header';
import ElemPlaylist from '../elements/playlist';
import ElemPlayer from '../elements/player';
import ElemFog from '../elements/fog';


export default class SplashScreen extends React.Component {
  
  render(){
    
    const { playlist, isLoading, message, track } = this.state;
    
    console.log({ playlist, isLoading, message, track });
    
    return (
      <section className="prim:28D29C dp:flx ai:c mnh:100vh jc:c c:sec mxw:100pc of:hd">
        
        { (isLoading || message) && <ElemFog 
          onClose={this.handleClearLoadingState.bind(this)} 
          message={isLoading ? 'Loading...' : message} /> }
        
        <ElemHeader 
          onChangePlaylist={this.handleFetchPlaylist.bind(this)} 
          onClearPlaylist={this.handleClearPlaylist.bind(this)} 
          playlist={playlist} />
        
        { playlist && <div>
          { track && <ElemPlayer track={track} />}
          
          <ElemPlaylist 
            playlist={playlist} 
            selectedTrack={track} 
            onSelectTrack={this.handleSelectTrack.bind(this)} />
        </div> }
      
      </section>
    )
  }
  
  state = {
    isLoading: null,
    playlist: null,
    message: null,
    track: null
  }
  
  componentDidMount(){
    this.handleFetchPlaylist();
  }
  
  handleFetchPlaylist = (e) => {
    this.setState({ isLoading: true });
    
    getPlaylist(e && e.target.value)
      .then( data => this.setState({ isLoading: false, playlist: data.data }))
      .catch( data => this.setState({ isLoading: false, message: data.message }))
  }
  
  handleClearPlaylist = () => {
    this.setState({ playlist: null });
  }
  
  handleSelectTrack = (track) => {
    this.setState({ isLoading: true });
    
    getTrack(track.videoId).then( src => {
      this.setState({ track: { ...track, src }, isLoading: false });
    })
  }
  
  handleClearLoadingState = () => this.setState({ isLoading: null, message: null })
}
