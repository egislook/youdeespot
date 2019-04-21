import React from 'react'
import { fucss } from 'next-fucss/utils'

export default ({ playlist, onChangePlaylist, onClearPlaylist, image }) => {
  
  const name = 'YouDeeSpot';
  const title = ['What are',  'you looking for?'];
  const description = 'Find your favourite artists, songs, channels or inspiring playlists. Just start typing!';
  
  const placeholder = 'Search...';
  const example = 'PLI33t8jpgAnc4p3ROWdz4hD_PERAQ4w0F'
  const exampleUrl = 'https://www.youtube.com/watch?v=KeBR6h2UsLI&list=PLI33t8jpgAnc4p3ROWdz4hD_PERAQ4w0F';

  
  const isPlaylist = !!playlist;
  
  return (
    <div className={classNameHeader(isPlaylist)}>
      
      <form className={classNameForm()}>
        <i className="fu-search c:56585C m-l:10px m-b:2px" />
        <input 
          onChange={onChangePlaylist} 
          placeholder={placeholder} 
          defaultValue={example} 
          className={classNameInput(isPlaylist)} />
        {isPlaylist && <i onClick={onClearPlaylist} className="fu-cross c:56585C p-r:10px crs:pt m-b:2px" />}
      </form>
      
      {!isPlaylist && <div>
      
        <h1 className="fs:160pc m-t:5px lh:1.1 mxw:200px">{title.map(text => (<div key={text}>{text}</div>))}</h1>
        <h2 className="fs:95pc m-tb:20px c:56585C">{description}</h2>
        <ElemLogo image={image} name={name} />
        
        { isPlaylist && <span 
          className="p:3px-5px c:prim bg:white bs:2 fw:800 fs:70pc br:3px tt:uc crs:pt lh:1.7 hv-bs:1_bg:prim_c:white ts:all" 
          onClick={onClearPlaylist}>clear</span> }
        
        { false && !isPlaylist && <p className="c:grey300 fs:80pc m-t:20px">{exampleUrl}</p>}
        
        { false && <Link to="/home" className="button">Checkout the full demo</Link>}
      </div>}
    </div>
  )
}

const classNameForm = () => fucss({
  'w:calc(100pc-30px) ps:fx t,l,r:0 m:15px dp:flx ai:c bg:26292D br:5px': true
})

const classNameInput = (isPlaylist) => fucss({
  'p:10px fs:85pc w:100pc c:grey200 fw:600 bg:ts': true
})

const classNameHeader = (isPlaylist) => fucss({
  'mxw:300px w:100pc': !isPlaylist,
  'w:100pc ps:fx t,l:0 dp:flx bg:white jc:sb bs:2': isPlaylist
})

const ElemLogo = ({ image, name }) => (
  <div className="dp:flx jc:c ai:c"> 
    <img src={image} className="h:14px m-r:5px m-t:2px" />
    <h4 className="lh:1 fs:90pc">{name}</h4>
  </div>
)