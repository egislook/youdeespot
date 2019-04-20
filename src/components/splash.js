import { Link } from 'react-router-dom';
import React from 'react';
import { getPlaylist, getTrack } from '../libs/actions/playlist';
import { fucss } from 'next-fucss/utils';

const placeholder = 'PLI33t8jpgAnc4p3ROWdz4hD_PERAQ4w0F';
const exampleUrl = 'https://www.youtube.com/watch?v=KeBR6h2UsLI&list=PLI33t8jpgAnc4p3ROWdz4hD_PERAQ4w0F';

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

const ElemHeader = ({ playlist, onChangePlaylist, onClearPlaylist }) => {
  
  const image = '/resources/img/youdeespot.png';
  const title = 'YouDeeSpot';
  const description = 'An awesome youtube playlist collector';
  
  const isPlaylist = !!playlist;
  
  return (
    <div className={classNameHeader(isPlaylist)}>
      <img src={image} className="h:25px" />
      {!isPlaylist && <h1 className="fs:250pc fw:100 m-t:5px lh:1">{title}</h1>}
      {!isPlaylist && <h2 className="fs:120pc fw:400 m-b:20px">{description}</h2>}
      
      <form className="w:100pc">
        <input 
          onChange={onChangePlaylist} 
          placeholder={placeholder} 
          defaultValue={placeholder} 
          className={classNameInput(isPlaylist)} />
      </form>
      
      { isPlaylist && <span 
        className="p:3px-5px c:prim bg:white bs:2 fw:800 fs:70pc br:3px tt:uc crs:pt lh:1.7 hv-bs:1_bg:prim_c:white ts:all" 
        onClick={onClearPlaylist}>clear</span> }
      
      { !isPlaylist && <p className="c:grey300 fs:80pc m-t:20px">{exampleUrl}</p>}
      
      { false && <Link to="/home" className="button">Checkout the full demo</Link>}
    </div>
  )
}

const classNameInput = (isPlaylist) => fucss({
  'bg:grey100 w:100pc fw:600': true,
  'ta:c p:15px-20px br:3px bd:1px-sld-grey200': !isPlaylist,
  'bg:grey100 h:25px p-rl:5px': isPlaylist
})

const classNameHeader = (isPlaylist) => fucss({
  'p:10px-3pc': true,
  'mxw:500px w:100pc': !isPlaylist,
  'w:100pc ps:fx t,l:0 dp:flx bg:white jc:sb bs:2': isPlaylist
})

const ElemPlaylist = ({ playlist, onSelectTrack, selectedTrack = {} }) => (
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

const ElemPlayer = ({ track }) => (
  <div className="ps:fx b,r:0 w:100pc bg:grey100 bs:2 of:hd">
    <audio id="youtube" autoPlay controls loop src={track.src} />
    <h3 className="fs:70pc w:100pc ws:np p:3px-10px bg:white bd-t:1px-sld-grey200">
      <img src={track.img} className="h:10px m-r:5px m-b:2px" />
      {track.title}
    </h3>
  </div>
)

const ElemFog = ({ message, onClose }) => (
  <div onClick={onClose} className="ps:fx t,l:0 bg:blacka5 w,h:100pc an:fadeIn dp:flx ai:c">
    <span className="bg:white br:3px p:20px-30px fs:150pc">{message || 'Loading...'}</span>
  </div>
)
