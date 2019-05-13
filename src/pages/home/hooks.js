
import { fetchPlaylists, fetchTrack, importPlaylist } from '../../libs/fetchers';
import { useEffect, useState } from 'react';

export const useGlobal = () => {
  const [ isLoading, setIsLoading ] = useState();
  const [ errorMessage, setErrorMessage ] = useState();
  
  return { isLoading, setIsLoading, errorMessage, handleInfo }
  
  function handleInfo(data){
    setIsLoading();
    setErrorMessage(data && data.message);
  }
}

export const usePlaylists = ({ handleInfo, setIsLoading }) => {
  const [ playlists, setPlaylists ] = useState([]);
  
  useEffect(() => {
    handleFetchPlaylists()
  }, []);
  
  return { playlists, handleInfo, handleFetchPlaylists }
  
  function handleFetchPlaylists(skipIsLoading){
    !skipIsLoading && setIsLoading(true);
    fetchPlaylists()
      .then( items => {
        setPlaylists(items);
        setIsLoading();
      })
      .catch(handleInfo)
  }
}

export const useSearch = ({ handleInfo, setIsLoading }, handleFetchPlaylists) => {
  
  const [ search, setSearch ] = useState();
  const [ isValidSearch, setIsValidSearch ] = useState();
  
  return { handleSearchChange, handleSearchSubmit, isValidSearch, search }
  
  function handleSearchChange(e){
    const keywords = e && e.target && e.target.value || '';
    setSearch(keywords);
    setIsValidSearch(!!keywords.length)
  }
  
  function handleSearchSubmit(){
    setIsLoading(true);
    importPlaylist(search)
      .then(() => {
        handleFetchPlaylists(true);
        handleSearchChange();
      })
      .catch(handleInfo);
  }
}