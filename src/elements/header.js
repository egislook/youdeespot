import React from 'react'
import { fucss } from 'next-fucss/utils'

export default ({ playlist, onChangePlaylist, onClearPlaylist }) => {
  
  const image = '/resources/img/youdeespot.png';
  const title = 'YouDeeSpot';
  const description = 'An awesome youtube playlist collector';
  
  const placeholder = 'PLI33t8jpgAnc4p3ROWdz4hD_PERAQ4w0F';
  const exampleUrl = 'https://www.youtube.com/watch?v=KeBR6h2UsLI&list=PLI33t8jpgAnc4p3ROWdz4hD_PERAQ4w0F';

  
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