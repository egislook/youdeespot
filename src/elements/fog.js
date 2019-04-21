import React from 'react'
import { fucss } from 'next-fucss/utils'

export default ({ message, onClose }) => (
  <div onClick={onClose} className="ps:fx t,l:0 bg:blacka5 w,h:100pc an:fadeIn dp:flx ai:c z:2">
    <span className="bg:white br:3px p:20px-30px fs:150pc">{message || 'Loading...'}</span>
  </div>
)