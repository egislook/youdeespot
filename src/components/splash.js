import { Link } from 'react-router-dom';
import React from 'react';
import { getPlaylist, getTrack } from '../libs/actions/playlist';

const placeholder = 'PLI33t8jpgAnc4p3ROWdz4hD_PERAQ4w0F';
const exampleUrl = 'https://www.youtube.com/watch?v=KeBR6h2UsLI&list=PLI33t8jpgAnc4p3ROWdz4hD_PERAQ4w0F';

export default class SplashScreen extends React.Component {
  
  render(){
    
    const { playlist, isLoading } = this.state;
    
    console.log({ playlist, isLoading });
    
    return (
      <section className="dp:flx ai:c mnh:100vh jc:c c:sec ps:rl">
        { isLoading && <div className="ps:fx t,l:0 bg:blacka5 w,h:100pc an:fadeIn" />}
        <div className="mxw:500px w:100pc p-rl:3pc">
          <h1 className="fs:275pc fw:100 m-t:10px">YouDeeSpot</h1>
          <h2 className="fs:140pc fw:400">An awesome youtube playlist collector</h2>
          
          <form className="m:30px-0">
            <input 
              onChange={this.handleFetchPlaylist.bind(this)} 
              placeholder={placeholder} 
              defaultValue={placeholder} 
              className="ta:c p:15px-20px br:3px bd:1px-sld-grey200 bg:grey100 w:100pc fw:600" />
          </form>
          
          { !playlist && <p className="c:grey300 fs:80pc">{exampleUrl}</p>}
          
          { playlist && <ElemPlayer />}
          
          { playlist && <ElemPlaylist playlist={playlist} selectTrack={this.handleSelectTrack.bind(this)} />}
          
          { false && <Link to="/home" className="button">Checkout the full demo</Link>}
        </div>
      </section>
    )
  }
  
  state = {
    isLoading: null,
    playlist: null,
    message: null
  }
  
  // componentDidMount(){
  //   this.handleFetchPlaylist();
  // }
  
  handleFetchPlaylist = (e) => {
    this.setState({ isLoading: true });
    
    getPlaylist(e && e.target.value)
      .then( data => this.setState({
        isLoading: false,
        playlist: data.data
      }))
      .catch( data => this.setState({
        isLoading: false,
        message: data.message
      }))
  }
  
  handleSelectTrack = (track) => {
    console.log(track);
    getTrack(track.videoId).then( src => {
      document.querySelector('#youtube').src = src;
      document.querySelector('#youtube').play();
    })
  }
}

const ElemPlaylist = ({ playlist, selectTrack }) => (
  <div className="bg:black300 c:white p:20px ta:l m-t:30px">
    {playlist.map(track => (
      <div key={track.position} onClick={e => selectTrack && selectTrack(track)} className="p:10px bd-b:1px-sld-black200 dp:flx ai:fs jc:fs">
        <img src={track.img} className="w:60px" />
        <h2 className="m-l:15px fs:100pc">{track.title}</h2>
      </div>
    ))}
  </div>
)

const ElemPlayer = (src) => (
  <audio id="youtube" autoPlay controls loop />
)
