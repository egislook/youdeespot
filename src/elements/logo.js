import React from 'react'

export default ({ image, name }) => (
  <div className="dp:flx jc:c ai:c p-t:10px"> 
    <img src={image} className="h:14px m-r:5px m-t:2px" />
    <h4 className="lh:1 fs:90pc">{name}</h4>
  </div>
)