import React from 'react'
import { fucss } from 'next-fucss/utils'

export default ({ message, onClose, image }) => (
  <div onClick={() => onClose()} className="ps:fx t,l:0 bg:blacka5 w,h:100pc an:fadeIn dp:flx ai:c z:2">
    { message 
      ? <span className="c:prim br:3px p:20px-30px fs:120pc mxw:400px bg:black bs:2">{message || 'Loading...'}</span>
      : <img className="w,h:50px an:scaler-inf-1s-eio" src={image} />
    }
  </div>
)