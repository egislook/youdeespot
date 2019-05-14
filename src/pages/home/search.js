import React from 'react'
import { Link } from 'react-router-dom'
import { fucss } from 'next-fucss/utils'
import { useSearch, usePlaylists } from './hooks';
import ElemLogo from '../../elements/logo';

const name = 'YouDeeSpot';
const title = ['What are',  'you looking for?'];
const description = 'Find your favourite artists, songs, channels or inspiring playlists. Just start typing!';
const suggestions = 'Just click on one of the suggested playlists and Enjoy the Music!';

const placeholder = 'Enter Youtube Playlist ID...';
const example = 'PLI33t8jpgAnc4p3ROWdz4hD_PERAQ4w0F'
const exampleUrl = 'https://www.youtube.com/watch?v=KeBR6h2UsLI&list=PLI33t8jpgAnc4p3ROWdz4hD_PERAQ4w0F';

export default ({ image, global }) => {
  
  const { playlists, handleFetchPlaylists } = usePlaylists(global);
  const { handleSearchChange, handleSearchSubmit, isValidSearch, search } = useSearch(global, handleFetchPlaylists);
  
  return (
      
      <div className="p-tb:30px mxw:700px w:100pc">
        
        <div className="p-rl:3pc">
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
          
          <h2 className="fs:85pc m-b:10px m-t:10px c:56585C mxw:250px">{suggestions}</h2>
        </div>
        
        <div className="m-t:10px of:auto mxw:700px w:100pc md-p-rl:3pc">
          <div className="dp:flx">
            { playlists.map(ElemPlaylistPreview) }
          </div>
        </div>
        
      </div>
  )
}

const ElemPlaylistPreview = ({ img, title, channelTitle, playlistId }) => (
  <Link key={title} className="mdx-m:5px m:10px m-l:0" to={'/playlist/' + playlistId }>
    <span className="ps:rl of:hd mdx-w:200px lg-w:225px bg:26292D bs:2 br:5px w:100pc m-b:20px hv-scl:1.05_bg:black ts:all hv-try:0_h3">
      <img className="w:100pc dp:bk" src={img} />
      <h3 className="p:30px ps:ab w,h,lh:100pc bg:blacka7 t,l:0 md-try:100pc ts:all">{title}<br /><small className="fs:80pc fw:300">{channelTitle}</small></h3>
    </span>
  </Link>
)

const classNameSubmit = (isValid) => fucss({
  'fu-check p-r:10px crs:pt m-b:2px': true,
  'c:56585C': !isValid,
  'c:green': isValid
})

const classNameForm = () => fucss({
  'w:100pc m-tb:15px dp:flx ai:c bg:26292D br:5px': true
})

const classNameInput = (isPlaylist) => fucss({
  'p:10px fs:85pc w:100pc c:grey200 fw:600 bg:ts': true
})

const classNameHeader = (isPlaylist) => fucss({
  'mxw:700px': true,
  'w:100pc ps:fx t,l:0 dp:flx jc:sb bs:2': isPlaylist
})