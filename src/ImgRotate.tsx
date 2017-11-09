import * as React from 'react'
import './ImgRotate.css'

export const ImgRotate = (p: { songImg: string }) => {

  return <div className='ImgRotate'>
    <img src={p.songImg} className='ImgRotateImg'></img>
  </div>
}
