import React from 'react'
import { fucss } from 'next-fucss/utils'

export default ({ message, onClose, image }) => (
  <div onClick={onClose} className="ps:fx t,l:0 bg:blacka5 w,h:100pc an:fadeIn dp:flx ai:c z:2">
    { message 
      ? <span className="bg:prim br:3px p:10px-30px fs:150pc bs:2">{message || 'Loading...'}</span>
      : <img className="w,h:50px an:scaler-inf-1s-eio" src={image} />
    }
  </div>
)