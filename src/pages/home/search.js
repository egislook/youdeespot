import React from 'react'
import { Link } from 'react-router-dom'
import { fucss } from 'next-fucss/utils'
import { useSearch, usePlaylists } from './hooks';

const name = 'YouDeeSpot';
const title = ['What are',  'you looking for?'];
const description = 'Find your favourite artists, songs, channels or inspiring playlists. Just start typing!';

const placeholder = 'Enter Youtube Playlist ID...';
const example = 'PLI33t8jpgAnc4p3ROWdz4hD_PERAQ4w0F'
const exampleUrl = 'https://www.youtube.com/watch?v=KeBR6h2UsLI&list=PLI33t8jpgAnc4p3ROWdz4hD_PERAQ4w0F';

export default ({ image, global }) => {
  
  const { playlists, handleFetchPlaylists } = usePlaylists(global);
  const { handleSearchChange, handleSearchSubmit, isValidSearch, search } = useSearch(global, handleFetchPlaylists);
  
  return (
    <div className={classNameHeader()}>
      
      <div className="p-tb:30px p-rl:3pc">
        <h1 className="fs:160pc m-t:5px lh:1.1 mxw:200px">{title.map(text => (
          <div key={text}>{text}</div>
        ))}</h1>
        <h2 className="fs:95pc m-tb:20px c:56585C">{description}</h2>
        
        <form className={classNameForm()}>
          <i className="fu-search c:56585C m-l:10px m-b:2px" />
          <input
            value={search}
            onChange={handleSearchChange} 
            placeholder={placeholder}
            className={classNameInput()} />
          <i onClick={isValidSearch && handleSearchSubmit || null} className={classNameSubmit(isValidSearch)} />
          {isValidSearch && <i onClick={() => handleSearchChange()} className="fu-cross c:56585C p-r:10px crs:pt m-b:2px" />}
        </form>
        
        <ElemLogo image={image} name={name} />
        
        <div className="m-t:10px">
          { playlists.map(ElemPlaylistPreview) }
        </div>
      </div>
      
    </div>
  )
}

const ElemPlaylistPreview = ({ img, title, channelTitle, playlistId }) => (
  <Link key={title} className="md-m:10px md-mxw:30pc" to={'/playlist/' + playlistId }>
    <span className="bg:26292D bs:2 br:5px w:100pc m-b:20px hv-scl:1.05_bg:black ts:all">
      <img className="w:100pc dp:bk" src={img} />
      <p className="p:30px">{title} by {channelTitle}</p>
    </span>
  </Link>
)

const classNameSubmit = (isValid) => fucss({
  'fu-check p-r:10px crs:pt m-b:2px': true,
  'c:56585C': !isValid,
  'c:green': isValid
})

const classNameForm = () => fucss({
  'w:100pc m:15px-auto dp:flx ai:c bg:26292D br:5px mxw:674px': true
})

const classNameInput = (isPlaylist) => fucss({
  'p:10px fs:85pc w:100pc c:grey200 fw:600 bg:ts': true
})

const classNameHeader = (isPlaylist) => fucss({
  'w:100pc ps:fx t,l:0 dp:flx jc:sb bs:2': isPlaylist
})

const ElemLogo = ({ image, name }) => (
  <div className="dp:flx jc:c ai:c"> 
    <img src={image} className="h:14px m-r:5px m-t:2px" />
    <h4 className="lh:1 fs:90pc">{name}</h4>
  </div>
)