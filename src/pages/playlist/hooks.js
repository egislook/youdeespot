
import { fetchPlaylist, fetchTrack } from '../../libs/fetchers';
import { useEffect, useState, useRef } from 'react';

export const useGlobal = () => {
  const [ isLoading, setIsLoading ] = useState();
  const [ errorMessage, setErrorMessage ] = useState();
  
  return { isLoading, setIsLoading, errorMessage, handleInfo }
  
  function handleInfo(data){
    setIsLoading();
    setErrorMessage(data && data.message);
  }
}

export const usePlaylist = ({ setIsLoading, handleInfo }, playlistId) => {
  const [ playlist, setPlaylist ] = useState({});
  
  useEffect(() => {
    setIsLoading();
    fetchPlaylist(playlistId)
      .then( data => {
        setPlaylist(data);
        handleInfo();
      })
  }, [])
  
  return { playlist }
}

export const usePlayer = ({ setIsLoading, handleInfo }, playlist) => {
  const elem = useRef();
  const [ track, setTrack ] = useState();
  const [ src, setSrc ] = useState();
  const [ isPlaying, setIsPlaying ] = useState();
  
  useEffect(() => {
    if(!track) return;
    
    setIsLoading(true);
    fetchTrack(track.videoId).then( src => {
      setSrc(src);
      setIsPlaying(true);
      setIsLoading();
      
      elem.current.onended = e => handleChangeTrack();
      
      elem.current.onerror = (error) => {
        console.log(error);
        handleInfo({ message: `${track.artist} - ${track.name} is Not Available` });
        handleChangeTrack();
      }
      elem.current.onloadedmetadata = e => {
        const duration = elem.current.duration;
        console.log(typeof duration, duration);
        // this.handleTrackProgress();
      }
      
    })
  }, [track])
  
  return { track, handleTrack, src, handleTogglePlay, isPlaying, elem }
  
  function handleTrack(track){
    console.log(track);
    setTrack(track);
  }
  
  function handleChangeTrack(){
    console.log('next');
    // const nextTrack = playlist.find(item => );
  }
  
  function handleTogglePlay(){
    !isPlaying 
      ? (elem.current.play()) 
      : (elem.current.pause());
      
    setIsPlaying(!isPlaying);
  }
}

//   state = {
//     isLoading: null,
//     playlist: null,
//     message: null,
//     track: null,
//     isPlaying: null
//   }
  
//   componentDidMount(){
//     this.handleFetchPlaylist();
//   }
  
//   handleFetchPlaylist = (e) => {
//     this.setState({ isLoading: true });
    
//     getPlaylist(e && e.target.value)
//       .then( data => this.setState({ isLoading: false, playlist: data.data, message: null }))
//       .catch( data => {
//         console.log(data);
//         this.setState({ isLoading: false, message: data.message && data.message.message || 'Internal Server Error' })
//       })
//   }
  
//   handleClearPlaylist = () => {
//     this.setState({ playlist: null });
//   }
  
//   handleSelectTrack = (track) => {
//     this.setState({ isLoading: true });
    
//     getTrack(track.videoId).then( src => {
//       this.setState({ track: { ...track, src }, isLoading: false, isPlaying: true });
//       const elem = document.querySelector('#youtube');
      
//       elem.onended = e => this.handleChangeTrack();
      
//       elem.onerror = (error) => {
//         console.log(error);
//         this.setState({ message: `${track.artist} - ${track.name} is Not Available`})
//         this.handleChangeTrack();
//       }
//       elem.onloadedmetadata = e => {
//         const duration = document.querySelector('#youtube').duration;
//         console.log(typeof duration, duration);
//         this.handleTrackProgress();
//       }
      
//     })
//   }
  
//   handleTrackProgress = () => {
//     const elem = document.querySelector('#youtube');
        
//     this.timer = setInterval(() => {
//       // const percentage = (elem.currentTime / elem.duration) * 100;
//       // console.log(percentage);
//       this.setState({
//         duration: elem.duration,
//         currentTime: elem.currentTime
//       })
//     }, 500);
//   }
  
//   handleTogglePlay = () => {
//     const elem = document.querySelector('#youtube');
//     const isPlaying = !this.state.isPlaying;
//     isPlaying 
//       ? (elem.play(), this.handleTrackProgress()) 
//       : (elem.pause(), clearInterval(this.timer));
//     this.setState({ isPlaying })
//   }
  
//   handleChangeTrack = () => {
//     const nextTrack = this.state.playlist.find(track => track.position === parseInt(this.state.track.position) + 1);
//     this.handleSelectTrack(nextTrack);
//   }
  
//   handleChangeTime = (currentTime) => {
//     document.querySelector('#youtube').currentTime = currentTime;
//     this.setState({ currentTime });
//   }
  
//   handleClearLoadingState = () => this.setState({ isLoading: null, message: null })
// }