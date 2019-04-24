import { Link } from 'react-router-dom';
import React from 'react';
import { getPlaylist, getTrack } from '../libs/actions/playlist';
import { fucss } from 'next-fucss/utils';

import ElemHeader from '../elements/header';
import ElemPlaylist from '../elements/playlist';
import ElemPlayer from '../elements/player';
import ElemFog from '../elements/fog';

const image = '/resources/img/youdeespot.png';

export default class SplashScreen extends React.Component {
  
  render(){
    
    const { playlist, isLoading, message, track, isPlaying, duration, currentTime } = this.state;
    
    // console.log({ playlist, isLoading, message, track, duration, currentTime });
    
    return (
      <section className="prim:8D34D5 dp:flx ai:c mnh:100vh jc:c c:F9FBFD mxw:100pc of:hd bg:1A1D22">
        
        { (isLoading || message) && <ElemFog 
          image={image}
          onClose={this.handleClearLoadingState.bind(this)} 
          message={!isLoading && message} /> }
        
        <ElemHeader 
          image={image}
          onChangePlaylist={this.handleFetchPlaylist.bind(this)} 
          onClearPlaylist={this.handleClearPlaylist.bind(this)} 
          playlist={playlist} />
        
        { playlist && <div>
          { track && <ElemPlayer 
            onTogglePlay={this.handleTogglePlay.bind(this)}
            onChangeTrack={this.handleChangeTrack.bind(this)}
            onChangeTime={this.handleChangeTime.bind(this)}
            isPlaying={isPlaying} 
            duration={duration}
            currentTime={currentTime}
            track={track} />}
          
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
    track: null,
    isPlaying: null
  }
  
  componentDidMount(){
    this.handleFetchPlaylist();
  }
  
  handleFetchPlaylist = (e) => {
    this.setState({ isLoading: true });
    
    getPlaylist(e && e.target.value)
      .then( data => this.setState({ isLoading: false, playlist: data.data, message: null }))
      .catch( data => {
        console.log(data);
        this.setState({ isLoading: false, message: data.message && data.message.message || 'Internal Server Error' })
      })
  }
  
  handleClearPlaylist = () => {
    this.setState({ playlist: null });
  }
  
  handleSelectTrack = (track) => {
    this.setState({ isLoading: true });
    
    getTrack(track.videoId).then( src => {
      this.setState({ track: { ...track, src }, isLoading: false, isPlaying: true });
      const elem = document.querySelector('#youtube');
      
      elem.onended = e => this.handleChangeTrack();
      
      elem.onerror = (error) => {
        console.log(error);
        this.setState({ message: `${track.artist} - ${track.name} is Not Available`})
        this.handleChangeTrack();
      }
      elem.onloadedmetadata = e => {
        const duration = document.querySelector('#youtube').duration;
        console.log(typeof duration, duration);
        this.handleTrackProgress();
      }
      
    })
  }
  
  handleTrackProgress = () => {
    const elem = document.querySelector('#youtube');
        
    this.timer = setInterval(() => {
      // const percentage = (elem.currentTime / elem.duration) * 100;
      // console.log(percentage);
      this.setState({
        duration: elem.duration,
        currentTime: elem.currentTime
      })
    }, 500);
  }
  
  handleTogglePlay = () => {
    const elem = document.querySelector('#youtube');
    const isPlaying = !this.state.isPlaying;
    isPlaying 
      ? (elem.play(), this.handleTrackProgress()) 
      : (elem.pause(), clearInterval(this.timer));
    this.setState({ isPlaying })
  }
  
  handleChangeTrack = () => {
    const nextTrack = this.state.playlist.find(track => track.position === parseInt(this.state.track.position) + 1);
    this.handleSelectTrack(nextTrack);
  }
  
  handleChangeTime = (currentTime) => {
    document.querySelector('#youtube').currentTime = currentTime;
    this.setState({ currentTime });
  }
  
  handleClearLoadingState = () => this.setState({ isLoading: null, message: null })
}
